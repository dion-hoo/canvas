import { Text } from './Text.js';

export class TextGroup {
    constructor(totalGroup, totalText) {
        this.totalGroup = totalGroup;
        this.totalText = totalText;
        this.translate = 0;
        this.letter = [];

        for (let i = 0; i < this.totalGroup; i++) {
            this.letter.push([]);
        }
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.size = 30;

        this.gapX = this.width / (this.totalGroup + 1);
        this.gapY = this.height / 2;

        for (let i = 0; i < this.totalGroup; i++) {
            for (let j = 0; j < this.totalText; j++) {
                this.letter[i][j] = new Text(this.gapX * (i + 1), this.gapY + j * (this.size + 10), this.size);
            }
        }
    }

    draw(ctx, mouse) {
        ctx.save();

        this.translate += mouse.y * 0.9;
        mouse.y *= 0.99;
        ctx.translate(0, this.translate);

        for (let i = 0; i < this.totalGroup; i++) {
            for (let j = 0; j < this.totalText; j++) {
                this.letter[i][j].draw(ctx);
            }
        }

        ctx.restore();
    }
}
