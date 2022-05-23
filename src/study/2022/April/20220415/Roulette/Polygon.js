let angle = Math.PI * 2;

export class Polygon {
    constructor(sides, x, y, radius, image) {
        this.x = x;
        this.y = y;
        this.sides = sides;
        this.radius = radius;
        this.rotate = 0;
        this.image = image;
    }

    update(mouse) {
        this.rotate += mouse.moveX * 0.006;
        mouse.moveX *= 0.99;
    }

    draw(ctx) {
        const degree = angle / this.sides;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
            const px = Math.cos(i * degree) * this.radius;
            const py = Math.sin(i * degree) * this.radius;

            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.fill();
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }
}
