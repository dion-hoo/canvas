import { Wave } from './Wave.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let wave;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    wave = new Wave(canvas.width, canvas.height);
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wave.draw(ctx);

    requestAnimationFrame(animate);
};

resize();
init();
animate();

window.addEventListener('resize', resize);
