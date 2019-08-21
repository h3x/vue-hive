import Hex from './Hex';
import Board from './Board';
import * as RB from './RedBlob';
import * as Dot from './Dot';



export default class HiveApp {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    // tile size
    public size: number;

    public heightSpace: number;
    public widthSpace: number;
    public whiteQueen: Hex;
    public blackQueen: Hex;

    public colors: {
        black: string,
        d_grey: string,
        l_grey: string,
        ll_grey: string,
        l_green: string,
        d_green: string,
        accent: string,
    };

    public board: Board;
    public boardState: Array<Array<Hex|null|'move'|'c'>>;
    public boardDims: {width: number, height: number};
    
    public pieces: Hex[];
    public legalMoves: Array<[number,number]> = [];
    public moveCount: number;
    public turn: 'W'|'B'|null;

    private selectedHex:Hex|null;
    private previousLocation:[number, number]|null;
    

    constructor(canvas: HTMLElement) {

        this.canvas = canvas as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as  CanvasRenderingContext2D;

        // colors
        this.colors = {
            black: '#0b0c10',
            d_grey: '#121314',
            l_grey: '#50664a',
            ll_grey: '#c5c6c7',
            l_green: '#66fcf1',
            d_green: '#45a29e',
            accent: '#FFCD6D',
        };

        // initially size the canvas the same as the viewport size
        this.canvas.width = window.innerWidth * 0.95;
        this.canvas.height = window.innerHeight * 0.9;

        this.board = new Board(this.canvas);
        this.boardState = this.board.getBoard();
        this.boardDims = this.board.getDims();

        this.size = this.canvas.width / this.boardDims.width * 0.55; // 55% seems to be the magic number???
        this.heightSpace =  Math.sqrt(3) * this.getSize();
        this.widthSpace = 2 * this.getSize() * 3 / 4;

        this.pieces = [];
        this.moveCount = 0;
        this.turn = 'W';

        this.selectedHex = null;
        this.previousLocation = null;
        this.legalMoves = [];
        this.whiteQueen = new Hex(this.getSize(), 'Q', 0, 'W');
        this.blackQueen = new Hex(this.getSize(), 'Q', 0, 'B');
    }

    public getSize() {
        return this.size;
    }

    public nextPlayer() {
        if (this.turn == 'W') {
            this.turn = 'B';
        } else {
            this.turn = 'W';
        }
    }

    public calcHexPoints(x: number, y: number, size: number) {
        const sides: Array<[number, number]> = [];
        for (let side = 0; side < 7; side++) {
            const lx = x + size * Math.cos(side * 2 * Math.PI / 6);
            const ly = y + size * Math.sin(side * 2 * Math.PI / 6);
            sides.push([lx, ly]);
        }
        return sides;
    }

