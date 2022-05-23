import { Hill } from './Hill.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let hill;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.save(ratio, ratio);
};

const init = () => {
    hill = new Hill(canvas.width, canvas.height);
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hill.draw(ctx);

    requestAnimationFrame(animate);
};

resize();
init();
animate();

window.addEventListener('resize', resize);
