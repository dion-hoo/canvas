export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixed = y;
        this.vy = 0.03;
        this.current = index;
        this.max = Math.random() * 50 + 10;
    }

    update() {
        this.current += this.vy;

        this.y = this.fixed + Math.sin(this.current) * this.max;
    }
}
