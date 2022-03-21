window.addEventListener("load", () => {
  const canvas = document.createElement("canvas");
  const emojis = ["0x1F382", "0x1F47B"];

  canvas.id = "canvas";
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");

  ctx.font = "150px arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String.fromCodePoint(emojis[1]), 100, 100);
});
