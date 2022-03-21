const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ratio = devicePixelRatio;

const resize = () => {
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);
};

const particles = [];

window.addEventListener("resize", resize);
resize();

class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    ctx.fillStyle = "deepink";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

const init = () => {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(10, 10, 30));
  }
};

const draw = () => {
  for (let particle of particles) {
    particle.draw();
  }
};

init();
draw();

canvas.addEventListener("mousemove", (e) => {
  console.log(e);
});
