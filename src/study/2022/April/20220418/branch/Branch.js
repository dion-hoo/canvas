export class Branch {
    constructor(startX, startY, endX, endY, lineWidth, color) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.lineWidth = lineWidth;
        this.color = color;

        this.frame = 3;
        this.cntFrame = 0;

        this.gapX = (this.endX - this.startX) / this.frame;
        this.gapY = (this.endY - this.startY) / this.frame;

        this.currentX = this.startX;
        this.currentY = this.startY;
    }

    draw(ctx) {
        if (this.cntFrame !== this.frame) {
            this.currentX += this.gapX;
            this.currentY += this.gapY;

            this.cntFrame++;

            return false;
        }

        ctx.strokeStyle = '#444';
        ctx.lineWidth = this.lineWidth;

        if (this.lineWidth < 3) {
            ctx.lineWidth = this.lineWidth * 0.3;
        } else if (this.lineWidth < 6) {
            ctx.lineWidth = this.lineWidth * 0.6;
        } else if (this.lineWidth < 9) {
            ctx.lineWidth = this.lineWidth * 0.9;
        } else {
            ctx.lineWidth = this.lineWidth;
        }

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.stroke();
        ctx.closePath();

        return true;
    }

    degreeToRadian(degree) {
        return degree * (Math.PI / 180);
    }
}
