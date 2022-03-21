export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  div(v) {
    this.x /= v;
    this.y /= v;

    return { x: this.x, y: this.y };
  }
  mult(v) {
    this.x *= v;
    this.y *= v;

    return { x: this.x, y: this.y };
  }
}
