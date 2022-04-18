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

        return {
            x: this.x,
            y: this.y,
        };
    }

    sub(vector) {
        if (!isNaN(vector)) {
            this.x -= vector;
            this.y -= vector;
        } else {
            this.x -= vector.x;
            this.y -= vector.y;
        }
        return {
            x: this.x,
            y: this.y,
        };
    }

    mult(vector) {
        if (!isNaN(vector)) {
            this.x *= vector;
            this.y *= vector;
        } else {
            this.x *= vector.x;
            this.y *= vector.y;
        }

        return {
            x: this.x,
            y: this.y,
        };
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

    copy() {
        return new Vector(this.x, this.y);
    }
}
