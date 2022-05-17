export class RoundRect {
    constructor(x, y, width, height, padding, radius) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.radius = radius;
    }

    draw(ctx) {
        ctx.save();

        ctx.fillStyle = `rgba(255, 255, 255, 1)`;

        // top left
        ctx.moveTo(this.x + this.padding, this.y + this.radius);
        ctx.quadraticCurveTo(this.x + this.padding, this.y, this.x + this.padding + this.radius, this.y);

        // top right
        ctx.lineTo(this.x + this.width - this.padding - this.radius, this.y);
        ctx.quadraticCurveTo(this.x + this.width - this.padding, this.y, this.x + this.width - this.padding, this.y + this.radius);

        // bottom right
        ctx.lineTo(this.x + this.width - this.padding, this.y + this.height - this.radius);
        ctx.quadraticCurveTo(
            this.x + this.width - this.padding,
            this.y + this.height,
            this.x + this.width - this.padding - this.radius,
            this.y + this.height
        );

        // bottom left
        ctx.lineTo(this.x + this.padding + this.radius, this.y + this.height);
        ctx.quadraticCurveTo(this.x + this.padding, this.y + this.height, this.x + this.padding, this.y + this.height - this.radius);

        ctx.fill();

        ctx.restore();
    }
}
