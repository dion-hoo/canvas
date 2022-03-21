const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ratio = window.devicePixelRatio;

canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;

canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

ctx.scale(ratio, ratio);

class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(point) {
    this.x += point.x;
    this.y += point.y;

    return this;
  }

  subtract(point) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
  }

  reduce(value) {
    this.x *= value;
    this.y *= value;

    return this;
  }

  collide(point, width, height) {
    if (
      this.x >= point.x &&
      this.x <= point.x + width &&
      this.y >= point.y &&
      this.y <= point.y + height
    ) {
      return true;
    } else {
      return false;
    }
  }

  clone() {
    return new Point(this.x, this.y);
  }
}

class Dialog {
  constructor() {
    this.pos = new Point();
    this.target = new Point();
  }
}

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const SPEED_REDUCE = 0.8;
const MAX_ANGLE = 30;
const FPS = 1000 / 60;
const WIDTH = 260;
const HEIGHT = 260;
const mousePos = new Point();
let currentItem = null;

const onDown = (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
};

const onMove = (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
};

const onUp = (e) => {};

document.addEventListener("pointerdown", onDown);
document.addEventListener("pointermove", onMove);
document.addEventListener("pointerup", onUp);
