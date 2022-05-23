import { Snow } from './snow.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let snow = [];
let t = 0;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

window.addEventListener('resize', resize);

const init = () => {
    for (let i = 0; i < 3; i++) {
        snow.push(new Snow(innerWidth, innerHeight));
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const time = t++ / 60;

    init();

    for (let s of snow) {
        s.update(time);
        s.draw(ctx);

        if (s.end) {
            const index = snow.indexOf(s);
            snow.splice(index, 1);
        }
    }

    requestAnimationFrame(animate);
};

resize();
animate();
