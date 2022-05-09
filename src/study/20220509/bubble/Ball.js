export class Bubble {
    constructor(angle, x, y) {
        this.x = x;
        this.y = y;
        this.radius = 50;
        this.mass = this.radius;
        this.speed = 10;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.gravity = 0.05;
        this.elasticity = 0.9;
        this.friction = 0.008;

        this.image = new Image();
        this.image.src = './bubble.png';
        this.isLoad = false;

        this.loaded();
    }

    loaded() {
        this.image.onload = () => {
            this.isLoad = true;
        };
    }

    update() {
        if (this.y + this.gravity < innerHeight) {
            this.vy += this.gravity;
        }

        this.vx -= this.vx * this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    bounce() {
        if (this.x - this.radius / 2 < 0) {
            this.x = this.radius / 2;
            this.vx *= -1;

            this.vy *= this.elasticity;
        }

        if (this.x + this.radius / 2 > innerWidth) {
            this.x = innerWidth - this.radius / 2;
            this.vx *= -1;

            this.vy *= this.elasticity;
        }

        if (this.y - this.radius / 2 < 0) {
            this.y = this.radius / 2;
            this.vy *= -1;

            this.vy *= this.elasticity;
        }

        if (this.y + this.radius / 2 > innerHeight) {
            this.y = innerHeight - this.radius / 2;
            this.vy *= -1;

            this.vy *= this.elasticity;
        }
    }

    draw(ctx) {
        if (this.isLoad) {
            ctx.drawImage(this.image, this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius);
        }
    }
}
