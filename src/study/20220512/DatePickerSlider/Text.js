export class Text {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
