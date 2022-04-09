export class Particle {
    constructor(x, y, width, height, hsl) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.width = width;
        this.height = height;
        this.vx = Math.random() * 1.5 - 0.5;
        this.vy = Math.random() * 1.5 - 0.5;
        this.hsl = hsl;
        this.end = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (
            this.x - this.radius / 2 < 0 ||
            this.x + this.radius / 2 > this.width ||
            this.y - this.radius / 2 < 0 ||
            this.y + this.radius / 2 > this.height
        ) {
            this.end = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hsl}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
