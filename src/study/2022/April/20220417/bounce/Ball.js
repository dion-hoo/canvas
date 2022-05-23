export class Ball {
    constructor() {
        this.x = innerWidth / 2;
        this.y = 100;
        this.radius = 30;
        this.mass = 10;
        this.vy = 0;
        this.acceleration = 3;
    }

    update() {
        this.vy += this.mass * 0.001;
        this.y += this.vy;

        if (this.y > innerHeight - this.radius) {
            this.y = innerHeight - this.radius;
            this.vy *= -0.5;
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
