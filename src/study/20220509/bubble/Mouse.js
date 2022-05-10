import { Text } from './Text.js';

export class Mouse {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, mouse) {
        this.text = new Text(mouse.x, mouse.y, 15);

        if (mouse.isDown) {
            ctx.save();
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.restore();

            // ctx.save();
            // ctx.strokeStyle = '#fff';
            // ctx.beginPath();
            // ctx.moveTo(this.x, this.y);
            // ctx.lineTo(mouse.x, mouse.y);
            // ctx.stroke();
            // ctx.restore();

            // this.text.draw(ctx, mouse.x, 15, 0);
            // this.text.draw(ctx, mouse.y, 0, 19);
        }
    }
}
