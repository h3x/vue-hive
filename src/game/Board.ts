import Hex from './Hex';
import * as RB from './RedBlob';

export default class Board {
    
    //       width    height
    public boardDims: {width: number, height: number} = {width: 30, height: 14};
    public board: Array<Array<Hex|null|'move'|'c'>>;
    public canvas: HTMLCanvasElement;
    public size: number;
    public v:Array<[number, number]>;
    public queenPlayed:{W:boolean, B:boolean} = {
        W: false,
        B: false
    }

    constructor(canvas: HTMLCanvasElement) {

        this.canvas = canvas;
        this.size = this.canvas.width / this.boardDims.width * 0.55;

        // construct board
        this.board = [];
        for (let i = 0; i < this.boardDims.height; i++) {
            this.board[i] = new Array();
            for (let j = 0; j < this.boardDims.width; j++) {
                this.board[i][j] = null;
            }
        }
        this.v = []

        // for movement logic

    }

    public getBoard() {
        return this.board;
    }

    public getDims() {
        return this.boardDims;
    }

    public getBoardClone() {
        return [...this.board];
    }

    getLegalMoves():Array<[number, number]> {
        const moves:Array<[number, number]> = []
        for (let i = 0; i < this.boardDims.height; i++) {
            this.board[i] = new Array();
            for (let j = 0; j < this.boardDims.width; j++) {
                if (this.board[i][j] == 'c') {
                    moves.push([j,i]);
                }
            }
        }
        return moves;
    }
    // place a piece in the board array
    public placePiece(p: Hex, x: number, y: number): boolean {
        if (this.board[y][x] === null || this.board[y][x] === 'move') {
            this.board[y][x] = p;
            p.setLocation(x,y)
            return true;
        } else {
            return false;
        }
    }

    public refreshBoard() {

        for (let i = 0; i < this.boardDims.height; i++) {
            //this.board[i] = new Array();
            for (let j = 0; j < this.boardDims.width; j++) {
                if (this.board[i][j] == 'move' || this.board[i][j] == 'c') {
                    this.board[i][j] = null;
                }
            }
        }
    }

    // remove a piece from the board array
    public removePiece(p: Hex, x: number, y: number): boolean {
        this.board[y][x] = null;
        return true;
    }

    // move a piece from one location to another
    public move(p: Hex, x: number, y: number, pvs?: [number, number]): boolean {
         if (p.isPieceInPlay() && pvs) {
             return (this.removePiece(p, pvs[0], pvs[1]) && this.placePiece(p, x, y));
         } else {
            p.pieceInPlay(true);
            return this.placePiece(p, x, y);
         }

    }

    // TODO: fix board edges  so neighbours are only real spots
    // get all the neighbours of a piece
    public getNeighbours(cx: number, cy: number): Array<[number, number]> {
        const n: Array<[number, number]> = [];
        // console.log(cx, cy)
        // const [x,y] = RB.pixel_to_hex(cx,cy, this.size);
        for (let s = 0; s < 6; s++) {
            n.push(RB.neighbor(cx, cy, s));
        }
        return n;
    }

    public getAdjacentPieces(p:Hex, pieces:Hex[]):Hex[]{
        const [x,y] = p.getHex();
        const allNeighbours = this.getNeighbours(x,y);
        const result:Hex[] = [];

        for(let i = 0; i < allNeighbours.length; i++){
            const h = this.getPieceAt(allNeighbours[i][0],allNeighbours[i][1], pieces);
            if(h !== null){
                h.map(el => {result.push(el)})
            }
        }
        return result;
    }

    // check that moving a piece doesnt violate the one hive rule
    public oneHive(p:Hex, pieces:Hex[]): boolean {

        const visited = [];
        const t = [];

        //clone pieces array except for the piece in question
        const _pieces = [];
        for(let i = 0; i < pieces.length; i++){
            if(pieces[i] === p)
                continue
            else if(!pieces[i].isPieceDocked())
                _pieces.push(pieces[i])
        }
        
        // start the check at the first piece
        t.push(_pieces[0]);

        while(t.length > 0){
            const current = t.pop();
            if(current === p)
                continue
            if(!current)
                break
            current.visited = true;
            const neighbours = this.getAdjacentPieces(current,pieces)
            for(let i = 0; i < neighbours.length; i++){
                if(!neighbours[i].visited)
                    t.push(neighbours[i]);
            }
        }

        const result = _pieces.map(el => el.visited).includes(false);
        pieces.map(el => el.visited = false);
        return result;
    }

    

