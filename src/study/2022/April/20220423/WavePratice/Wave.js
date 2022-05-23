import { Point } from './Point.js';

export class Wave {
    constructor(index, totalPoints, color, width, height) {
        this.width = width;
        this.height = height;
        this.totalPoints = totalPoints;
        this.points = [];
        this.index = index;
        this.color = color;

        this.centerY = this.height / 2;

        this.init();
    }

    init() {
        for (let i = 0; i < this.totalPoints; i++) {
            const x = (this.width / (this.totalPoints - 1)) * i;
            const y = this.centerY;

            this.points.push(new Point(this.index + i, x, y));
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);
        ctx.beginPath();
        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
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
