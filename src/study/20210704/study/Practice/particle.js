export class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 5;
        this.weight = Math.random() * 10 + 1;
        this.directionX = -1;
    }
    update(canvas, line) {
        if (this.y > canvas.height) {
            this.y = 0;
            this.weight = Math.random() * 10 + 1;
            this.x = Math.random() * canvas.width;
        }
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;

        if (this.x < line.x + line.width && this.x + this.size > line.x && this.y < line.y + line.height && this.y + this.size > line.y) {
            this.y -= 5;
            this.weight *= -0.5;
        }
    }

    draw(ctx) {
        const linear = ctx.createLinearGradient(0, 0, this.size, this.size);

        linear.addColorStop(0, 'blue');
        linear.addColorStop(0.5, 'green');
        linear.addColorStop(1, 'red');

        ctx.fillStyle = linear;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
