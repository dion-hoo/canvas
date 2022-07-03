export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // 피타고라스 정리를 이용해서 시작 위치와 끝 위치 거리 구하기
    mag() {
        return Math.sqrt(this.x ** 2, this.y ** 2);
    }

    // 정규화 크기가 1인 벡터 구하기
    unit() {
        if (this.mag() !== 0) {
            return new Vector(this.x / this.mag(), this.y / this.mag());
        }
    }

    // 원래 벡터와 수직인 단위벡터(법선)
    normal() {
        return new Vector(-this.y, this.x).unit();
    }
}
