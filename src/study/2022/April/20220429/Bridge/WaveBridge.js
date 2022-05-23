import { Point } from './Point.js';

export class Bridge {
    constructor(total, color, speed) {
        this.total = total;
        this.color = color;
        this.speed = speed;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.gap = this.width / (this.total - 1);
        this.centerY = this.height * 0.7;

        this.points = [];

        for (let i = 0; i < this.total; i++) {
            this.points.push(new Point(i, this.gap * i, this.centerY));
        }
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 20;

        ctx.beginPath();

        const current = this.points[0];

        // current.x += this.speed;

        if (-this.gap < current.x) {
            this.points.unshift(new Point(1, -this.gap * 2, this.centerY));
        }

        const prevX = current.x;
        const prevY = current.y;

        ctx.moveTo(prevX, prevY);
        for (let i = 1; i < this.points.length; i++) {
            const p = this.points[i];

            // p.update();

            p.x += this.speed;

            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.closePath();
    }
}
