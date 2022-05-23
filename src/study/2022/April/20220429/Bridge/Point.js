export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixed = y;
        this.cur = index;
        this.speed = 0.05;
        this.max = Math.random() * 10 + 10;
    }

    update() {
        this.cur += this.speed;

        this.y = this.fixed + Math.sin(this.cur) * this.max;
    }
}
