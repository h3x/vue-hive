import * as RB from './RedBlob';

export default class Hex {
    public x: number;
    public y: number;
    public z: number;
    public size: number;
    public stroke: string;
    public color: string;
    public defaultColor: string;
    public corners: Array<[number, number]>;
    public inPlay: boolean;
    public id: number;
    public isDocked:boolean;

    // Piece type: Queen, Ant, Beetle, Grasshopper, Spider, Ladybug, Mosquito
    // Player: White, Black
    public type: string;
    public player: 'W'|'B';

    public attr = {
        scurry: 0,
    };


    constructor(size: number, type: string, id: number, player: 'W'|'B') {
        this.inPlay = false;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.size = size;
        this.color = '#101115';
        this.defaultColor = '#101115';
        this.corners = [];
        this.isDocked = true;
        // todo
        this.type = type;
        this.player = player;
        this.stroke = '#1012f';
        this.id = id;

        if (this.player == 'W') {
            this.color = '#c5c6c7';
        } else {
            this.color = '#66fcf1';
        }

        this.setColor(this.color);

        this.attr.scurry = 3;
    }

    // set the fill color
    public setColor(color: string) {
        this.color = color;
        this.defaultColor = color;
    }

    public setZ(z: number) {
        this.z += z;
    }

    public unDock(){
        this.isDocked = false;
    }

    public isPieceDocked(){
        return this.isDocked;
    }

    // set the stroke colour
    public setStroke(stroke: string) {
        this.stroke = stroke;
    }

    public isMoveable(): Boolean {
        return this.z >= 0;
    }

    public select(): void {
        this.defaultColor = this.color;
        this.color = 'red';
    }

    public unselect(): void {
        this.setColor(this.defaultColor);
    }

    public resize(size: number): void {
        this.size = size;
    }

    public pieceInPlay(n: boolean) {
        this.inPlay = n;
    }

    public isPieceInPlay(): boolean {
        return this.inPlay;
    }

    public getPlayer(): {color: 'W'|'B', type: string, name: string} {
        return { color: this.player, type: this.type, name: this.player + this.type + this.id};
    }


    public setLocation(x: number, y: number) {
         const [lx, ly] = RB.hex_to_pixel(x, y, this.size);
         [this.x, this.y] = [lx + this.size, ly + this.size];
    }

    public forceLocation(x: number, y: number) {
        [this.x, this.y] = [x, y];
    }

    public getLocation(): [number, number] {
        return [this.x, this.y];
    }

    public getHex(){
        return RB.pixel_to_hex(this.x, this.y, this.size)
    }

    //
    public calcCorners() {
        this.corners = [];
        let lx, ly = 0;
        for (let side = 0; side < 7; side++) {
            lx = this.x + this.size * Math.cos(side * 2 * Math.PI / 6);
            ly = this.y + this.size * Math.sin(side * 2 * Math.PI / 6);
            this.corners.push([lx, ly]);
        }
    }

    // dont know what to do with this yet. whatever needs updating
    public update() {
        //
    }

    // event when the object is clicked
    public clickEvent(cx: number, cy: number, tiles: Array<[number, number]> ) {
        this.setLocation(cx, cy);
    }

    public ptype(): string {
        return 'hex';
    }

    public draw(ctx: CanvasRenderingContext2D, center: [number, number], gridSnap: boolean) {
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
