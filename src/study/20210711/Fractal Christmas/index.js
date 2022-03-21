const CANVAS_WIDHT = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const canvas = document.querySelector("#canvasTree");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDHT;
canvas.height = CANVAS_HEIGHT;

const drawBranchs = (start, len, angle, branchWidth) => {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = "hsl(321, 89%, 44%, 1)";
  ctx.lineWidth = branchWidth;
  ctx.translate(...start);

  ctx.rotate(angle * (Math.PI / 180));
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len > 10) {
    drawBranchs([0, -len], len * 0.8, 15, branchWidth * 0.7);
    drawBranchs([0, -len], len * 0.8, -15, branchWidth * 0.7);
  }
  ctx.restore();
};

const treeLocation = [CANVAS_WIDHT * 0.5, CANVAS_HEIGHT * 0.95];
drawBranchs(treeLocation, 140, 0, 10);
