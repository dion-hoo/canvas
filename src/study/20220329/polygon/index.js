import { Polygon } from './polygon.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio > 1 ? 2 : 1;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};
resize();

window.addEventListener('resize', resize);

const width = parseInt(canvas.style.width);
const height = parseInt(canvas.style.height);

const mouse = {
    isDown: false,
    moveX: 0,
    offsetX: 0,
};

document.addEventListener('pointerdown', (e) => {
    mouse.isDown = true;
    mouse.moveX = 0;
    mouse.offsetX = e.clientX;
});

document.addEventListener('pointermove', (e) => {
    if (mouse.isDown) {
        mouse.moveX = e.clientX - mouse.offsetX;
        mouse.offsetX = e.clientX;
    }
});

document.addEventListener('pointerup', (e) => {
    mouse.isDown = false;
});

const polygon = new Polygon(width / 2, height + height / 4, 13, height / 1.7);

const animte = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    polygon.draw(ctx, mouse);

    requestAnimationFrame(animte);
};

animte();
