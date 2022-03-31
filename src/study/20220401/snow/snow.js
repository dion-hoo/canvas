export class SnowFlower {
    constructor(width, height) {
        this.x = width / 2;
        this.y = -(Math.random() * 50); // -50 ~ 0
        this.width = width;
        this.height = height;
        this.radius = Math.random() * 1; // 2 ~ 5
        this.r = Math.sqrt(Math.random() * Math.pow(width / 2, 2));
        this.angle = Math.random() * (Math.PI * 2);
    }

    update(time) {
        let w = 0.001;
        let angle = w * time + this.angle;

        this.x = this.width / 2 + Math.sin(angle) * this.r;
        this.y += Math.pow(this.radius, 2);
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
