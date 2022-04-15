import { Polygon } from './Polygon.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const image = document.querySelector('.image');
const ratio = devicePixelRatio;
let polygon = [];

const mouse = {
    isDown: false,
    moveX: 0,
    offsetX: 0,
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.wdith = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    for (let i = 0; i < 5; i++) {
        const size = Math.random() * innerWidth * 0.05 + 90;
        const x = innerWidth / 2 + (Math.random() * 200 - 100);
        const y = innerHeight / 2 + (Math.random() * 200 - 100);

        polygon.push(new Polygon(7, x, y, size, image));
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of polygon) {
        p.update(mouse);
        p.draw(ctx);
    }

    requestAnimationFrame(animate);
};

const onDown = (e) => {
    mouse.isDown = true;
    mouse.offsetX = e.pageX;
};
const onMove = (e) => {
    if (mouse.isDown) {
        mouse.moveX = e.pageX - mouse.offsetX;
        mouse.offsetX = e.pageX;
    }
};
const onUp = () => {
    mouse.isDown = false;
};

resize();
init();
animate();

window.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);
window.addEventListener('resize', resize);
