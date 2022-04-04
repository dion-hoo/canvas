export class Particle {
    constructor(x, y, hsl, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = Math.random() * 3 - 0.5;
        this.vy = Math.random() * 3 - 0.5;
        this.radius = 10;
        this.hsl = hsl;
        this.end = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.width || this.y < 0 || this.y > this.height) {
            this.end = true;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `hsl(${this.hsl},100%,50%)`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
