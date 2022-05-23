import { Point } from './Point.js';

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
    }

    resize(width, height) {
        this.points = [];

        this.width = width;
        this.height = height;

        this.gaps = width / (this.totalPoints - 1);
        this.centerY = height / 2;

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(this.index + i, this.gaps * i, this.centerY);

            this.points.push(point);
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.points.length; i++) {
            if (i < this.points.length - 1) {
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
        ctx.lineTo(0, this.height);

        ctx.fill();
        ctx.closePath();
    }
}
