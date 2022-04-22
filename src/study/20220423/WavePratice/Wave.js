import { Point } from './Point.js';

export class Wave {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.total = 6;
        this.points = [];

        this.centerY = this.height / 2;

        this.init();
    }

    init() {
        for (let i = 0; i < this.total; i++) {
            const x = (this.width / (this.total - 1)) * i;
            const y = this.centerY;

            this.points.push(new Point(i + 2, x, y));
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#babdb5';
        ctx.beginPath();

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.total; i++) {
            if (i < this.total - 1) {
                this.points[i].update();
            }

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.width, this.height);
        ctx.lineTo(this.points[0].x, this.height);
        ctx.fill();
        ctx.closePath();
    }

    random(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}
