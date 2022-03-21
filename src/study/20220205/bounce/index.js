import { Ball } from './ball.js';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const balls = [];

document.body.appendChild(canvas);

const resize = () => {
    const ratio = devicePixelRatio;

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.scale(ratio, ratio);
};

resize();

window.addEventListener('resize', resize);

for (let i = 0; i < 1; i++) {
    const size = Math.random() * canvas.width * 0.01 + 12;
    const x = Math.random() * canvas.width - size / 2;
    const y = size;

    balls.push(new Ball(x, y, size, canvas.width, canvas.height));
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
        ball.update();
        ball.draw(ctx);
    }

    requestAnimationFrame(animate);
};
animate();
