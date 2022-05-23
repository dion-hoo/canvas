const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ratio = window.devicePixelRatio;

let ball = null;
let box = null;

const resize = () => {
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);
};

window.addEventListener("resize", resize);
resize();

class Ball {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.vx = speed;
    this.vy = speed;
    this.radius = radius;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.radius <= 0 || this.x >= canvas.width - this.radius) {
      this.vx *= -1;
    }

    if (this.y - this.radius <= 0 || this.y >= canvas.height - this.radius) {
      this.vy *= -1;
    }
  }

  impulsion(boxX, boxY, boxWidth, boxHeight) {
    const minX = boxX - this.radius;
    const maxX = boxX + boxWidth + this.radius;
    const minY = boxY - this.radius;
    const maxY = boxY + boxHeight + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);

      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min1 === min) {
        this.vx *= -1;
        this.x += this.vx;
      }

      if (min2 === min) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

class Box {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "#6eb37d";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }
}

const init = () => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = canvas.width * 0.02;

  const width = 300;
  const height = 150;
  const boxX = canvas.width / 2 - width / 2;
  const boxY = canvas.height / 2 - height / 2;

  ball = new Ball(x, y, radius, 15);
  box = new Box(boxX, boxY, width, height);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.update();
  ball.impulsion(box.x, box.y, box.width, box.height);
  ball.draw();

  box.draw();

  requestAnimationFrame(animate);
};

init();
animate();
