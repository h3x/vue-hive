import Hex from './Hex';
import Board from './Board';
import * as RB from './RedBlob';
import * as Dot from './Dot';
import * as io from 'socket.io-client';
import { Socket } from 'vue-socket.io-extended';

export default class HiveApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private $Socket: SocketIOClientStatic['Socket'];


    // tile size
    private size: number;

    //
    private heightSpace: number;
    private widthSpace: number;
    private whiteQueen: Hex;
    private blackQueen: Hex;


    private colors: {
        black: string,
        d_grey: string,
        l_grey: string,
        ll_grey: string,
        l_green: string,
        d_green: string,
        accent: string,
    };

    private board: Board;
    private boardDims: {width: number, height: number};

    private pieces: Hex[];
    private legalMoves: Array<[number, number]> = [];
    private moveCount: number;
    private turn: 'W'|'B'|null;
    private isOnline: boolean;

    private selectedHex: Hex|null;
    private previousLocation: [number, number]|null;
    private room: string;
    private playerColor: 'W'|'B';


    constructor(canvas: HTMLElement, room: string) {

        // canvas initaliser
        this.canvas = canvas as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as  CanvasRenderingContext2D;

        // socket setup
        this.room = room;
        this.room === undefined ? this.isOnline = false : this.isOnline = true;
        this.$Socket = io.connect('http://localhost:3001');

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
        this.canvas.height = this.canvas.width * 0.5; // window.innerHeight * 0.9;

        // setup the board and get some info
        this.board = new Board(this.canvas);
        this.boardDims = this.board.getDims();

        // set the size of the hex tiles
        this.size = this.canvas.width / this.boardDims.width * 0.55; // 55% seems to be the magic number???
        this.heightSpace =  Math.sqrt(3) * this.size;
        this.widthSpace = 2 * this.size * 3 / 4;

        // intialiste pieces and player
        this.pieces = [];
        this.moveCount = 0;
        this.turn = 'W';
        this.playerColor = 'W';

        // for the click stuff
        this.selectedHex = null;
        this.previousLocation = null;
        this.legalMoves = [];

        // queens are named for win condition check and queenInFour check
        this.whiteQueen = new Hex(this.size, 'Q', 0, 'W');
        this.blackQueen = new Hex(this.size, 'Q', 0, 'B');
    }

    // change player
    public nextPlayer() {
        if (this.turn === 'W') {
            this.turn = 'B';
        } else {
            this.turn = 'W';
        }
        this.moveCount++;
    }

    // calculate the corners of the hex
    public calcHexPoints(x: number, y: number, size: number) {
        const sides: Array<[number, number]> = [];
        for (let side = 0; side < 7; side++) {
            const lx = x + size * Math.cos(side * 2 * Math.PI / 6);
            const ly = y + size * Math.sin(side * 2 * Math.PI / 6);
            sides.push([lx, ly]);
        }
        return sides;
    }

    public checkSize() {
        window.addEventListener('resize', () => {

            this.resizeCanvas();
        }, false);
    }


    // initial game setup
    public setup() {

        // if game is online
        if (this.isOnline) {
            // resubscribe to the room
            this.$Socket.emit('subscribeGame', this.room);

            // get player color
            this.$Socket.on('player', (color: 'W'|'B') => {
                this.playerColor = color;
                // as soon as you recievce the color assignment, stop listening for another color assignment
                this.$Socket.removeListener('player');
            });

            // socket listener for game data // TODO: extract this into its own function out of the setup function
            this.socketListener();
        }

        this.setupPieces();
        this.clickListener();
        this.checkSize();

        // start the game loop
        window.setInterval(() => this.draw(), 20);

    }

    // the draw loop
    public draw() {
        // clear the screen on every frame
        this.ctx.fillStyle = this.colors.black;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.checkWin();

        // Draw legal moves
        this.legalMoves.forEach((pos) => Dot.draw(this.ctx, pos, this.size));

        // Draw pieces
        this.pieces.forEach((p) => p.draw(this.ctx, p.getHex(), true));
    }



    // simple distance calculator
    private dist(p1: [number, number], p2: [number, number]) {
        return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
    }

    // TODO: fix the click thing when you click a piece then not the board, the turn changes without piece being moved
    // also i think i need a condition for 'no move avalible' and turn is skipped
    private clickListener() {
        this.canvas.addEventListener('mousedown', (evt) => {
            const rect = this.canvas.getBoundingClientRect();
            const cx = evt.clientX - rect.left;
            const cy = evt.clientY - rect.top;

            if (!this.isOnline || (this.turn && this.playerColor === this.turn)) {
                if (!this.selectedHex) {
                    this.firstClick(cx, cy);
                } else {
                    this.secondClick(cx, cy);
                }
             }
        });
    }

    private socketListener() {
        this.$Socket.on('game', (data: any) => {
            // loop throught the board
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    // if no piece on this hex, skip
                    if (data[i][j] === null) {
                        continue;
                    } else {
                        // find the right piece and move it there
                        for (let k = 0; k < this.pieces.length; k++) {
                            if (data[i][j].id === this.pieces[k].id) {
                                this.board.move(this.pieces[k], data[i][j].hx, data[i][j].hy);
                                this.pieces[k].unDock();
                            }
                        }
                    }
                }
            }
            this.nextPlayer();
        });
    }

    private firstClick(cx: number, cy: number) {
        if (!this.isOnline || this.playerColor === this.turn) {
            this.pieces.forEach((piece) => {
                if (this.dist([cx, cy], piece.getLocation()) < this.size &&
                    piece.isMoveable() &&
                    (piece.getPlayer().color === this.turn || !this.isOnline)) {
                        this.selectedHex = piece;

                    // normal game play
                        if (this.moveCount > 1) {
                        if (!this.queenInFour()) {
                            if (this.turn === 'W') {
                                this.selectedHex = this.whiteQueen;
                            } else {
                                this.selectedHex = this.blackQueen;
                            }
                        }

                        this.selectedHex.select();
                        this.previousLocation = piece.getHex();

                        if (this.selectedHex.isPieceDocked()) {
                            this.legalMoves = this.board.newPiece(piece, this.pieces);
                        } else if (this.turn && this.board.queenPlayed[this.turn]) {
                            if (this.selectedHex.attr.scurry) {
                                this.legalMoves = this.board.getScurryMoves(this.selectedHex, this.selectedHex.attr.moves, this.pieces);
                            } else if (this.selectedHex.attr.canJump) {
                                this.legalMoves = this.board.getJumpMoves(this.selectedHex, this.pieces);
 }
                        }
                    } else {
                        if (this.turn && this.selectedHex.type === 'Q') {
                            this.board.queenPlayed[this.turn] = true;
                        }
                        this.selectedHex.unDock();
                        this.firstTwoMoves(this.selectedHex);
                        this.selectedHex =  null;

                    }
                }
            });
        }
    }


    private secondClick(cx: number, cy: number) {
        if (this.selectedHex) {
            const [hx, hy] = this.selectedHex.getHex(); // piece location
            const [px, py] = RB.pixel_to_hex(cx, cy, this.size); // click location

            // this nightmare just makes sure the click was on a location with a legal move
            const isLegal: boolean = this.legalMoves.map(([x, y]) => x === px && y === py).includes(true);

            this.pieces.forEach((p) => p.unselect()); // unselect all pieces

            if (isLegal) { // check the piece is being moved before moving the pience and changing turns to other player
                if (this.selectedHex.type === 'Q' && this.turn) {
                    this.board.queenPlayed[this.turn] = true;
                }
                const bx = Math.min(px, this.boardDims.width);
                const by = Math.min(py, this.boardDims.height);
                this.board.move(this.selectedHex, bx, by, [hx, hy]); // dirty bounds hack


            }
        }

        // make sure the player actually moved
        if (this.selectedHex && this.previousLocation &&
            this.dist(this.previousLocation, this.selectedHex.getHex()) !== 0) {
            this.selectedHex.unDock();

            if (this.isOnline) {
                this.$Socket.emit('game', this.board.getBoard(), this.room);
            } else {
                this.nextPlayer();
            }
        }

        this.legalMoves = [];
        this.selectedHex = null;

    }

    // check if the white queen or the black queen have been surrounded
    // TODO: maybe pull the text part outta here i dont know
    private checkWin() {

        if (this.board.getAdjacentPieces(this.whiteQueen, this.pieces).length > 5) {
            this.ctx.fillStyle = this.blackQueen.color;
            this.ctx.font = '48px serif';
            this.ctx.fillText('Black wins!', Math.floor(this.canvas.width / 2), 60);
            this.turn = null;
        }
        if (this.board.getAdjacentPieces(this.blackQueen, this.pieces).length > 5) {
            this.ctx.fillStyle = this.whiteQueen.color;
            this.ctx.font = '48px serif';
            this.ctx.fillText('White wins!', 10, 50);
            this.turn = null;
        }


    }

    // check the queen has been moved in the first 4 pieces
    private queenInFour(): boolean {
        const white = this.pieces.filter((el) => !el.isPieceDocked() && el.player === 'W');
        const black = this.pieces.filter((el) => !el.isPieceDocked() && el.player === 'B');

        if (this.turn === 'W' && white.length > 2 && !this.board.queenPlayed.W) {
            return false;
        } else if (this.turn === 'B' && black.length > 2 && !this.board.queenPlayed.B) {
            return false;
        } else {
            return true;
        }
    }

    private firstTwoMoves(selectedHex: Hex) {
        if (this.moveCount === 0) {
            this.board.move(selectedHex, 15, 6);
        } else {
            this.board.move(selectedHex, 14, 6);
        }
        if (this.isOnline) {
            this.$Socket.emit('game', this.board.getBoard(), this.room, this.playerColor);
        } else {
            this.nextPlayer();
        }
    }


    // TODO: make this work properly and less hack
    private resizeCanvas() {
        this.canvas.width = window.innerWidth * 0.95;
        this.canvas.height = window.innerHeight * 0.9;
        this.size = this.canvas.width / this.boardDims.width * 0.55;
        this.ctx.fillStyle = '#101115';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


    }


    // TODO: extract this into something more better when theres time
    private setupPieces() {
        const pieces: Array<[string, number]> = [['Q', 0], ['A', 0], ['A', 1], ['A', 2], ['G', 0], ['G', 1], ['G', 2], ['S', 0], ['S', 1]];
        // Black pieces
        for (let i = 0; i < pieces.length; i++) {
            let h = new Hex(this.size, pieces[i][0], pieces[i][1], 'B');
            if (pieces[i][0] === 'Q') {
                h = this.blackQueen;
            }

            const fx = this.canvas.width - this.widthSpace;
            const fy = this.canvas.height - this.heightSpace * (i + 1);
            // force the piece into an illegal position off the board
            h.forceLocation(fx, fy);
            this.pieces.push(h); // needed for click listeners
        }
        // White pieces
        for (let i = 0; i < pieces.length; i++) {
            let h = new Hex(this.size, pieces[i][0], pieces[i][1], 'W');
            if (pieces[i][0] === 'Q') {
                h = this.whiteQueen;
            }
            const fx = this.canvas.width - this.widthSpace * 3;
            const fy = this.canvas.height - this.heightSpace * (i + 1);
            h.forceLocation(fx, fy);
            this.pieces.push(h);
        }
    }

    // not needed at the moment. maybe in the future
    // public drawHex(hx: number, hy: number) {
    //     const [cx, cy] = this.calcTileCenter(hx, hy);
    //     const points = this.calcHexPoints(cx + this.size, cy + this.size, this.size);

    //     // start the path
    //     this.ctx.beginPath();
    //     const s = points.shift();
    //     // null check
    //     if (s) {
    //         const [sx, sy] = s;
    //         this.ctx.moveTo(sx, sy);

    //         // draw the hex
    //         points.forEach((point) => {
    //             const [lx, ly] = point;
    //             this.ctx.lineTo(lx, ly);
    //         });
    //     }

    //     this.ctx.fillStyle = this.colors.black;
    //     this.ctx.lineWidth = 2;
    //     this.ctx.strokeStyle = this.colors.accent;
    //     this.ctx.stroke();
    //     this.ctx.fill();

    // }

    // public calcTileCenter(x: number, y: number): [number, number] {
    //     return RB.hex_to_pixel(x, y, this.size);
    // }



}
