const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "./layer-1.png";

canvas.addEventListener("mousemove", (event) => {
  const { x, y } = event;

  console.log(x, y);
});

image.onload = () => {
  ctx.beginPath();
  ctx.moveTo(30, 30);
  ctx.lineTo(125, 100);
  ctx.lineTo(25, 100);
  ctx.lineTo(75, 50);

  ctx.clip();

  ctx.drawImage(image, 0, 0);
};
