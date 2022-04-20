export class Branch {
    constructor(startX, startY, endX, endY, lineWidth) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.lineWidth = lineWidth;
        this.angle = 0;

        this.currentFrame = 0;
        this.frame = 3;

        this.gapX = (this.endX - this.startX) / this.frame;
        this.gapY = (this.endY - this.startY) / this.frame;

        this.currentX = this.startX;
        this.currentY = this.startY;
    }

    draw(ctx) {
        if (this.currentFrame !== this.frame) {
            this.currentX += this.gapX;
            this.currentY += this.gapY;

            this.currentFrame++;

            return false;
        }

        ctx.strokeStyle = '#444';

        if (this.lineWidth < 2) {
            ctx.lineWidth = this.lineWidth * 0.2;
        } else if (this.lineWidth < 4) {
            ctx.lineWidth = this.lineWidth * 0.4;
        } else if (this.lineWidth < 6) {
            ctx.lineWidth = this.lineWidth * 0.6;
        } else if (this.lineWidth < 8) {
            ctx.lineWidth = this.lineWidth * 0.8;
        } else {
            ctx.lineWidth = this.lineWidth;
        }

        ctx.beginPath();
        ctx.lineTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.stroke();
        ctx.closePath();

        return true;
    }
}
