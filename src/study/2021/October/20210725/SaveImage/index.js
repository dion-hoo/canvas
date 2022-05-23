const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("a");
const ox = canvas.width / 2;
const oy = canvas.height / 2;

ctx.font = "42px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#800";
ctx.fillRect(ox / 2, oy / 2, ox, oy);

button.addEventListener("click", (e) => {
  const imageURL = canvas.toDataURL("image/svg");

  e.href = imageURL;
});
