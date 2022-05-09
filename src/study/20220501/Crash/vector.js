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
}

export const createVector = (x, y) => {
    return new Vector(x, y);
};
