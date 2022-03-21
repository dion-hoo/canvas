// element
const calculator = document.querySelector(".calculator");
const selectBar = document.querySelector(".select-bar");
const price = document.querySelector(".price");
const calculatorClientRect = calculator.getBoundingClientRect();
const selectBarClientRect = selectBar.getBoundingClientRect();

// canvas
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const ratio = window.devicePixelRatio;

// variable
const QUATER = 5; // 분기점
const INTERVAL = 22; // grid 간격
const TOTALPRICE = 300000; // 총 금액
const PER = 5000; // 한개의 grid당 가격
const TOTALLENGTH = parseInt(TOTALPRICE / PER); // 총 grid 갯수
const currentPrice = 0;
const mouse = {
  x: null,
  y: null,
  direction: null,
  disabled: false,
};
let particles = [];

const resize = () => {
  canvas.width = calculator.clientWidth * ratio;
  canvas.height = calculator.clientHeight * ratio;

  canvas.style.width = `${calculator.clientWidth}px`;
  canvas.style.height = `${calculator.clientHeight}px`;

  ctx.scale(ratio, ratio);
};
resize();

class Particle {
  constructor(index, height) {
    this.x = calculator.clientWidth / 2;
    this.y = calculator.clientHeight / 2;
    this.height = height;
    this.index = index;
    this.distance = index * INTERVAL;
    this.pass = false;
  }

  update() {
    this.x += this.distance;
    this.y -= this.height / 2;
  }

  slide() {
    if (!mouse.disabled) {
      this.x += INTERVAL * mouse.direction;
      this.pass = this.x - INTERVAL / 2 <= selectBarClientRect.x;
    }
  }

  draw() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191c20";

    ctx.beginPath();
    switch (this.index) {
      case 0:
        ctx.moveTo(this.x + ctx.lineWidth / 2, this.y);
        ctx.lineTo(this.x + ctx.lineWidth / 2, this.y + this.height);
        break;

      case TOTALLENGTH:
        ctx.moveTo(this.x - ctx.lineWidth / 2, this.y);
        ctx.lineTo(this.x - ctx.lineWidth / 2, this.y + this.height);
        break;

      default:
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.height);
    }
    ctx.stroke();
  }
}

const gridDraw = () => {
  particles = [];
  for (let i = 0; i <= TOTALLENGTH; i++) {
    const gridHeight = i % QUATER === 0 ? 20 : 12;

    particles.push(new Particle(i, gridHeight));
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
};
gridDraw();

window.addEventListener("resize", () => {
  resize();
  gridDraw();
});

// mouse event
const handleTouchStart = (event) => {
  const firstTouch = event.touches[0];
  mouse.x = firstTouch.clientX;
  mouse.y = firstTouch.clientY;
};

const handleTouchMove = (event) => {
  const touchMoveX = event.touches[0].clientX;
  const touchMoveY = event.touches[0].clientY;
  const firstGrid = particles[0];
  const lastGrid = particles[particles.length - 1];

  const directionX = mouse.x - touchMoveX;
  const directionY = mouse.y - touchMoveY;

  // 위 아래로 스와이핑 했을 경우
  if (Math.abs(directionX) < Math.abs(directionY)) {
    return false;
  }

  if (directionX > 0) {
    // 오른쪽
    mouse.direction = -1;
    mouse.disabled = selectBarClientRect.x > lastGrid.x - INTERVAL / 2;
  } else {
    // 왼쪽
    mouse.direction = 1;
    mouse.disabled = selectBarClientRect.x < firstGrid.x;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].slide();
    particles[i].draw();
    if (particles[i].pass) {
      price.textContent = (i * PER).toLocaleString() + "원";
    }
  }

  mouse.x = touchMoveX;
  mouse.y = touchMoveY;
};

// mobile
canvas.addEventListener("touchstart", handleTouchStart, false);
canvas.addEventListener("touchmove", handleTouchMove, false);
