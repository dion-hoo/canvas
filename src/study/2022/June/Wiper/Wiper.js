export class Wiper {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.moveX = 0;
        this.moveY = 0;

        this.angle = Math.PI / 2;
        this.aVelocity = 0.01;
        this.r = 0;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.x = this.width / 2;
        this.y = this.height;

        this.r = this.height * 0.95;
    }

    update() {
        // this.angle += this.aVelocity;

        if (this.radianTodegree(this.angle) <= 0 || this.radianTodegree(this.angle) >= 190) {
            this.aVelocity *= -1;
        }

        this.x = this.width / 2 + Math.cos(this.angle);
        this.y = this.height + Math.sin(this.angle);

        this.moveX = this.x - Math.cos(this.angle) * this.r;
        this.moveY = this.y - Math.sin(this.angle) * this.r;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.lineWidth = 5;
        ctx.moveTo(this.x - 12, this.y);
        ctx.lineTo(this.x + 12, this.y);
        ctx.lineTo(this.moveX + 4, this.moveY);
        ctx.lineTo(this.moveX - 4, this.moveY);
        ctx.fill();
        ctx.closePath();
    }

    radianTodegree(angle) {
        return (angle * 180) / Math.PI;
    }
}
