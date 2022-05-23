import { Circle } from './Circle.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let circle = [];

const init = () => {
    for (let i = 0; i < 3; i++) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        circle.push(new Circle(randomColor, 100));
    }
};
const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);

    for (let c of circle) {
        c.resize(innerWidth, innerHeight);
    }
};
const animate = (t) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let c of circle) {
        c.update();
        c.draw(ctx, t);
    }

    requestAnimationFrame(animate);
};

init();
resize();
animate();

window.addEventListener('resize', resize);
