export class People {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = Math.random() * 2 + this.radius * 0.02;
    }

    update() {
        this.y += this.vy;
    }

    bounce(wave) {
        const points = wave.points;

        if (this.y - this.radius < 0 || this.y + this.radius > points[1].y) {
            this.vy *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
