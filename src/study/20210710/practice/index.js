const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = [];
const MAXLENGHT = 100;
const mouse = {
  x: null,
  y: null,
};
canvas.addEventListener("mousemove", (event) => {
  const { x, y } = event;

  mouse.x = x;
  mouse.y = y;
});

// canvas.addEventListener("touchmove", (event) => {
//   const { x, y } = event;

//   mouse.x = x;
//   mouse.y = y;
// });

setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 300);

class Particle {
  constructor(x, y, size, color, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
  }

  update() {
    this.size -= 0.3; // 사이즈는 갈 수록 줄어들고
    this.weight += 0.2; // 무게는 갈 수록 증가한다.
    this.y += this.weight; // 위에서 떨어진다.

    if (this.size < 0) {
      this.x = mouse.x + Math.random() * 10 + 10;
      this.y = mouse.y + Math.random() * 10 + 10;
      this.size = Math.random() * 20 + 15;
      this.weight = Math.random() * 3 - 1.5;
    }

    if (this.y > canvas.height - this.size) {
      this.weight *= -0.3;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const draw = () => {
  for (let i = 0; i < MAXLENGHT; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 20 + 18;
    let color = "pink";
    let weight = 1;

    particleArray.push(new Particle(x, y, size, color, weight));
  }
};

const connect = () => {
  const opacity = 1;

  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let distance =
        (particleArray[a].x - particleArray[b].x) *
          (particleArray[a].x - particleArray[b].x) +
        (particleArray[a].y - particleArray[b].y) *
          (particleArray[a].y - particleArray[b].y);

      if (distance < 300) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
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

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }

  // connect();
  requestAnimationFrame(animate);
};

draw();
animate();
