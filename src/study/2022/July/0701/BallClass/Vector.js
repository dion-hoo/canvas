export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    mult(n) {
        return new Vector(this.x * n, this.y * n);
    }

    // 피타고라스 정리를 이용해서 시작 위치와 끝 위치 거리 구하기(스칼라)
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // 정규화 크기가 1인 벡터 구하기
    unit() {
        if (this.mag() === 0) {
            return new Vector(0, 0);
        } else {
            return new Vector(this.x / this.mag(), this.y / this.mag());
        }
    }

    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    // 원래 벡터와 수직인 단위벡터(법선)
    normal() {
        return new Vector(-this.y, this.x).unit();
    }

    drawVec(ctx, startX, startY, n, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + this.x * n, startY + this.y * n);
        ctx.stroke();
    }
}
