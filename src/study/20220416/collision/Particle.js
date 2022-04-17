import { getDistance } from './utils.js';

export class Particle {
    constructor(x, y, radius, image) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.radius = radius;
        this.mass = Math.random() * 0.05 + 0.25;
        this.image = image;
        this.e = 1; // 탄성계수
    }

    collision(particle) {
        for (let i = 0; i < particle.length; i++) {
            if (this === particle[i]) continue;

            if (getDistance(this.x, this.y, particle[i].x, particle[i].y) - this.radius * 2 < 0) {
                console.log('충돌');
            }
        }
    }

    update() {
        this.vy += this.mass;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
            this.vx *= -0.7;
        }

        if (this.y + this.radius > innerHeight) {
            this.y = innerHeight - this.radius;
            this.vy *= -0.8;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.closePath();
        ctx.restore();
    }
}
