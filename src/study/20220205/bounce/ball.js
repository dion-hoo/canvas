export class Ball {
    constructor(x, y, size, width, height) {
        this.x = x;
        this.y = y;
        this.radiusX = size;
        this.radiusY = size;
        this.width = width;
        this.height = height;
        this.vx = Math.random() - 1;
        this.vy = 1;
        this.speed = 10;
    }

    update() {
        this.x += this.speed * this.vx;
        this.y += this.speed * this.vy;

        if (this.x - this.radiusX <= 0 || this.x > this.width - this.radiusX) {
            this.vx *= -1;

            this.x += this.vx;
        }

        if (this.y - this.radiusY <= 0 || this.y > this.height - this.radiusY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#4b9d7b';
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
