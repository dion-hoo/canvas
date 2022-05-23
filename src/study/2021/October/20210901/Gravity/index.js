const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const pixel = window.devicePixelRatio;

canvas.width = window.innerWidth * pixel;
canvas.height = window.innerHeight * pixel;

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

ctx.scale(pixel, pixel);

ctx.fillStyle = 'red';
ctx.strokeStyle = 'red';

// line
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100, 300);
ctx.lineTo(100, 200);
ctx.lineTo(50, 200);
ctx.fill();
ctx.closePath();

// arc
ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
for (let i = 0; i < 1000; i++) {
    const x = Math.random() * window.innerWidth - 30;
    const y = Math.random() * window.innerHeight - 30;

    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}
