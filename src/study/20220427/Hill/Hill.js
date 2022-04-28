export class Hill {
    constructor(color, speed, points) {
        this.color = color;
        this.speed = speed;
        this.points = points;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.hills = [];

        this.gap = Math.ceil(this.width / (this.points - 2));

        for (let i = 0; i < this.points; i++) {
            this.hills[i] = {
                x: this.gap * i,
                y: this.getY(),
            };
        }
    }

    getY() {
        const min = this.height * 0.3;
        const max = this.height - min;

        return Math.random() * (max - min) + min;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let dots = [];

        let cur = this.hills[0];
        let prev = cur;

        ctx.moveTo(cur.x, cur.y);

        cur.x += this.speed;

        let prevCx = cur.x;
        let prevCy = cur.y;

        if (-this.gap < cur.x) {
            this.hills.unshift({
                x: -this.gap * 2,
                y: this.getY(),
            });
        }

        if (this.hills[this.hills.length - 1].x > this.width + 2 * this.gap) {
            this.hills.pop();
        }

        for (let i = 1; i < this.hills.length; i++) {
            cur = this.hills[i];

            this.hills[i].x += this.speed;

            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;

            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.width, this.height);
        ctx.lineTo(this.hills[0].x, this.height);

        ctx.fill();
        ctx.closePath();

        return dots;
    }
}
