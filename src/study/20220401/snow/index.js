import { SnowFlower } from './snow.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const snow = [];
let frameCount = 0;

const resize = () => {
    const ratio = devicePixelRatio;
    const width = innerWidth;
    const height = innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.scale(ratio, ratio);

    return { width, height };
};

window.addEventListener('resize', resize);
const { width, height } = resize();

const init = () => {
    for (let i = 0; i < 2; i++) {
        snow.push(new SnowFlower(width, height));
    }
};

const animate = () => {
    ctx.clearRect(0, 0, width, height);

    init();
    for (let [index, s] of snow.entries()) {
        s.update(frameCount);
        s.draw(ctx);

        if (s.y > height) {
            snow.splice(index, 1);
        }
    }
    frameCount++;

    requestAnimationFrame(animate);
};
animate();
