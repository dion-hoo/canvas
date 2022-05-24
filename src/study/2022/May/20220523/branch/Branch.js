export class Branch {
    constructor(startX, startY, endX, endY, lineWidth) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.lineWidth = lineWidth;

        this.currentX = this.startX;
        this.currentY = this.startY;

        this.result = false;

        this.currentFrame = 0;
        this.frame = 8;
        this.offsetX = (this.endX - this.startX) / this.frame;
        this.offsetY = (this.endY - this.startY) / this.frame;
    }

    draw(ctx) {
        if (this.currentFrame !== this.frame) {
            this.currentX += this.offsetX;
            this.currentY += this.offsetY;

            this.currentFrame++;

            this.result = false;
        } else {
            this.result = true;
        }

        ctx.save();

        if (this.lineWidth < 1) {
            ctx.lineWidth = ctx.lineWidth * 0.1;
        } else if (this.lineWidth < 2) {
            ctx.lineWidth = ctx.lineWidth * 0.5;
        } else if (this.lineWidth < 4) {
            ctx.lineWidth = ctx.lineWidth * 2;
        } else if (this.lineWidth < 6) {
            ctx.lineWidth = ctx.lineWidth * 4;
        } else if (this.lineWidth < 8) {
            ctx.lineWidth = ctx.lineWidth * 6;
        } else {
            ctx.lineWidth = this.lineWidth;
        }

        ctx.strokeStyle = '#444';
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }
}
