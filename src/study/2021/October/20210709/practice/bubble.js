export class Bubble {
    constructor(color, speedY) {
        this.radius = Math.random() * 120 + 30;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius;
        this.color = color;

        this.vy = Math.random() * 0.02 + 0.01 + speedY;
        this.vx = Math.random() * 4 - 2;
        this.vr = 0;
        this.life = true;
    }

    update() {
        this.vy += 0.004;
        this.x += this.vx;
        this.y -= this.vy;

        this.vr += 0.02;
        this.radius -= this.vr;

        if (this.radius <= 1) {
            this.life = false;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
