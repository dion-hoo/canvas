const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const treeParticleArray = [];

class Tree {
  constructor(x, y, len, angle, branchWidth, branchHeight) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.angle = angle;
    this.branchWidth = branchWidth;
    this.branchHeight = branchHeight;
    this.end = false;
  }

  update() {
    this.branchHeight -= 3;
    if (Math.abs(this.branchHeight) === this.len) {
      this.end = true;
      this.x = 0; // tan
      this.y = 0; // sin
      this.branchHeight = 0;
      this.len *= 0.5;
      this.angle = 30;
    }
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * (Math.PI / 180));
    ctx.fillRect(0, 0, this.branchWidth, this.branchHeight);
    ctx.fill();
    ctx.restore();
  }
}

const x = canvas.width * 0.5;
const y = canvas.height * 0.95;
const tree = new Tree(x, y, 120, 0, 8, 0);

const draw = () => {
  tree.update();
  tree.draw();
};

for (let i = 0; i < 70; i++) {
  setTimeout(() => {
    draw();
  }, i * 100);
}

// const animate = () => {
//   draw();

//   if (!tree.end) {
//     requestAnimationFrame(animate);
//   }
// };
// animate();
