const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ratio = window.devicePixelRatio;
const particleArray = [];
let hue = 0;

canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;
ctx.scale(ratio, ratio);

canvas.addEventListener("mousemove", (event) => {
  const { x, y } = event;

  for (i = 0; i < 5; i++) {
    particleArray.push(new Particle(x, y, hue));
  }
});

class Particle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 5;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.life = true;
    this.vr = 0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.vr += 0.02;
    this.size -= this.vr;
    if (this.size <= 1) {
      this.life = false;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fill();
  }
}

const draw = () => {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (!particleArray[i].life) {
      particleArray.splice(i, 1);
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  draw();
  hue++;
  requestAnimationFrame(animate);
};
animate();
