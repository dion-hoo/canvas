import { Ball } from './Ball.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let ball = null;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    ball = new Ball();
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.update();
    ball.draw(ctx);

    requestAnimationFrame(animate);
};

resize();
init();
animate();

window.addEventListener('resize', resize);
