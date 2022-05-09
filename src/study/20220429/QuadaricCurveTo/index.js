import { Line } from './Line.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let line;
const mouse = {
    x: innerWidth / 2,
    isDown: false,
};

const init = () => {
    line = new Line();
};
const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);

    line.resize(innerWidth, innerHeight);
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.draw(ctx, mouse);

    requestAnimationFrame(animate);
};

const onDown = (e) => {
    mouse.isDown = true;
    mouse.offsetX = e.clientX;
};

const onMove = (e) => {
    if (mouse.isDown) {
        mouse.x = e.clientX;
    }
};

const onUp = () => {
    mouse.isDown = false;
    mouse.x *= 0.99;
};

window.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);
window.addEventListener('resize', resize);

window.onload = () => {
    init();
    resize();
    animate();
};
