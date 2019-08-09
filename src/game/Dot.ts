// dot.ts
export default class Dot {
    
    private readonly color: string = "#000";
    constructor(private radius: number) { }
    public draw(canvas: HTMLCanvasElement): void {
        // resize canvas to dot size
        const canvasDim = this.radius * 2;
        canvas.width = canvasDim;
        canvas.height = canvasDim;

        // get context for drawing
        const ctx = canvas.getContext('2d')!;

        // start with a blank slate
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // find the centerpoint
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // create the shape
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}

