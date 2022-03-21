const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "blue";
ctx.fillRect(200, 200, 300, 300);

ctx.globalCompositeOperation = "luminosity"; // 두 캔버스 사이에 교집합 합집합, 색깔 등 영역을 빼고 색깔을 겹치고 할 수가 있다.

ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(500, 500, 175, 0, Math.PI * 2);
ctx.fill();
