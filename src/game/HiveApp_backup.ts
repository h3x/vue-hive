function Hive(c:HTMLCanvasElement){
    // canvas:HTMLCanvasElement;
    // ctx:CanvasRenderingContext2D;
    // size:number;
    // tileCenters:Array<[number, number]>;
    // const pieces:Hex[];
    // const hexBounds:{
    //     xStart:number,
    //     xEnd:number,
    //     yStart:number,
    //     yEnd:number,
    // };

    //constructor(canvas:HTMLCanvasElement){
        //this.canvas = document.getElementById('game') as HTMLCanvasElement;
        const canvas = c;
        const ctx = canvas.getContext('2d') as  CanvasRenderingContext2D;
        // initially size the canvas the same as the viewport size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // describes the boundries for the hex grid game board
        const hexBounds = {
            xStart: 10,
            xEnd: canvas.width - 10,
            yStart: 10,
            yEnd: canvas.height - 100,
        }

        const size = 45;
        // holds the center co-ords of each map tile
        const tileCenters:Array<[number, number]> = [];
        // holds all Hex objects (i.e, game pieces) 
        const pieces:Hex[] = [];

        let s_image:HTMLImageElement;


    //}

    // initial game setup
    function setup(){      
          
        //temp
        const s_image = new Image();
        s_image.src = './assets/spider.png';
        // endtemp
    

        document.body.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        // calculate the centers of the board tiles
        calcCenters();

        /*
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
        */

        // listen for click events
        let selectedHex:Hex|undefined;
        let stack:Hex[] = [];
        canvas.addEventListener("mousedown", evt => {
            const rect = canvas.getBoundingClientRect();
            const cx = evt.clientX - rect.left;
            const cy = evt.clientY - rect.top;

            function dist(p1:[number,number], p2:[number,number]) {
                return Math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)
            }

            if(!selectedHex) {
                pieces.forEach(piece =>{
                    if(dist([cx, cy], piece.getLocation()) < size && piece.isMoveable()){
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
                selectedHex.setLocation(cx, cy, tileCenters);
                pieces.forEach( p => p.unselect())
                selectedHex = undefined;
            }
        })

        //resize the canvas to 100% viewport width and height whenever window is resized
        window.addEventListener('resize', () => {
            console.log("resize listener")
            resizeCanvas();
            calcCenters();
        }, false);

        

        // start the gameloop
        window.setInterval(() => draw(), 20/1000);
    }

    // called when the canvas needs to be resized
    function resizeCanvas() {
        // console.log("resizeCanvas function")
        // console.log(this.canvas.width)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        //console.log(canvas.width)
        ctx.fillStyle = '#101115';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        
    }

    function getSize() {
        return size;
    }

    function calcHexPoints(x:number, y:number, size:number){
        const sides:Array<[number, number]> = [];
        for(let side = 0; side < 7; side++){
            const lx = x + size * Math.cos(side * 2 * Math.PI / 6);
            const ly = y + size * Math.sin(side * 2 * Math.PI / 6);
            sides.push([lx, ly]);
        }
        return sides;
    }

    function drawHexBackground(x:number, y:number, size:number){
        // get all the corner points for the hex
        const hexPoints:Array<[number, number]> = calcHexPoints(x,y,size);
        
        // start the path
        ctx.beginPath();
        const s = hexPoints.shift();
        if(s){
            const [sx, sy] = s;
            ctx.moveTo(sx,sy);
            
            // draw the hex
            hexPoints.forEach((point)=>{
                const [lx, ly] = point;
                ctx.lineTo(lx,ly);
            })       
            ctx.strokeStyle = '#1012f';
            ctx.fill();
            ctx.stroke();
        }
    }

    // calculate the centers of the map tiles to be used for grid snapping later
    function calcCenters(){

        hexBounds.xEnd = canvas.width - 10;
        hexBounds.yEnd = canvas.height - 10;
        
        // spaceing betweeen each hex piece
        const heightSpace =  Math.sqrt(3) * getSize();
        const widthSpace = 2 * getSize() * 3/4;

        for(let x = hexBounds.xStart + size; x < hexBounds.xEnd; x += widthSpace * 2 ) {
            for(let y = hexBounds.xStart + size; y< hexBounds.yEnd; y += heightSpace){
                ctx.lineWidth = 2;
                tileCenters.push([x,y]);
                // check that the 2nd column wont be outside the canvas
                if(x + widthSpace < hexBounds.xEnd && y + heightSpace < hexBounds.yEnd){
                    tileCenters.push([x + widthSpace,y + heightSpace/2]);
                }
            }
        }
    }

    // the draw loop
    function draw(){
        // clear the screen on every frame
        ctx.fillStyle = '#101115';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        
        ctx.strokeStyle = 'black';       

        tileCenters.forEach( tile => {
            drawHexBackground(tile[0], tile[1], size);
        })

        pieces.forEach( p => p.draw(ctx, s_image))
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
export default {
    HiveApp,
  };