    public drawDot(cx: number, cy: number, color?: string) {
        this.ctx.fillStyle = color || '#00ff00';
        const [lx, ly] = RB.hex_to_pixel(cx, cy, this.size);
        const [x, y] = [lx + this.size, ly + this.size];
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    public drawHex(hx: number, hy: number) {
        const [cx, cy] = this.calcTileCenter(hx, hy);
        const points = this.calcHexPoints(cx + this.getSize(), cy + this.getSize(), this.getSize());

        // start the path
        this.ctx.beginPath();
        const s = points.shift();
        // null check
        if (s) {
            const [sx, sy] = s;
            this.ctx.moveTo(sx, sy);

            // draw the hex
            points.forEach((point) => {
                const [lx, ly] = point;
                this.ctx.lineTo(lx, ly);
            });
        }

        this.ctx.fillStyle = this.colors.black;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.colors.accent;
        this.ctx.stroke();
        this.ctx.fill();

    }

    public calcTileCenter(x: number, y: number): [number, number] {
        return RB.hex_to_pixel(x, y, this.getSize());
    }

    private dist(p1: [number, number], p2: [number, number]) {
        return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
    }

    // TODO: fix the click thing when you click a piece then not the board, the turn changes without piece being moved
    // also i think i need a condition for 'no move avalible' and turn is skipped
    public clickListener() {
        this.canvas.addEventListener('mousedown', (evt) => {
            const rect = this.canvas.getBoundingClientRect();
            const cx = evt.clientX - rect.left;
            const cy = evt.clientY - rect.top;

            if (!this.selectedHex) {
                this.firstClick(cx, cy);
            } else {
                this.secondClick(cx, cy);
            }
        });
    }

    private firstClick(cx: number, cy: number) {

        this.pieces.forEach((piece) => {
            if (this.dist([cx, cy], piece.getLocation()) < this.size && piece.isMoveable() && piece.getPlayer().color == this.turn) {
                this.selectedHex = piece;

                // normal game play
                if (this.moveCount > 1){
                    if(!this.queenInFour()){
                        if(this.turn ==='W')
                            this.selectedHex = this.whiteQueen;
                        else
                            this.selectedHex = this.blackQueen;
                    }
                    
                    this.selectedHex.select();
                    this.previousLocation = piece.getHex();   

                    if(this.selectedHex.isPieceDocked())
                        this.legalMoves = this.board.newPiece(piece, this.pieces)                           
                    else if(this.board.queenPlayed[this.turn]){
                        if(this.selectedHex.attr.scurry)
                            this.legalMoves = this.board.getScurryMoves(this.selectedHex,this.selectedHex.attr.moves, this.pieces)
                        else if(this.selectedHex.attr.canJump)
                            this.legalMoves = this.board.getJumpMoves(this.selectedHex, this.pieces)
                    }
                    
                }

                // force the first 2 moves to these locations to start the game
                else {
                    if(this.selectedHex.type === 'Q')
                        this.board.queenPlayed[this.turn] = true;
                    this.selectedHex.unDock();
                    this.selectedHex = this.firstTwoMoves(this.selectedHex);
                    
                }                
            }
        });
        this.legalMoves
    }


    private secondClick(cx: number, cy: number) {
        if(this.selectedHex){
            const [hx, hy] = this.selectedHex.getHex(); // piece location
            const [px, py] = RB.pixel_to_hex(cx, cy, this.getSize()); // click location

            // this nightmare just makes sure the click was on a location with a legal move
            const isLegal:boolean = this.legalMoves.map(([x,y]) => x == px && y == py).includes(true)

            this.pieces.forEach((p) => p.unselect()); // unselect all pieces
           
            if (isLegal) { // check the piece is being moved before moving the pience and changing turns to other player
                this.moveCount++;
                this.selectedHex.unDock();
                if(this.selectedHex.type === 'Q' && this.turn){
                    this.board.queenPlayed[this.turn] = true;
                }  
                
                this.board.move(this.selectedHex, Math.min(px, this.boardDims.width), Math.min(py, this.boardDims.height), [hx, hy]); // dirty bounds hack
                this.nextPlayer();

            }
        }
        this.legalMoves = []
        this.selectedHex = null;
        
    }

    private checkWin(){
       
        if(this.board.getAdjacentPieces(this.whiteQueen,this.pieces).length > 5){
            console.log('Black wins!')
            this.ctx.fillStyle = this.blackQueen.color;
            this.ctx.font='48px serif';
            this.ctx.fillText("Black wins!", Math.floor(this.canvas.width/2), 60);
            this.turn = null;
        }
        if(this.board.getAdjacentPieces(this.blackQueen,this.pieces).length > 5){
            console.log('white wins!')
            this.ctx.fillStyle = this.whiteQueen.color;
            this.ctx.font='48px serif';
            this.ctx.fillText("White wins!", 10, 50);
            this.turn = null;
        }
        

    }

    private queenInFour():boolean{
        const white = this.pieces.filter(el => !el.isPieceDocked() && el.player === 'W')
        const black = this.pieces.filter(el => !el.isPieceDocked() && el.player === 'B')

        if(this.turn == 'W' && white.length > 2 && !this.board.queenPlayed['W'])
            return false
        else if(this.turn == 'B' && black.length > 2 && !this.board.queenPlayed['B'])
            return false
        else
            return true
    }

    private firstTwoMoves(selectedHex: Hex) {
        if (this.moveCount === 0) {
            this.board.move(selectedHex, 15, 6);
        }
        else {
            this.board.move(selectedHex, 14, 6);
        }
        this.moveCount++;
        this.nextPlayer();
        return null;
    }

    // initial game setup
    public setup() {

        this.setupPieces();

        // start the game loop
        this.clickListener();
        window.setInterval(() => this.draw(), 20);

    }


    private setupPieces() {
        const pieces: Array<[string, number]> = [['Q',0],['A', 0], ['A', 1], ['A', 2], ['G', 0], ['G', 1], ['G', 2], ['S', 0], ['S', 1]];
        // Black pieces
        for (let i = 0; i < pieces.length; i++) {
            let h = new Hex(this.getSize(), pieces[i][0], pieces[i][1], 'B');
            if(pieces[i][0] === 'Q')
                h = this.blackQueen
            
            const fx = this.canvas.width - this.widthSpace;
            const fy = this.canvas.height - this.heightSpace * (i + 1);
            h.forceLocation(fx, fy);
            this.pieces.push(h); // needed for click listeners
        }
        // White pieces
        for (let i = 0; i < pieces.length; i++) {
            let h = new Hex(this.getSize(), pieces[i][0], pieces[i][1], 'W');
            if(pieces[i][0] === 'Q')
                h = this.whiteQueen
            const fx = this.canvas.width - this.widthSpace * 3;
            const fy = this.canvas.height - this.heightSpace * (i + 1);
            h.forceLocation(fx, fy);
            this.pieces.push(h);
        }
    }

    // the draw loop
    public draw() {
        // clear the screen on every frame
        this.ctx.fillStyle = this.colors.black;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw board
        for ( let hx = 0; hx < this.boardDims.width; hx++) {
            for (let hy = 0; hy < this.boardDims.height; hy++) {
                const p = this.boardState[hy][hx];
                // Skip empty board slots
                if ( p === null) {
                    //this.drawHex(hx,hy);
                    continue;
                } else if (p === 'move') {
                    this.drawDot(hx,hy);
                    }
                }

            }

        this.checkWin()
        // Draw legal moves
        this.legalMoves.forEach(pos=> Dot.draw(this.ctx, pos, this.size));
        
        // Draw pieces
        this.pieces.forEach((p) => p.draw(this.ctx, p.getHex(), true));      
        

    }
}
