export class Polygon {
    constructor(width, height, sides, radius) {
        this.width = width;
        this.height = height;
        this.sides = sides;
        this.radius = radius;
        this.rotate = 0;
        this.aVelocity = 0.008;
        this.hsl = 255;
        this.size = 10;
        this.color = [
            'red',
            'blue',
            'green',
            'orange',
            'yellow',
            'deeppink',
            '#1c9',
            '#19c',
            '#000',
            '#fff',
            '#123124',
            'f2f3da',
            '#f3ad81',
        ];
    }
    draw(ctx, mouse) {
        let degrees = Math.PI * 2;
        let angle = degrees / this.sides;
        let angle2 = degrees / 4;

        ctx.save();

        ctx.translate(this.width, this.height);

        this.rotate += mouse.moveX * 0.004;
        mouse.moveX *= 0.98;

        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            let x = Math.cos(angle * i) * this.radius;
            let y = Math.sin(angle * i) * this.radius;

            ctx.save();
            ctx.fillStyle = this.color[i];
            ctx.translate(x, y);
            ctx.rotate((((360 / this.sides) * i + 45) * Math.PI) / 180);
            ctx.beginPath();
            for (let j = 0; j < 4; j++) {
                const x2 = Math.cos(j * angle2) * 160;
                const y2 = Math.sin(j * angle2) * 160;

                j === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        ctx.restore();
    }
}
