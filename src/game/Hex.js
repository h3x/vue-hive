import * as RB from './RedBlob';
export default class Hex {
    constructor(size, type, id, player) {
        this.attr = {
            scurry: 0,
        };
        this.inPlay = false;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.size = size;
        this.color = '#101115';
        this.defaultColor = '#101115';
        this.corners = [];
        // todo
        this.type = type;
        this.player = player;
        this.stroke = '#1012f';
        this.id = id;
        if (this.player == 'W') {
            this.color = '#c5c6c7';
        }
        else {
            this.color = '#66fcf1';
        }
        this.setColor(this.color);
        this.attr.scurry = 3;
    }
    // set the fill color
    setColor(color) {
        this.color = color;
        this.defaultColor = color;
    }
    setZ(z) {
        this.z += z;
    }
    // set the stroke colour
    setStroke(stroke) {
        this.stroke = stroke;
    }
    isMoveable() {
        return this.z >= 0;
    }
    select() {
        this.defaultColor = this.color;
        this.color = 'red';
    }
    unselect() {
        this.setColor(this.defaultColor);
    }
    resize(size) {
        this.size = size;
    }
    pieceInPlay(n) {
        this.inPlay = n;
    }
    isPieceInPlay() {
        return this.inPlay;
    }
    getPlayer() {
        return { color: this.player, type: this.type, name: this.player + this.type + this.id };
    }
    setLocation(x, y) {
        const [lx, ly] = RB.hex_to_pixel(x, y, this.size);
        [this.x, this.y] = [lx + this.size, ly + this.size];
    }
    forceLocation(x, y) {
        [this.x, this.y] = [x, y];
    }
    getLocation() {
        return [this.x, this.y];
    }
    //
    calcCorners() {
        this.corners = [];
        let lx, ly = 0;
        for (let side = 0; side < 7; side++) {
            lx = this.x + this.size * Math.cos(side * 2 * Math.PI / 6);
            ly = this.y + this.size * Math.sin(side * 2 * Math.PI / 6);
            this.corners.push([lx, ly]);
        }
    }
    // dont know what to do with this yet. whatever needs updating
    update() {
        //
    }
    // event when the object is clicked
    clickEvent(cx, cy, tiles) {
        this.setLocation(cx, cy);
    }
    ptype() {
        return 'hex';
    }
    draw(ctx, center, gridSnap) {
        // update the locations of the corners based on the [x,y] location
        gridSnap ? this.setLocation(center[0], center[1]) : false;
        this.calcCorners();
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.color;
        let [lx, ly] = this.corners[1];
        // start the path
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        // between each corner, draw a line
        this.corners.forEach((point) => {
            [lx, ly] = point;
            ctx.lineTo(lx, ly);
        });
        // am i pretty?
        const my_gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.size, this.y + this.size);
        my_gradient.addColorStop(0, this.color);
        my_gradient.addColorStop(1, 'grey');
        ctx.fillStyle = my_gradient;
        ctx.fill();
        ctx.stroke();
        ctx.font = '30px Ariel';
        ctx.fillStyle = 'black';
        ctx.fillText(this.type, this.x - this.size / 4, this.y + this.size / 4);
        // ctx.drawImage(img, this.x- this.size/2, this.y-this.size/2,img.width * 0.5,img.height *0.5);
    }
}
//# sourceMappingURL=Hex.js.map