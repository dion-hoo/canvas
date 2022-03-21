const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const str = "Hello World";

ctx.font = "34px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#fff";
ctx.fillText(str, 150, 50);
