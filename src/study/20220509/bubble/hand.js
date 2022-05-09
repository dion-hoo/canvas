export class Hand {
    constructor(x, y, imageWidth, imageHeight) {
        this.x = x;
        this.y = y;

        this.image = new Image();
        this.isLoad = false;
        this.image.src = './hand.png';

        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;

        this.loaded();
    }

    loaded() {
        this.image.onload = () => {
            this.isLoad = true;
        };
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - 24, this.y + 10);

        ctx.rotate(this.rotate);

        if (this.isLoad) {
            ctx.drawImage(this.image, -this.imageWidth / 2 + 23, -this.imageHeight / 2 - 11, this.imageWidth, this.imageHeight);
        }

        ctx.restore();
    }
}
