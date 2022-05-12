import { RoundRect } from './RoundRect.js';

export class SelectBar {
    resize(width, height) {
        this.width = width;
        this.height = height;

        const h = 30;
        const x = 0;
        const y = this.height / 2 - h / 2;
        const w = innerWidth;
        const padding = 30;
        const radius = 8;

        this.roundRect = new RoundRect(x, y, w, h, padding, radius);
    }

    draw(ctx) {
        this.roundRect.draw(ctx);
    }
}
