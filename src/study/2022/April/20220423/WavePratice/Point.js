export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fiexdY = y;
        this.speed = 0.05;
        this.current = index;
        this.max = this.random(100, 150);
    }

    update() {
        this.current += this.speed;

        this.y = this.fiexdY + Math.sin(this.current) * this.max;
    }

    random(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}
