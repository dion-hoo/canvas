import { createVector } from './vector.js';
import { resolveCollision } from './util.js';

export class Text {
    constructor(ctx) {
        this.ctx = ctx;
        this.location = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.fontMass = 10;
        this.border = {
            top: 5,
        };

        this.fps = 60;
        this.fpsTime = 1000 / this.fps;
        this.angle = (0 * Math.PI) / 180;
        this.aVeloctiy = 0;
        this.aAcceleration = 0.1;
        this.direction = Math.random() * 2 - 1;
    }

    setText(text) {
        const fontSize = 60;
        const fontName = 'Hind';

        this.text = text;

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${fontSize}px ${fontName}`;

        const measureText = this.ctx.measureText(this.text);
        this.font = {
            w: measureText.width,
            h: measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent,
        };
    }

    resize(index, width, height, text) {
        this.width = width;
        this.height = height;

        const { w, h } = this.font;

        let x = Math.floor(Math.random() * (this.width - w) + w / 2);
        let y = Math.floor(Math.random() * (this.height * 0.5 - h) + h / 2 + this.border.top);

        if (index !== 0) {
            for (let i = 0; i < index; i++) {
                const t = text[i];

                const px = Math.abs(t.location.x - x);
                const py = Math.abs(t.location.y - y);
                const pz = Math.floor(Math.sqrt(px * px + py * py));
                const distance = Math.floor(this.font.w / 2 + t.font.w / 2);

                if (pz - distance <= 0) {
                    x = Math.floor(Math.random() * (this.width - w) + w / 2);
                    y = Math.floor(Math.random() * (this.height * 0.5 - h) + h / 2 + this.border.top);

                    i = -1;
                }
            }
        }

        this.location = createVector(x, y);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    collision(text) {
        for (let t of text) {
            if (t === this) continue;

            const x = Math.abs(this.location.x - t.location.x);
            const y = Math.abs(this.location.y - t.location.y);
            const distance = Math.sqrt(x * x + y * y);

            // 1차원으로 만들어서 1차원 탄성 충돌
            if (distance < this.font.w) {
                resolveCollision(this, t);
            }
        }
    }

    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
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
        const { w, h } = this.font;
        if (this.location.x - w / 2 < 0) {
            this.location.x = w / 2;
            this.velocity.x *= -0.8;
        }

        if (this.location.x > this.width - w / 2) {
            this.location.x = this.width - w / 2;
            this.velocity.x *= -0.8;
        }

        // h / 2 + this.border.top
        if (this.location.y > this.height - h / 2 + this.border.top) {
            this.location.y = this.height - h / 2 + this.border.top;
            this.velocity.y = 0;

            this.aVeloctiy *= -0.6 * this.direction;
        }
    }

    draw(t, mouse) {
        if (!this.time) {
            this.time = t;
        }

        const now = t - this.time;

        if (now > this.fpsTime && mouse.isDown) {
            this.time = t;

            // this.aVeloctiy += this.aAcceleration * this.direction;
            // this.angle += this.aVeloctiy;

            // this.aAcceleration *= 0;
        }

        this.ctx.save();
        this.ctx.translate(this.location.x, this.location.y);
        this.ctx.rotate(this.angle);
        this.ctx.fillText(this.text, 0, 0);

        this.ctx.restore();
    }
}
