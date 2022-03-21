import { Vector } from './Vector.js';

export class Player {
    constructor(width, height, image, imageCanvasWidth, imageCanvasHeight) {
        this.speed = 5;
        this.position = new Vector(100, 0);
        this.velocity = new Vector(0, 0);
        this.acceleartion = new Vector(0, 0);
        this.width = width;
        this.height = height;
        this.mass = 3;

        this.imageCanvasWidth = imageCanvasWidth;
        this.imageCanvasHeight = imageCanvasHeight;

        this.frames = 0;

        this.currentImage = image;
        this.cropWidth = 177;
    }

    applyForce(force) {
        const f = force.div(this.mass);

        this.acceleartion.add(f);
    }

    update() {
        this.frames++;
        if (this.frames > 28) {
            this.frames = 0;
        }

        this.position.add(this.velocity);

        if (this.position.y + this.imageCanvasHeight + this.velocity.y <= this.height) {
            this.velocity.add(this.acceleartion);
        }

        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -0.1;
        }

        this.acceleartion.mult(0);
    }

    draw(ctx) {
        ctx.save();

        ctx.drawImage(
            this.currentImage,
            this.cropWidth * this.frames,
            0,
            this.cropWidth,
            400,
            this.position.x,
            this.position.y,
            this.imageCanvasWidth,
            this.imageCanvasHeight
        );
        ctx.fill();

        ctx.restore();
    }
}
