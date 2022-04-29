import { Bridge } from './WaveBridge.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let bridge;

const init = () => {
    bridge = new Bridge(7, 'black', 0.5);
};
const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);

    bridge.resize(innerWidth, innerHeight);
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bridge.draw(ctx);

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);

window.onload = () => {
    init();
    resize();
    animate();
};
