export class Canoon {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = './cannon.png';
        this.isLoad = false;
        this.angle = 0;

        this.imageWidth = 130;
        this.imageHeight = 107;

        this.loaded();
    }

    loaded() {
        this.image.onload = () => {
            this.isLoad = true;
        };
    }

    cannonRotate(mouse) {
        this.angle = Math.atan((mouse.y - this.y) / (mouse.x - this.x));

        return this.angle;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.isLoad) {
            ctx.drawImage(this.image, -60, -this.imageHeight, this.imageWidth, this.imageHeight);
        }

        ctx.restore();
    }
}
