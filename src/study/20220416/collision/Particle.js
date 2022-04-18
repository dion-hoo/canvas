import { getDistance, resolveCollision } from './utils.js';
import { Vector } from './Vector.js';

export class Particle {
    constructor(x, y, radius, image) {
        this.location = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.accleration = new Vector(0, 0);

        this.radius = radius;
        this.mass = Math.random() * 0.05 + 0.25;
        this.image = image;
    }

    applyForce(force) {
        const f = force.copy();

        f.div(this.mass);
        this.accleration.add(f);
    }

    collision(particle) {
        for (let i = 0; i < particle.length; i++) {
            if (this === particle[i]) continue;

            if (getDistance(this.location.x, this.location.y, particle[i].location.x, particle[i].location.y) - this.radius * 2 < 0) {
                resolveCollision(this, particle[i]);
            }
        }
    }

    update() {
        this.velocity.add(this.accleration);
        this.location.add(this.velocity);
        this.accleration.mult(0);

        if (this.location.x - this.radius < 0 || this.location.x > innerWidth - this.radius) {
            this.velocity.x *= -1;
        }

        if (this.location.y > innerHeight - this.radius) {
            this.location.y = innerHeight - this.radius;
            this.velocity.y *= -0.8;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(this.image, this.location.x - this.radius, this.location.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.closePath();
        ctx.restore();
    }
}
