export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.09;
        this.cur = index;
        this.max = Math.random() * 50 + 50;
    }

    update() {
        this.cur += this.speed;

        this.y = this.fixedY + Math.sin(this.cur) * this.max;
    }
}
