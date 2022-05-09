export class Ball {
    constructor(x, y, vx, vy, ax, ay) {
        this.x = x;
        this.y = y;
        this.mass = 30;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
    }

    collision(ball) {
        const x = Math.abs(this.x - ball.x);
        const y = Math.abs(this.y - ball.y);
        const distance = Math.sqrt(x * x + y * y);

        const angle = Math.atan2(this.y - ball.y, this.x - ball.x);
        const unitX = x / distance;
        const unitY = y / distance;

        if (distance - this.mass * 2 <= 0) {
            this.vx = 0;
            this.vy = 0;

            ball.vx = 0;
            ball.vy = 0;

            this.x = ball.x + this.mass * 2 * unitX;
            this.y = ball.y + this.mass * 2 * unitY;
        }
    }

    dounce() {
        if (this.x - this.mass < 0 || this.x > innerWidth - this.mass) {
            this.vx *= -1;
        }

        if (this.y - this.mass < 0 || this.y > innerHeight - this.mass) {
            this.vy *= -1;
        }
    }

    dregreeToRadian(degree) {
        return (degree * Math.PI) / 180;
    }

    update() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;

        this.ax *= 0;
        this.ay *= 0;
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.mass, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.strokeStyle = '#f00';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.mass, this.y);
        ctx.stroke();
        ctx.closePath();
    }
}
