export class WaterGun {
    constructor(x, y, imageWidth, imageHeight) {
        this.x = x;
        this.y = y;
        this.text = null;
        this.image = new Image();
        this.isLoad = false;
        this.image.src = './water-gun.png';

        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;

        this.loaded();
    }

    loaded() {
        this.image.onload = () => {
            this.isLoad = true;
        };
    }

    rotation(rotate) {
        this.rotate = rotate;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.rotate(this.rotate);

        if (this.isLoad) {
            ctx.drawImage(this.image, -this.imageWidth / 2, -this.imageHeight / 2, this.imageWidth, this.imageHeight);
        }

        // 중심점
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        ctx.restore();
    }
}