    public floodFillPrep(nx: number, ny: number): void {
        for (let i = 0; i < this.boardDims.height; i++) {
            for (let j = 0; j < this.boardDims.width; j++) {
                if (this.board[i][j] === 'move') {
                    this.board[i][j] = null;
                }
            }
        }
    }


    public getLegalNeighbors(p: Hex): Array<[number, number]> {
        const [hx, hy] = p.getHex();
        
        if(hx > this.boardDims.width || hy > this.boardDims.height)
            return []

        const allNeighbors = this.getNeighbours(hx, hy);
        const legalMoves: Array<[number, number]> = [];

        for (let i = 0; i < 6; i++) {
            let prev = i - 1;
            let next = i + 1;
            // circle
            if (i == 0) {
                prev = 5;
            } else if (i == 5) {
                next = 0;
            }
            const [by, bx] = allNeighbors[i];
            const [py, px] = allNeighbors[prev];
            const [ny, nx] = allNeighbors[next];


            if ((this.board[bx][by] === null || this.board[bx][by] === 'move') &&
               ((this.board[px][py] === null || this.board[px][py] === 'move') ||
                (this.board[nx][ny] === null || this.board[nx][ny] === 'move')) ) {
                    legalMoves.push(allNeighbors[i]);
                }
        }
        return legalMoves;
    }

    getPieceAt(x:number, y:number, pieces:Hex[]):Hex[]|null {
        const q = []
        for(let i = 0; i < pieces.length; i++){
            const [px,py] = pieces[i].getHex()
            if( px === x && py === y)
                q.push(pieces[i])
        }
        if(q.length > 0)
            return q
        return null
    }

    // This is black magic and i dont know how i figued this out
    private checkSame(p:Hex, t:[number,number], pieces:Hex[]):boolean{
        // get all the neighbors of the tile at t(x,y)
        const tiles = this.getNeighbours(t[0], t[1])
        // get all the Hex objects on the tiles found above (includes empty tiles)
        const surround =  tiles.map( ([x,y])=> this.getPieceAt(x,y,pieces) )
        // check that each tile is not touching a player of the oposite color
        const w = surround.map(q => q!==null && q[0].player !== p.player )
        // return all the tiles touching the player of the opsosite color
        return w.includes(true)
         
    }   

    public newPiece(p:Hex, pieces:Hex[]):Array<[number, number]>{
      // const onBoard:Array<[number, number]> = []
       const t = []
       for(let i = 0; i < pieces.length; i++){
           t.push(this.getLegalNeighbors(pieces[i]))
       }
       // return all the tiles NOT touching a player of the oposite color
       return t.flatMap(el => el).filter(t => !this.checkSame(p, t, pieces) )
       
    }

    public getScurryMoves(p: Hex, moves: number, pieces:Hex[] ):Array<[number, number]>{
        if(this.oneHive(p, pieces))
            return []
        const legalMoves:Array<[number, number]> = [];
        const allTileNeighbors = [];
        for(let i = 0; i < pieces.length; i++)
            if( pieces[i] !== p && !pieces[i].isDocked)
                allTileNeighbors.push(this.getLegalNeighbors(pieces[i]));

        if(moves === 1)
            return this.getSingleMove(p, pieces);
        else if(moves === 3)
            return this.getSpiderMoves(p, pieces);
        else
            return allTileNeighbors.flatMap(el=>el);
        
    }

    public getJumpMoves(p:Hex, pieces:Hex[]):Array<[number,number]>{
        if(this.oneHive(p, pieces))
            return []
        const result:Array<[number,number]> = [];

        const [px,py] = p.getHex();
        const allNeighbours = this.getNeighbours(px,py);
        const legalNeighbours = this.getLegalNeighbors(p);
        const adjPieces = this.difference(allNeighbours, legalNeighbours);

        const ogLoc = RB.coord_to_cube({x:px,y:py});
        for(let i = 0; i < adjPieces.length; i++){
            const [ax,ay] = adjPieces[i];
            const pLoc = RB.coord_to_cube({x:ax, y:ay});
            const x_inc = pLoc.x - ogLoc.x;
            const y_inc = pLoc.y - ogLoc.y;
            const z_inc = pLoc.z - ogLoc.z;
            let x = x_inc; let y = y_inc; let z =z_inc;
            while(true){
                const next = RB.cube_to_coord({x:pLoc.x + x, y:pLoc.y + y, z:pLoc.z +z});
                if(this.getPieceAt(next.x, next.y, pieces) == null){
                    result.push([next.x, next.y]);
                    break;
                }
                x+= x_inc; y+= y_inc; z+= z_inc;
            }   
        }
        return result;
    }


