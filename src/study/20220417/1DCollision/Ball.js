import { Vector } from './Vector.js';

export class Ball {
    constructor(x, y, color) {
        this.location = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.accleration = new Vector(0, 0);

        this.radius = 30;
        this.mass = 30;
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

        // 충동했을 경우
        if (pz - this.radius * 2 < 0) {
            const v1 = ((m1 - m2) / (m1 + m2)) * this.velocity.x + ((2 * m2) / (m1 + m2)) * ball.velocity.x;
            const v2 = ((2 * m1) / (m1 + m2)) * this.velocity.x + ((m2 - m1) / (m1 + m2)) * ball.velocity.x;

            this.velocity.x = v1;
            ball.velocity.x = v2;
        }
    }

    update() {
        this.velocity.add(this.accleration);
        this.location.add(this.velocity);
        this.accleration.mult(0);

        if (this.location.x - this.radius < 0 || this.location.x > innerWidth - this.radius) {
            this.velocity.x *= -0.9;
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
