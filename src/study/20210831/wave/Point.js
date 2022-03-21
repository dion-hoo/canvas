export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.05;
        this.cur = index;
        this.max = Math.random() * 100 + 150;
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * this.max; // 아래 위로 움직인다.
    }
}
