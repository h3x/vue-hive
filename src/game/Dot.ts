import * as RB from './RedBlob';

export function draw(ctx: CanvasRenderingContext2D, center: [number, number], size: number) {
        ctx.fillStyle = '#00ff00';
        const [lx, ly] = RB.hex_to_pixel(center[0], center[1], size);
        const [x, y] = [lx + size, ly + size];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();

}

