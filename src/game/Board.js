import * as RB from './RedBlob';
export default class Board {
    constructor(canvas) {
        //       width    height
        this.boardDims = { width: 30, height: 14 };
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
    getBoard() {
        return this.board;
    }
    getDims() {
        return this.boardDims;
    }
    getBoardClone() {
        return [...this.board];
    }
    // place a piece in the board array
    placePiece(p, x, y) {
        if (this.board[y][x] === null || this.board[y][x] === 'move') {
            this.board[y][x] = p;
            return true;
        }
        else {
            return false;
        }
    }
    refreshBoard() {
        for (let i = 0; i < this.boardDims.height; i++) {
            this.board[i] = new Array();
            for (let j = 0; j < this.boardDims.width; j++) {
                if (this.board[i][j] == 'move' || this.board[i][j] == 'c') {
                    this.board[i][j] = null;
                }
            }
        }
    }
    // remove a piece from the board array
    removePiece(p, x, y) {
        this.board[y][x] = null;
        return true;
    }
    // move a piece from one location to another
    move(p, x, y, pvs) {
        if (p.isPieceInPlay() && pvs) {
            return (this.removePiece(p, pvs[0], pvs[1]) && this.placePiece(p, x, y));
        }
        else {
            p.pieceInPlay(true);
            return this.placePiece(p, x, y);
        }
    }
    // TODO: fix board edges  so neighbours are only real spots
    // get all the neighbours of a piece
    getNeighbours(cx, cy) {
        const n = [];
        // console.log(cx, cy)
        // const [x,y] = RB.pixel_to_hex(cx,cy, this.size);
        for (let s = 0; s < 6; s++) {
            n.push(RB.neighbor(cx, cy, s));
        }
        return n;
    }
    // check that moving a piece doesnt violate the one hive rule
    oneHive(_board) {
        return true;
        // dont know what to do with this yet
        // _board[px][py] = null;
        // if(!this.oneHive(_board)){
        //     return [];
        // }
    }
    floodFill(nx, ny) {
        // console.log(nx,ny)
        if (this.board[ny] === undefined || this.board[ny][nx] === undefined || this.board[ny][nx] !== null) {
            return;
        }
        else {
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
                if (ny - 1 >= 0) {
                    this.floodFill(nx + 1, ny - 1);
                }
            }
        }
    }
    floodFillPrep(nx, ny) {
        for (let i = 0; i < this.boardDims.height; i++) {
            for (let j = 0; j < this.boardDims.width; j++) {
                if (this.board[i][j] === 'move') {
                    this.board[i][j] = null;
                }
            }
        }
        this.floodFill(nx, ny);
    }
    getLegalNeighbors(p) {
        const [lx, ly] = p.getLocation();
        const allNeighbors = this.getNeighbours(lx, ly);
        const legalMoves = [];
        for (let i = 0; i < 6; i++) {
            let prev = i - 1;
            let next = i + 1;
            // circle
            if (i == 0) {
                prev = 5;
            }
            else if (i == 5) {
                next = 0;
            }
            const [bx, by] = allNeighbors[i];
            const [px, py] = allNeighbors[prev];
            const [nx, ny] = allNeighbors[next];
            if ((this.board[bx][by] == null || this.board[bx][by] == 'move') &&
                ((this.board[px][py] == null || this.board[px][py] == 'move') ||
                    (this.board[nx][ny] == null || this.board[nx][ny] == 'move'))) {
                legalMoves.push(allNeighbors[i]);
            }
        }
        return legalMoves;
    }
    getScurryMoves(p, movesLeft) {
        this.refreshBoard();
        const legalMoves = [];
        const legalNeighbors = this.getLegalNeighbors(p);
        const [px, py] = p.getLocation();
        console.log(legalNeighbors);
        // this.floodFillPrep(0,0);
        if (movesLeft === 0) {
            return [];
        }
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
//# sourceMappingURL=Board.js.map