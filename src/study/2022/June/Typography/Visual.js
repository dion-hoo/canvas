import { Text } from './Text.js';
import { Particle } from './Particle.js';

export const RANDOM_TEXT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Visual {
    constructor() {
        this.textArr = RANDOM_TEXT.split('');

        this.particels = [];
        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        };

        this.init();
    }

    init() {
        document.addEventListener('touchmove', this.onMove.bind(this));
        document.addEventListener('mousemove', this.onMove.bind(this));
    }

    show(ctx, width, height) {
        this.text = new Text(ctx);
        const str = this.textArr[Math.round(Math.random() * (this.textArr.length - 1))];

        this.pos = this.text.setText(str, 26, width, height);
        this.particels = [];

        for (let i = 0; i < this.pos.length; i++) {
            const item = new Particle(this.pos[i]);
            this.particels.push(item);
        }
    }

    animate(ctx, t) {
        for (let i = 0; i < this.particels.length; i++) {
            const item = this.particels[i];

            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = this.mouse.radius + item.radius;

            if (dist < minDist) {
                const anlge = Math.atan2(dy, dx);
                const tx = item.x + Math.cos(anlge) * minDist;
                const ty = item.y + Math.sin(anlge) * minDist;

                const ax = tx - this.mouse.x;
                const ay = ty - this.mouse.y;

                item.vx += -1 * ax;
                item.vy += -1 * ay;

                item.collide();
            }

            item.draw(ctx, t);
        }
    }

    onMove(e) {
        const eventX = e.clientX;
        const eventY = e.clientY;

        this.mouse.x = eventX;
        this.mouse.y = eventY;
    }
}
