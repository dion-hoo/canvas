import { Point } from './Point.js';

export class Hill {
    constructor(width, height) {
        this.points = [];
        this.total = 5;

        this.width = width;
        this.height = height;

        this.init();
    }

    init() {
        for (let i = 0; i < this.total; i++) {
            const x = (this.width / (this.total - 1)) * i;
            const y = this.height * 0.6;

            this.points.push(new Point(i, x, y));
        }
    }

    random(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    draw(ctx) {
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        for (let i = 0; i < this.points.length; i++) {
            if (i !== 0 && i !== this.points.length - 1) {
                this.points[i].update();
            }

            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.lineWidth = 30;
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(this.points[i].x, this.points[i].y);
            ctx.stroke();

            prevX = this.points[i].x;
            prevY = this.points[i].y;
            ctx.closePath();
        }
    }
}
