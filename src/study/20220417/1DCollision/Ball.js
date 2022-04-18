import { Vector } from './Vector.js';

export class Ball {
    constructor(x, y, color) {
        this.location = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.accleration = new Vector(0, 0);

        this.radius = Math.random() * 5 + 30;
        this.mass = this.radius;
        this.color = color;
    }

    applyForce(force) {
        const f = force.copy();

        f.div(this.mass);

        this.accleration.add(f);
    }

    collision(ball) {
        const px = Math.pow(ball.location.x - this.location.x, 2);
        const py = Math.pow(ball.location.y - this.location.y, 2);
        const pz = Math.sqrt(px + py);
        const m1 = this.mass;
        const m2 = ball.mass;

        if (pz - this.radius * 2 < 0) {
            this.velocity.x = (m1 - m2) / (m1 + m2) + (2 * m2) / (m1 + m2);
        }
    }

    update() {
        this.velocity.add(this.accleration);
        this.location.add(this.velocity);
        this.accleration.mult(0);

        if (this.location.x - this.radius < 0 || this.location.x > innerWidth - this.radius) {
            this.velocity.x *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
