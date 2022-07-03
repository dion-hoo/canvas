import { Vector } from './Vector.js';

export class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = 0;
        this.vy = 0;
        this.accVx = 0;
        this.accVy = 0;
        this.acceleration = 0.3;
        this.friction = 0.1;
        this.player = false;
    }

    update({ LEFT, UP, RIGHT, DOWN }) {
        if (LEFT) {
            this.accVx = -this.acceleration;
        }
        if (UP) {
            this.accVy = -this.acceleration;
        }
        if (RIGHT) {
            this.accVx = this.acceleration;
        }
        if (DOWN) {
            this.accVy = this.acceleration;
        }

        if (!UP && !DOWN) {
            this.accVy = 0;
        }

        if (!LEFT && !RIGHT) {
            this.accVx = 0;
        }

        this.vx += this.accVx;
        this.vy += this.accVy;

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 1 - this.friction;
        this.vy *= 1 - this.friction;
    }

    display(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.accVx * 200, this.y + this.accVy * 200);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vx * 40, this.y + this.vy * 40);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
