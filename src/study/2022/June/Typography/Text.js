export class Text {
    constructor(ctx) {
        this.ctx = ctx;
    }
    setText(string, density, width, height) {
        this.width = width;
        this.height = height;

        const myText = string;
        const fontWeight = 700;
        const fontSize = 800;
        const fontName = 'Hind';

        this.ctx.font = `${fontWeight} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.textBaseline = 'middle';

        const fontPos = this.ctx.measureText(myText);

        this.ctx.fillText(
            myText,
            (this.width - fontPos.width) / 2,
            fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent + (this.height - fontSize) / 2
        );

        return this.dotPos(density, width, height);
    }

    dotPos(density, width, height) {
        const imageData = this.ctx.getImageData(0, 0, width, height).data;
        const particles = [];
        const length = imageData.length / 4;

        for (let h = 0; h < height; h += density) {
            for (let w = 0; w < width; w += density) {
                let pixel = imageData[h * 4 * width + w * 4 + 3]; // aplha값을 가지고 오는것이다.

                if (pixel !== 0 && w > 0 && w < width && h > 0 && h < height) {
                    particles.push({
                        x: w,
                        y: h,
                    });
                }
            }
        }

        return particles;
    }
}
