export class Snow {
    constructor(width, height) {
        this.radius = Math.random() * 1;
        this.x = 0;
        this.y = Math.random() * -50 + 0;
        this.width = width;
        this.height = height;
        this.range = Math.sqrt(Math.random() * Math.pow(width / 2, 2));
        this.angle = Math.random() * (Math.PI * 2);
        this.end = false;
    }

    update(time) {
        const angle = 0.1 * time + this.angle;

        this.x = this.width / 2 + Math.sin(angle) * this.range;
        this.y += Math.pow(this.radius, 0.5);

        if (this.y > this.height) {
            this.end = true;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
