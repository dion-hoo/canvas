import { Hill } from './Hill.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let hills = [];

const init = () => {
    hills = [new Hill('#fd6bea', 0.2, 12), new Hill('#ff59c2', 0.5, 8), new Hill('#ff4574', 1.4, 5)];
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);

    for (let hill of hills) {
        hill.resize(canvas.width, canvas.height);
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let dots;
    for (let hill of hills) {
        dots = hill.draw(ctx);
    }

    requestAnimationFrame(animate);
};

init();
resize();
animate();

window.addEventListener('resize', resize);
