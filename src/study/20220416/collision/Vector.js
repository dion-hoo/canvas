export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        if (!isNaN(vector)) {
            this.x += vector;
            this.y += vector;
        } else {
            this.x += vector.x;
            this.y += vector.y;
        }
    }

    sub(vector) {
        if (!isNaN(vector)) {
            this.x -= vector;
            this.y -= vector;
        } else {
            this.x -= vector.x;
            this.y -= vector.y;
        }
    }

    mult(vector) {
        if (!isNaN(vector)) {
            this.x *= vector;
            this.y *= vector;
        } else {
            this.x *= vector.x;
            this.y *= vector.y;
        }
    }

    div(vector) {
        if (!isNaN(vector)) {
            this.x /= vector;
            this.y /= vector;
        } else {
            this.x /= vector.x;
            this.y /= vector.y;
        }

        return {
            x: this.x,
            y: this.y,
        };
    }
}
