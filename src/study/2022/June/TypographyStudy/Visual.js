import { Text } from './Text.js';
import { Particle } from './Particle.js';

const RANDOM_TEXT = 'ABCDEFGHIJKLOMOPRYWZ';

export class Visual {
    constructor() {
        this.text = RANDOM_TEXT.split('');

        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        };

        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.onMove.bind(this));
    }

    display(ctx, width, height) {
        const text = new Text(ctx);
        const str = this.text[Math.round(Math.random() * this.text.length - 1)];
        const pos = text.setText(str, 26, width, height);

        this.particles = [];

        for (let i = 0; i < pos.length; i++) {
            const item = new Particle(pos[i]);

            this.particles.push(item);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.particles.length; i++) {
            const item = this.particles[i];

            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = this.mouse.radius + item.radius;

            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const tx = item.x + Math.cos(angle) * minDist;
                const ty = item.y + Math.sin(angle) * minDist;

                const ax = tx - this.mouse.x;
                const ay = ty - this.mouse.y;

                item.vx += -1 * ax;
                item.vy += -1 * ay;

                item.crash();
            }

            item.draw(ctx);
        }
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}
