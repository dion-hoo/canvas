export class Text {
    constructor(x, y, fontSize) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
    }

    draw(ctx, text, left, top) {
        this.x += left;
        this.y += top;

        const t = parseInt(text);

        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.font = `${this.fontSize}px system-ui`;
        ctx.fillText(t, this.x, this.y);
        ctx.restore();
    }
}
