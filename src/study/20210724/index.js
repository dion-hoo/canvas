const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button");
const ox = canvas.width / 2;
const oy = canvas.height / 2;

ctx.font = "42px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#fff";
ctx.fillText("hello worold", ox, oy);

button.addEventListener("click", () => {
  ctx.translate(ox, oy);
  ctx.rotate(15 * (Math.PI / 180));
  ctx.fillText("hello worold", 0, 0);
  ctx.translate(-ox, -oy);
});
