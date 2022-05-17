import { Text } from './Text.js';

export class TextGroup {
    constructor(totalText, currentText = 1) {
        this.totalText = totalText;
        this.currentText = currentText;
        this.translate = 0;
        this.overDistance = 0;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.size = 28;
        this.gap = 8;
        this.item = this.size + this.gap;

        this.start = 0;
        this.middle = 0;
        this.end = 0;

        this.letter = [];

        this.gapX = this.width / 2 - this.size / 2;
        this.gapY = this.height / 2 - this.size / 2;
        this.reTranslate = (this.currentText - 1) * this.item;

        for (let i = 0; i < this.totalText; i++) {
            let y = this.gapY + i * this.item - this.reTranslate;

            if (i === 0) {
                this.start = y;
            }
            if (i === this.currentText) {
                this.middle = y;
            }
            if (i === this.totalText - 1) {
                this.end = y;
            }

            this.letter.push(new Text(this.gapX, y, this.size));
        }
    }

    draw(ctx, mouse) {
        ctx.save();

        const isEnd = 0;

        // 마우스 누르고 있을때
        if (mouse.isDown) {
            if (this.translate < this.middle - this.start) {
                // console.log('첫 끝');
            }
            this.translate += mouse.moveY;
            mouse.moveY = 0;
        } else {
            // 마우스 땠을때
            if (isEnd < 0) {
                // 끝이 아닌지 판단

                // 위로 스크롤
                this.translate -= this.overDistance * 0.08;

                if (this.translate < this.end) {
                    this.translate = this.end;
                }

                // 아래로 스크롤
            } else {
                this.translate += mouse.decreaseY * 0.94;
                mouse.decreaseY *= 0.99;
            }
        }

        ctx.translate(0, this.translate);

        for (let i = 0; i < this.totalText; i++) {
            this.letter[i].draw(ctx);
        }

        ctx.restore();
    }
}
