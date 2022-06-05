export class Text {
    constructor(ctx) {
        this.ctx = ctx;
    }

    setText(str, density, width, height) {
        this.width = width;
        this.height = height;

        const fontWeight = 700;
        const fontSize = 800;
        const fontName = 'Hind';

        this.ctx.font = `${fontWeight} ${fontSize}px ${fontName}`;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

        // 이 순서가 중요하다!! baseline을 middle로 가지고 온 다음에 측정(measureText)을 해야 한다.
        const font = this.ctx.measureText(str);

        this.ctx.fillText(
            str,
            (this.width - font.width) / 2,
            font.actualBoundingBoxAscent + font.actualBoundingBoxDescent + (this.height - fontSize) / 2
        );

        return this.dotPos(density, width, height);
    }

    dotPos(density, width, height) {
        const imageDate = this.ctx.getImageData(0, 0, width, height).data;

        let particle = [];

        for (let h = 0; h < height; h += density) {
            for (let w = 0; w < width; w += density) {
                let alpha = imageDate[h * 4 * width + w * 4 + 3]; // alpah값을 가지고 온다.

                if (alpha !== 0) {
                    particle.push({
                        x: w,
                        y: h,
                    });
                }
            }
        }

        return particle;
    }
}
