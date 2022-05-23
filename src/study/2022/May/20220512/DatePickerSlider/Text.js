export class Text {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(0, 255, 0, 1)`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
