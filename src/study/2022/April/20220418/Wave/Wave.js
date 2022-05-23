import { Point } from './Point.js';

export class Wave {
    constructor(color) {
        this.radius = 30;
        this.points = [];
        this.numberOfPoints = 5;
        this.color = color;

        this.init();
    }

    init() {
        for (let i = 0; i < this.numberOfPoints; i++) {
            this.points.push(new Point(i, (i * innerWidth) / (this.numberOfPoints - 1), innerHeight * 0.7));
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        for (let i = 0; i < this.points.length; i++) {
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;

            if (i !== 0 && i !== this.points.length - 1) {
                this.points[i].update();
            }
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(prevX, innerHeight);
        ctx.lineTo(0, innerHeight);

        ctx.fill();
        ctx.closePath();
    }
}