    // The intersection of 2 arrays
    private intersection(a1:Array<[number,number]>, a2:Array<[number,number]>):Array<[number,number]>{
        const result:Array<[number,number]> = [];
         for(let i = 0; i < a1.length; i++){
             for(let j = 0; j < a2.length; j++){
                if(a1[i][0] === a2[j][0] && a1[i][1] == a2[j][1])
                    result.push([a1[i][0],a1[i][1]]);
             }
         }
        return result;
    }

    // The difference of two arrays [a1 - a2]
    private difference(a1:Array<[number, number]>, a2:Array<[number,number]>): Array<[number,number]>{
        const result:Array<[number,number]> = []

        for(let i = 0; i < a1.length; i++){
            if(!this.arrayContains(a1[i], a2))
                result.push(a1[i])
        }

        return result;
    }

    // return true if a1:[number,number] is an element of a2
    private arrayContains(a1:[number, number], a2:Array<[number,number]>):boolean{
       
        for(let j = 0; j < a2.length; j++){
            if(a1[0] === a2[j][0] && a1[1] === a2[j][1])
                return true;
        }        
        return false;
    }

    // remove duplicate elements from an array
    private removeDupes(arr:Array<[number,number]>):Array<[number,number]>{
        const newArr:Array<[number,number]> = []
        for(let i = 0; i< arr.length; i++ ){
            if(!this.arrayContains(arr[i], newArr))
                newArr.push(arr[i])
        }
        return newArr
        
    }
    private getSingleMove(p:Hex, pieces:Hex[]):Array<[number,number]>{
        const [x,y] = p.getHex();
        const neighbours = this.getNeighbours(x,y);
        const scurry = this.getScurryMoves(p, -1, pieces);
        return this.intersection(neighbours, scurry);
    }

    private getSpiderMoves(p:Hex, pieces:Hex[]):Array<[number,number]>{
        const firstMove = this.getSingleMove(p, pieces)
        //const firstMove = this.getLegalNeighbors(p)
        const scurry = this.getScurryMoves(p,-1,pieces)
        var legal:Array<[number,number]> = []
        this.v = []

        let second = []
        for(let i = 0; i < firstMove.length; i++){
            this.floodFill(scurry,firstMove[i][0], firstMove[i][1], 3,[], pieces)
        }
        
        
        const intersect = this.intersection(this.v, this.getScurryMoves(p,-1,pieces))
        return this.v    
    }


    private floodFill(scurry:Array<[number,number]>,nx: number, ny: number, moves:number,soFar:Array<[number,number]>, pieces:Hex[]) {
        this.v = this.intersection(scurry,this.v.concat(this.getNeighbours(nx,ny)))
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // if(moves === 0){
        //     this.v.push([nx,ny])
        // }
        // else if(!this.arrayContains([nx,ny], scurry)){
        //     return
        // }
        // else{
        //     this.floodFill(scurry,nx, ny - 1, moves-1,soFar, pieces)
        //     this.floodFill(scurry,nx, ny + 1, moves-1,soFar, pieces)
        //     this.floodFill(scurry,nx - 1, ny, moves-1,soFar, pieces)
        //     this.floodFill(scurry,nx - 1, ny - 1, moves-1,soFar, pieces)
        //     this.floodFill(scurry,nx + 1, ny, moves-1,soFar, pieces)
        //     this.floodFill(scurry,nx + 1, ny - 1,moves-1,soFar, pieces)
        
        // }
            // this.floodFill(scurry,nx, ny - 1, moves-1,soFar, pieces);
            // this.floodFill(scurry,nx, ny + 1, moves-1,soFar, pieces);
            // if (nx - 1 >= 0) {
            //     this.floodFill(scurry,nx - 1, ny, moves-1,soFar, pieces);
            //     if (ny - 1 >= 0) {
            //         this.floodFill(scurry,nx - 1, ny - 1, moves-1,soFar, pieces);
            //     }
            // }
            // if (nx + 1 <= this.boardDims.width) {
            //     this.floodFill(scurry,nx + 1, ny, moves-1,soFar, pieces);
            //     if (ny - 1  >= 0) {
            //         this.floodFill(scurry,nx + 1, ny - 1,moves-1,soFar, pieces);
            //     }
            // }
        //}
    }

}
