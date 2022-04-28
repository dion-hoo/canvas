import { Sheep } from './Sheep.js';

export class SheepController {
    constructor() {
        this.items = [];
        this.cur = 0;
    }

    resize(width, height, image) {
        this.width = width;
        this.height = height;
        this.image = image;

        this.addSheep();
    }

    addSheep() {
        this.items.push(new Sheep(this.image, this.width));
    }

    draw(ctx, t, dots) {
        this.cur++;

        if (this.cur > 200) {
            this.cur = 0;
            this.addSheep();
        }

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];

            if (item.x < -item.width) {
                this.items.splice(i, 1);
                this.addSheep();
            }

            item.draw(ctx, t, dots);
        }
    }
}
