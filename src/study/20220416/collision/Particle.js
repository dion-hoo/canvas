import { getDistance } from './utils.js';
import { Vector } from './Vector.js';

export class Particle {
    constructor(x, y, radius, image) {
        this.location = new Vector(x, y);
        this.veclocity = new Vector(0, 0);
        this.accleration = new Vector(0, 0);

        this.radius = radius;
        this.mass = Math.random() * 0.05 + 0.25;
        this.image = image;
    }

    applyForce(force) {
        const f = force.get();

        console.log(f);

        // this.accleration.add(force);
    }

    collision(particle) {
        for (let i = 0; i < particle.length; i++) {
            if (this === particle[i]) continue;

            if (getDistance(this.x, this.y, particle[i].x, particle[i].y) - this.radius * 2 < 0) {
                this.vx *= -0.8;
                this.vy *= -0.99;
            }
        }
    }

    update() {
        this.veclocity.add(this.accleration);
        this.location.add(this.veclocity);
        this.accleration.mult(0);
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
