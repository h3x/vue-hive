import Hex from './Hex';

export default class HiveApp{
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    size:number;
    tileCenters:Array<[number, number]>;
    pieces:Hex[];
    hexBounds:{
        xStart:number,
        xEnd:number,
        yStart:number,
        yEnd:number,
    };

    constructor(canvas:HTMLElement){
        //this.canvas = document.getElementById('game') as HTMLCanvasElement;
        this.canvas = canvas as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as  CanvasRenderingContext2D;

        // initially size the canvas the same as the viewport size
        this.canvas.width = window.innerWidth * 0.95;
        this.canvas.height = window.innerHeight * 0.9;

        // describes the boundries for the hex grid game board
        this.hexBounds = {
            xStart: 10,
            xEnd: this.canvas.width - 10,
            yStart: 10,
            yEnd: this.canvas.height - 100,
        }

        this.size = 45;
        // holds the center co-ords of each map tile
        this.tileCenters = [];
        // holds all Hex objects (i.e, game pieces) 
        this.pieces = [];


    }

    // initial game setup
    public setup(){      
          
        //temp
        const s_image = new Image();
        s_image.src = './assets/spider.png';
        // endtemp
    

        document.body.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        // calculate the centers of the board tiles
        this.calcCenters();

        
        // create 10 random pieces
        for(let i = 0; i < 10; i++){
            const hx = Math.floor(Math.random() * this.canvas.width);
            const hy = Math.floor(Math.random() * this.canvas.height);
            const piece = ['Q','A','B','G','S','L','M'][Math.floor(Math.random() * 7)];
            const player = ['W', 'B'][Math.floor(Math.random() * 2)];
            const h = new Hex(0,0, this.size, piece, player)
            
            h.setLocation(hx, hy, this.tileCenters);
            this.pieces.push(h);
        }
        

        // listen for click events
        let selectedHex:Hex|undefined;
        let stack:Hex[] = [];
        this.canvas.addEventListener("mousedown", evt => {
            const rect = this.canvas.getBoundingClientRect();
            const cx = evt.clientX - rect.left;
            const cy = evt.clientY - rect.top;

            function dist(p1:[number,number], p2:[number,number]) {
                return Math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)
            }

            if(!selectedHex) {
                this.pieces.forEach(piece =>{
                    if(dist([cx, cy], piece.getLocation()) < this.size && piece.isMoveable()){
                        selectedHex = piece;
                        selectedHex.select()
                    }
                })
            }
            else {
                //TODO: All this is about piece z stacking. think about this a little more
                // pieces.forEach(piece =>{
                //     if(dist([cx, cy], piece.getLocation()) < size && selectedHex){
                //         piece.setZ(-1);
                //         selectedHex.size = 40;
                //     }
                // })
                console.log(stack)
                stack = [];
                selectedHex.setLocation(cx, cy, this.tileCenters);
                this.pieces.forEach( p => p.unselect())
                selectedHex = undefined;
            }
        })

        //resize the canvas to 100% viewport width and height whenever window is resized
        window.addEventListener('resize', () => {
            console.log("resize listener")
            this.resizeCanvas();
            this.calcCenters();
        }, false);

        

        // start the gameloop
        window.setInterval(() => this.draw(), 20/1000);
    }

    // called when the canvas needs to be resized
    resizeCanvas() {
        // console.log("resizeCanvas function")
        // console.log(this.canvas.width)
        this.canvas.width = window.innerWidth *.9;
        this.canvas.height = window.innerHeight *.9;
        //console.log(this.canvas.width)
        this.ctx.fillStyle = '#101115';
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        
    }

    getSize() {
        return this.size;
    }

    calcHexPoints(x:number, y:number, size:number){
        const sides:Array<[number, number]> = [];
        for(let side = 0; side < 7; side++){
            const lx = x + size * Math.cos(side * 2 * Math.PI / 6);
            const ly = y + size * Math.sin(side * 2 * Math.PI / 6);
            sides.push([lx, ly]);
        }
        return sides;
    }

    drawHexBackground(x:number, y:number, size:number){
        // get all the corner points for the hex
        const hexPoints:Array<[number, number]> = this.calcHexPoints(x,y,size);
        
        // start the path
        this.ctx.beginPath();
        const s = hexPoints.shift();
        if(s){
            const [sx, sy] = s;
            this.ctx.moveTo(sx,sy);
            
            // draw the hex
            hexPoints.forEach((point)=>{
                const [lx, ly] = point;
                this.ctx.lineTo(lx,ly);
            })       
            this.ctx.strokeStyle = '#1012f';
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    // calculate the centers of the map tiles to be used for grid snapping later
    calcCenters(){

        this.hexBounds.xEnd = this.canvas.width - 10;
        this.hexBounds.yEnd = this.canvas.height - 10;
        
        // spaceing betweeen each hex piece
        const heightSpace =  Math.sqrt(3) * this.getSize();
        const widthSpace = 2 * this.getSize() * 3/4;

        for(let x = this.hexBounds.xStart + this.size; x < this.hexBounds.xEnd; x += widthSpace * 2 ) {
            for(let y = this.hexBounds.xStart + this.size; y< this.hexBounds.yEnd; y += heightSpace){
                this.ctx.lineWidth = 2;
                this.tileCenters.push([x,y]);
                // check that the 2nd column wont be outside the canvas
                if(x + widthSpace < this.hexBounds.xEnd && y + heightSpace < this.hexBounds.yEnd){
                    this.tileCenters.push([x + widthSpace,y + heightSpace/2]);
                }
            }
        }
    }

    // the draw loop
    draw(){
        // clear the screen on every frame
        this.ctx.fillStyle = '#101115';
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        
        this.ctx.strokeStyle = 'black';       

        this.tileCenters.forEach( tile => {
            this.drawHexBackground(tile[0], tile[1], this.size);
        })

        this.pieces.forEach( p => p.draw(this.ctx, this.s_image))
    }
   
    //this may not be a good idea. have to see if i need it
    // window.addEventListener('wheel', (evt) => {
    //     evt.deltaY < 0 ? size -=2 :  size += 2;
    //     while(tileCenters.length > 0) {
    //         tileCenters.pop();
    //     }
    //     calcCenters();
    //     pieces.forEach( p => p.resize(size));
    //     draw();

    // });

    // Setup to initial state of the game
    //this.setup();
}