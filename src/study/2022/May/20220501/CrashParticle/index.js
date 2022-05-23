import { Ball } from './Ball.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let ball1;
let ball2;
const mouse = {
    x: 0,
    y: 0,
    isDown: false,
};

const init = () => {
    ball1 = new Ball(700, 300, 0, 0, 3, 0);
    ball2 = new Ball(600, 270, 0, 0, 0, 0);
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball1.collision(ball2);

    ball1.dounce();
    ball2.dounce();

    ball1.update();
    ball2.update();

    ball1.draw(ctx);
    ball2.draw(ctx);

    requestAnimationFrame(animate);
};

const onDown = () => {
    mouse.isDown = true;
};
const onMove = (event) => {
    if (mouse.isDown) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
};
const onUp = () => {
    mouse.isDown = false;
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
