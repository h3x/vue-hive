import Hex from './Hex';
import * as RB from './RedBlob';

export default class Board {
    
    //       width    height
    public boardDims: {width: number, height: number} = {width: 30, height: 14};
    public board: Array<Array<Hex|null|'move'|'c'>>;
    public canvas: HTMLCanvasElement;
    public size: number;

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
            n.push(RB.neighbor(cy, cx, s));
        }
        return n;
    }

    // check that moving a piece doesnt violate the one hive rule
    public oneHive(_board: Array<Array<Hex|null|'move'|'c'>>): boolean {
        return true;

        // dont know what to do with this yet
        // _board[px][py] = null;
        // if(!this.oneHive(_board)){
        //     return [];
        // }
    }

    public floodFill(nx: number, ny: number): void {
        // console.log(nx,ny)
        if (this.board[ny] === undefined || this.board[ny][nx] === undefined || this.board[ny][nx] !== null) {
            return;
        } else {
            this.board[ny][nx] = 'move';

            this.floodFill(nx, ny - 1);
            this.floodFill(nx, ny + 1);
            if (nx - 1 >= 0) {
                this.floodFill(nx - 1, ny);
                if (ny - 1 >= 0) {
                    this.floodFill(nx - 1, ny - 1);
                }
            }
            if (nx + 1 <= this.boardDims.width) {
                this.floodFill(nx + 1, ny);
                if (ny - 1  >= 0) {
                    this.floodFill(nx + 1, ny - 1);
                }
            }

        }
    }

    public floodFillPrep(nx: number, ny: number): void {
        for (let i = 0; i < this.boardDims.height; i++) {
            for (let j = 0; j < this.boardDims.width; j++) {
                if (this.board[i][j] === 'move') {
                    this.board[i][j] = null;
                }
            }
        }
        this.floodFill(nx, ny);
    }


    public getLegalNeighbors(p: Hex): Array<[number, number]>|null {
        const [lx, ly] = p.getLocation();
        const [hx, hy] = RB.pixel_to_hex(lx,ly, this.size)
        const allNeighbors = this.getNeighbours(hx, hy);
        const legalMoves: Array<[number, number]>|null = [];

        for (let i = 0; i < 6; i++) {
            let prev = i - 1;
            let next = i + 1;
            // circle
            if (i == 0) {
                prev = 5;
            } else if (i == 5) {
                next = 0;
            }
            const [bx, by] = allNeighbors[i];
            const [px, py] = allNeighbors[prev];
            const [nx, ny] = allNeighbors[next];


            if (( this.board[bx][by] == null || this.board[bx][by] == 'move') &&
               ((this.board[px][py] == null || this.board[px][py] == 'move') ||
                (this.board[nx][ny] == null || this.board[nx][ny] == 'move')) ) {
                    legalMoves.push(allNeighbors[i]);
                }
        }

        return legalMoves;
    }

    public getScurryMoves(p: Hex, movesLeft: number ):Array<[number, number]> {


        this.refreshBoard();
        const legalMoves: Array<[number, number]>|null = [[3,6], [0,1]];
        const freeNeighbors:Array<[number, number]>|null  = this.getLegalNeighbors(p);

        // this.floodFillPrep(0,0);

            if(legalMoves)
            for(let i = 0; i < legalMoves.length; i++){
                this.board[legalMoves[i][0]][legalMoves[i][1]] = 'move';
               
            }

            return legalMoves
    }


}

// Board.prototype.moveableLocations = function(location, distance, visited){
//     // var moveableLocations = [];
//     // var _this = this;
//     var distance = distance || 1;
//     var visited = visited || {};
//     visited[location] = location;
//     var possibleLocations = Board.surroundingLocations(location);
//     for(var i = 0; i < possibleLocations.length; i++){
//       var neighborLocation = possibleLocations[i];
//       var neighbor = this.hive[neighborLocation];
//       if (neighbor || visited[neighborLocation]){
//         continue;
//       }
//       var adjacentLeft = this.hive[possibleLocations[ (i === 0) ? 5 : i - 1 ]];
//       if (adjacentLeft && adjacentLeft.isMoving){
//         adjacentLeft = undefined;
//       }
//       var adjacentRight = this.hive[possibleLocations[ (i === 5) ? 0 : i + 1 ]];
//       if (adjacentRight && adjacentRight.isMoving){
//         adjacentRight = undefined;
//       }
//       if(!adjacentLeft != !adjacentRight){
//         if(distance === Number.POSITIVE_INFINITY || distance === 1){
//           moveableLocations.push(neighborLocation);
//         }
//         if(distance > 1){
//           moveableLocations = moveableLocations.concat(this.moveableLocations(neighborLocation, distance - 1, visited));
//         }
//       }
//     }
//     return moveableLocations;
//   }

