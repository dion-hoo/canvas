// https://www.youtube.com/watch?v=tOO1XRpY3ag&list=PL9JcWwmaQgxbmefcO62WbXnAAcgPLxuyo&index=8

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const rd = Math.PI / 180; // 호도법

ctx.strokeStyle = "red";

ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(100, 300);
ctx.stroke();
