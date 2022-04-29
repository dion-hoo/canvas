export class Circle {
    constructor(color, radius) {
        this.radius = radius;

        this.x = Math.random() * innerWidth + this.radius - this.radius;
        this.y = Math.random() * innerHeight + this.radius - this.radius;

        this.total = 100;
        this.gap = 1 / this.total;
        this.originPos = [];
        this.pos = [];
        this.color = color;

        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;

        for (let i = 0; i < this.total; i++) {
            const pos = this.getPoint(this.gap * i);

            this.originPos[i] = pos;
            this.pos[i] = pos;
        }

        this.fps = 10;
        this.fpsTime = 1000 / this.fps;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius) {
            this.x = this.width + this.radius;
        }
        if (this.x > this.width + this.radius) {
            this.x = -this.radius;
        }
        if (this.y < -this.radius) {
            this.y = this.height + this.radius;
        }
        if (this.y > this.height + this.radius) {
            this.y = -this.radius;
        }
    }

    draw(ctx, t) {
        if (!this.time) {
            this.time = t;
        }

        const now = t - this.time;
        if (now > this.fpsTime) {
            this.time = t;
            this.updatePoint();
        }

        const posX = this.pos[0].x;
        const posY = this.pos[0].y;

        ctx.fillStyle = `rgba(255,255,255,1)`;
        ctx.beginPath();
        ctx.moveTo(this.x + posX, this.y + posY);
        for (let i = 1; i < this.total; i++) {
            const pos = this.pos[i];

            ctx.lineTo(this.x + pos.x, this.y + pos.y);
        }
        ctx.fill();
        ctx.closePath();
    }

    updatePoint() {
        for (let i = 0; i < this.total; i++) {
            const pos = this.originPos[i];

            this.pos[i] = {
                x: pos.x + this.randomInt(10),
                y: pos.y + this.randomInt(10),
            };
        }
    }

    randomInt(max) {
        return Math.random() * max;
    }

    getPoint(gap) {
        const theta = Math.PI * 2 * gap;

        const x = Math.cos(theta) * this.radius;
        const y = Math.sin(theta) * this.radius;

        return { x, y };
    }
}
