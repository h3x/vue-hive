import Hex from './Hex';
import Board from './Board';
import * as RB from './RedBlob';
export default class HiveApp {
    constructor(canvas) {
        // this.canvas = document.getElementById('game') as HTMLCanvasElement;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
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
        this.heightSpace = Math.sqrt(3) * this.getSize();
        this.widthSpace = 2 * this.getSize() * 3 / 4;
        // this.tileCenters = [];
        this.docked = [];
        this.pieces = [];
        this.moveCount = 0;
        this.turn = 'W';
    }
    getSize() {
        return this.size;
    }
    nextPlayer() {
        if (this.turn == 'W') {
            this.turn = 'B';
        }
        else {
            this.turn = 'W';
        }
    }
    calcHexPoints(x, y, size) {
        const sides = [];
        for (let side = 0; side < 7; side++) {
            const lx = x + size * Math.cos(side * 2 * Math.PI / 6);
            const ly = y + size * Math.sin(side * 2 * Math.PI / 6);
            sides.push([lx, ly]);
        }
        return sides;
    }
    drawDot(cx, cy, color) {
        this.ctx.fillStyle = color || '#00ff00';
        const [lx, ly] = RB.hex_to_pixel(cx, cy, this.size);
        const [x, y] = [lx + this.size, ly + this.size];
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    drawBox(cx, cy, color) {
        this.ctx.strokeStyle = color || '#00ff00';
        const [lx, ly] = RB.hex_to_pixel(cx, cy, this.size);
        const [x, y] = [lx + this.size, ly + this.size];
        this.ctx.beginPath();
        this.ctx.rect(x, y, 10, 10);
        this.ctx.stroke();
    }
    drawHex(hx, hy) {
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
        this.ctx.strokeStyle = this.colors.black;
        this.ctx.stroke();
        this.ctx.fill();
    }
    calcTileCenter(x, y) {
        return RB.hex_to_pixel(x, y, this.getSize());
    }
    // TODO: fix the click thing when you click a piece then not the board, the turn changes without piece being moved
    // also i think i need a condition for 'no move avalible' and turn is skipped
    clickListener() {
        let selectedHex;
        let previousLocation = null;
        function dist(p1, p2) {
            return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
        }
        this.canvas.addEventListener('mousedown', (evt) => {
            const rect = this.canvas.getBoundingClientRect();
            const cx = evt.clientX - rect.left;
            const cy = evt.clientY - rect.top;
            if (!selectedHex) {
                this.pieces.forEach((piece) => {
                    if (dist([cx, cy], piece.getLocation()) < this.size && piece.isMoveable() && piece.getPlayer().color == this.turn) {
                        selectedHex = piece;
                        this.board.getScurryMoves(selectedHex, 2);
                        if (this.moveCount > 1) {
                            previousLocation = piece.getLocation();
                            selectedHex.select();
                        }
                        else {
                            if (this.moveCount === 0) {
                                this.board.move(selectedHex, 15, 6);
                            }
                            else {
                                this.board.move(selectedHex, 14, 6);
                            }
                            this.moveCount++;
                            this.nextPlayer();
                            selectedHex = undefined;
                        }
                    }
                });
                // this.board.floodFillPrep(0,0);
            }
            else {
                const location = selectedHex.getLocation();
                const [px, py] = RB.pixel_to_hex(cx, cy, this.getSize()); // click hex
                const [hx, hy] = RB.pixel_to_hex(location[0], location[1], this.getSize()); // piece hex
                this.pieces.forEach((p) => p.unselect());
                // console.log(px,py, hx,hy)
                if (!(px == hx && py == hy)) { // check the piece is being moved before moving the pience and changing turns to other player
                    this.nextPlayer();
                    this.moveCount++;
                    this.board.move(selectedHex, Math.min(px, this.boardDims.width), Math.min(py, this.boardDims.height), [hx, hy]); // dirty bounds hack
                }
                previousLocation = null;
                selectedHex = undefined;
            }
        });
    }
    // initial game setup
    setup() {
        document.body.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        const pieces = [['Q', 0], ['A', 0], ['A', 1], ['A', 2], ['G', 0], ['G', 1], ['G', 2], ['S', 0], ['S', 1], ['L', 0], ['M', 0]];
        for (let i = 0; i < pieces.length; i++) {
            const h = new Hex(this.getSize(), pieces[i][0], pieces[i][1], 'B');
            const fx = this.canvas.width - this.widthSpace;
            const fy = this.canvas.height - this.heightSpace * (i + 1);
            h.forceLocation(fx, fy);
            this.docked.push(h); // pieces not yet in play
            this.pieces.push(h); // needed for click listeners
        }
        for (let i = 0; i < pieces.length; i++) {
            const h = new Hex(this.getSize(), pieces[i][0], pieces[i][1], 'W');
            const fx = this.canvas.width - this.widthSpace * 4;
            const fy = this.canvas.height - this.heightSpace * (i + 1);
            h.forceLocation(fx, fy);
            this.docked.push(h); // pieces not yet in play
            this.pieces.push(h); // needed for click listeners
        }
        // this.board.placePiece(h, 10,6)
        // start the game loop
        this.clickListener();
        window.setInterval(() => this.draw(), 20);
    }
    // the draw loop
    draw() {
        // clear the screen on every frame
        this.ctx.fillStyle = this.colors.black;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // draw board
        for (let hx = 0; hx < this.boardDims.width; hx++) {
            for (let hy = 0; hy < this.boardDims.height; hy++) {
                const p = this.boardState[hy][hx];
                if (p === null) {
                    // this.drawHex(hx,hy);
                    continue;
                }
                else if (p !== 'move' && p !== 'c') {
                    const center = [hx, hy];
                    // console.log(`click: ${center}`)
                    const neighbors = this.board.getNeighbours(hx, hy);
                    // console.log(`neighbours: ${neighbors}`)
                    for (let n = 0; n < neighbors.length; n++) {
                        this.drawDot(neighbors[n][0], neighbors[n][1]);
                    }
                    // TODO: Fix this
                    if (p) {
                        p.draw(this.ctx, center, true);
                    }
                }
            }
        }
        if (this.docked.length > 0) {
            this.docked.forEach((p) => {
                p.draw(this.ctx, p.getLocation(), false);
            });
        }
    }
}
//# sourceMappingURL=HiveApp.js.map