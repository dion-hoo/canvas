export class Hill {
    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.points = [];
        this.gap = Math.ceil(this.width / (this.total - 2));

        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY(),
            };
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let current = this.points[0];
        let prev = current;
        let dots = [];

        current.x += this.speed;

        if (-this.gap < current.x) {
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY(),
            });
        }

        if (this.points[this.points.length - 1].x > this.width + 2 * this.gap) {
            this.points.splice(-1);
        }

        ctx.moveTo(current.x, current.y);

        let prevCx = current.x;
        let prevCy = current.y;

        for (let i = 1; i < this.points.length; i++) {
            current = this.points[i];
            current.x += this.speed;

            const cx = (prev.x + current.x) / 2;
            const cy = (prev.y + current.y) / 2;

            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = current;
            prevCx = cx;
            prevCy = cy;
        }
        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.width, this.height);
        ctx.lineTo(this.points[0].x, this.height);

        ctx.fill();
        ctx.closePath();

        return dots;
    }

    getY() {
        const min = this.height / 8;
        const max = this.height - min;

        return min + Math.random() * max;
    }
}
