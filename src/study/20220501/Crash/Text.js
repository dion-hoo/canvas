import { createVector } from './vector.js';
import { resolveCollision } from './util.js';

export class Text {
    constructor(text, x, y, radius) {
        this.text = text;
        this.location = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.fontMass = 10;
        this.border = {
            top: 5,
        };
        this.radius = radius;
        this.elasticity = 0.9;
        this.friction = 0.008;

        this.fps = 60;
        this.fpsTime = 1000 / this.fps;
        this.angle = (0 * Math.PI) / 180;
        this.aVeloctiy = 0;
        this.aAcceleration = 0.1;
        this.direction = Math.random() * 3 - 1.5;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.location = createVector(this.location.x, this.location.y);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    collision(text) {
        for (let t of text) {
            if (t === this) continue;

            const dx = this.location.x - t.location.x;
            const dy = this.location.y - t.location.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius + t.radius) {
                const nomalize = {
                    x: dx / distance,
                    y: dy / distance,
                };

                const velocity = {
                    x: t.velocity.x - this.velocity.x,
                    y: t.velocity.y - this.velocity.y,
                };

                const dot = nomalize.x * velocity.x + nomalize.y * velocity.y;

                if (Math.floor(dot) < 0) {
                    return;
                }

                const impulse = (2 * dot) / (this.radius + t.radius);

                this.velocity.x += impulse * t.radius * nomalize.x;
                this.velocity.y += impulse * t.radius * nomalize.y;

                t.velocity.x -= impulse * this.radius * nomalize.x;
                t.velocity.y -= impulse * this.radius * nomalize.y;

                this.velocity.y *= t.elasticity;
                t.velocity.y *= this.elasticity;
            }
        }
    }

    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);

        this.velocity.x += -this.velocity.x * this.friction;
    }

    grab(mouse) {
        if (
            this.location.x - Math.floor(this.font.w / 2) < mouse.x &&
            mouse.x < this.location.x + Math.floor(this.font.w / 2) &&
            this.location.y - this.font.h / 2 < mouse.y &&
            mouse.y < this.location.y + this.font.h / 2
        ) {
            this.location.x = mouse.x;
            this.location.y = mouse.y;

            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    windowBounce() {
        if (this.location.x - this.radius < 0) {
            this.location.x = this.radius;
            this.velocity.x *= -this.elasticity;
        }

        if (this.location.x > this.width - this.radius) {
            this.location.x = this.width - this.radius;
            this.velocity.x *= -this.elasticity;
        }
        if (this.location.y - this.radius < 0) {
            this.velocity.y *= -this.elasticity;
        }
        if (this.location.y > this.height - this.radius) {
            this.location.y = this.height - this.radius;
            this.velocity.y *= -this.elasticity;

            this.aVeloctiy *= -this.elasticity;
        }
    }

    draw(ctx, t, mouse) {
        if (!this.time) {
            this.time = t;
        }

        const now = t - this.time;
        if (now > this.fpsTime) {
            this.time = t;

            this.aVeloctiy += this.aAcceleration * this.direction;
            this.angle += this.aVeloctiy;

            this.aAcceleration *= 0;
        }

        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);

        ctx.fillText(this.text, 0, 10);
        ctx.restore();
    }
}
