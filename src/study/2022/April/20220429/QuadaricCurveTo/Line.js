export class Line {
    constructor() {}

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        this.points = [
            { x: this.centerX, y: 0 },
            { x: this.centerX, y: this.height },
        ];
    }

    draw(ctx, mouse) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;

        console.log(mouse.x);

        const prevX = this.points[0].x;
        const prevY = this.points[0].y;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);

        ctx.quadraticCurveTo(mouse.x, this.centerY, this.points[1].x, this.points[1].y);

        ctx.stroke();
        ctx.closePath();
    }
}
