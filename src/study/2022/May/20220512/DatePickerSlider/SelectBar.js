import { RoundRect } from './RoundRect.js';

export class SelectBar {
    resize(width, height) {
        this.width = width;
        this.height = height;

        const w = 300;
        const h = 36;
        const x = this.width / 2 - w / 2;
        const y = this.height / 2 - h / 2;
        const padding = 0;
        const radius = 13;

        this.roundRect = new RoundRect(x, y, w, h, padding, radius);
    }

    draw(ctx) {
        this.roundRect.draw(ctx);
    }
}
