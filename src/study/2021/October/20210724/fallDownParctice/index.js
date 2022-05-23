const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const particleArray = [];
const numberOfLength = 35;
let wWidth = null;
let wHeight = null;

const resize = () => {
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  const pixel = window.devicePixelRatio;

  canvas.width = wWidth * pixel;
  canvas.height = wHeight * pixel;

  canvas.style.width = wWidth + "px";
  canvas.style.height = wHeight + "px";

  ctx.scale(pixel, pixel);
};

resize();

window.addEventListener("resize", resize);

class Particle {
  constructor() {
    this.x = Math.random() * wWidth;
    this.y = 0;
    this.size = Math.random() * 30 + 10;
    this.weight = Math.random() * 3 + 1.5;
    this.direction = -1;
    this.hue = Math.random() * 255;
    this.end = false;
  }

  update() {
    this.weight += 0.19;
    this.y += this.weight;
    this.x += this.direction;

    if (this.x < 0) {
      this.end = true;
    }

    if (this.y > wHeight - this.size) {
      this.y -= 5;
      this.weight *= -0.6;
    }
  }

  draw() {
    ctx.fillStyle = `hsl(${this.hue}, 100%, 65%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

const init = () => {
  for (let i = 0; i < numberOfLength; i++) {
    particleArray.push(new Particle());
  }
};
init();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (particleArray.length === 0) {
    return false;
  }

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (particleArray[i].end) {
      particleArray.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
};

animate();
