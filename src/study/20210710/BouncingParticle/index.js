const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = [];
const maxlenght = 300;
const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("mousemove", (event) => {
  const { x, y } = event;
  mouse.x = x;
  mouse.y = y;
});

class Particle {
  constructor(x, y, size, color, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.size -= 0.03;
    if (this.size < 0) {
      this.x = mouse.x + Math.random() * 20 - 10;
      this.y = mouse.y + Math.random() * 20 - 10;
      this.size = Math.random() * 5 + 5;
      this.weight = Math.random() * 2 - 0.5;
    }
    this.y += this.weight;
    this.weight += 0.2;

    if (this.y > canvas.height - this.size) {
      this.y -= 5;
      this.weight *= -0.9;
    }
  }
}

const init = () => {
  for (let i = 0; i < maxlenght; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 10 + 5;
    let color = "pink";
    let weight = 1;

    particleArray.push(new Particle(x, y, size, color, weight));
  }
};

const connect = () => {
  let opacity = 1;

  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let distance =
        (particleArray[a].x - particleArray[b].x) *
          (particleArray[a].x - particleArray[b].x) +
        (particleArray[a].y - particleArray[b].y) *
          (particleArray[a].y - particleArray[b].y);

      if (distance < 2000) {
        opacity = 1 - distance / 10000; // 즉 거리가 멀수록 opactiy값을 높아진다. 즉 사라진다!!
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0,0.08)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < maxlenght; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }

  connect();
  requestAnimationFrame(animate);
};

init();
animate();
