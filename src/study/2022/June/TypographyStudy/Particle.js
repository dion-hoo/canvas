const FRICTION = 0.8;
const COLOR_SPEED = 0.12;

export class Particle {
    constructor(pos) {
        this.x = pos.x;
        this.y = pos.y;

        this.vx = 0;
        this.vy = 0;

        this.radius = 10;

        this.saveRgb = 0x000000;
        this.rgb = 0x000000;
    }

    crash() {
        this.rgb = 0xf3316e;
    }

    draw(ctx) {
        // move
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;

        // color
        this.rgb = this.rgb + (this.rgb - this.saveRgb) * COLOR_SPEED;

        const red = ((this.rgb >> 16) & 0xff) | 0;
        const green = ((this.rgb >> 8) & 0xff) | 0;
        const blue = (this.rgb & 0xff) | 0;
        const color = `rgb(${red} ${green} ${blue})`;

        ctx.beginPath();
        ctx.fillStyle = color;

        // font
        const str = 'D';
        const fontWeight = 700;
        const fontSize = 15;
        const fontName = 'Hind';

        ctx.font = `${fontWeight} ${fontSize}px ${fontName}`;
        ctx.textBaseline = 'middle';

        const font = ctx.measureText(str);

        ctx.fillText(str, this.x - font.width / 2, this.y);
    }
}
