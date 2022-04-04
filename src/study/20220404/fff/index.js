import { Polygon } from './Polygon.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
const width = innerWidth;
const height = innerHeight;
const colorSet = [0, 30, 60, 90, 100, 120, 140, 180, 200, 210, 220, 230, 240, 255];
const mouse = {
    isDown: false,
    moveX: 0,
    offsetX: 0,
};
let polygon = null;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

window.addEventListener('resize', resize);
window.addEventListener('pointerdown', (e) => {
    mouse.isDown = true;
    mouse.moveX = 0;
    mouse.offsetX = e.clientX;
});
window.addEventListener('pointermove', (e) => {
    if (mouse.isDown) {
        mouse.moveX = e.clientX - mouse.offsetX;
        mouse.offsetX = e.clientX;
    }
});
window.addEventListener('pointerup', () => {
    mouse.isDown = false;
});

const init = () => {
    polygon = new Polygon(width / 2, height / 2 + height * 0.8, 12, height * 0.6);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    polygon.draw(ctx, mouse, colorSet);

    requestAnimationFrame(animate);
};

resize();
init();
animate();
