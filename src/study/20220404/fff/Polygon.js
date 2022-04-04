export class Polygon {
    constructor(x, y, sides, radius) {
        this.x = x;
        this.y = y;
        this.sides = sides;
        this.radius = radius;
        this.rotate = 0;
        this.radius2 = 200;
    }

    draw(ctx, mouse, colorSet) {
        ctx.save();

        const angle = (Math.PI * 2) / this.sides;
        const angle2 = (Math.PI * 2) / 4;

        this.rotate += mouse.moveX * 0.009;
        mouse.moveX *= 0.97;

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            let x = Math.cos(i * angle) * this.radius;
            let y = Math.sin(i * angle) * this.radius;

            ctx.save();

            ctx.fillStyle = `hsl(${colorSet[i]}, 70%, 50%)`;
            ctx.translate(x, y);
            const theta = ((360 / this.sides) * i + 45) * (Math.PI / 180); // 호도법으로 바꾸기
            ctx.rotate(theta);

            ctx.beginPath();
            for (let j = 0; j < 4; j++) {
                let px = Math.cos(j * angle2) * this.radius2;
                let py = Math.sin(j * angle2) * this.radius2;

                j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }

            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        ctx.restore();
    }
}
