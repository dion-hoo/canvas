import { Circle } from './circle.js';
const mouse = {
    x: 0,
    y: 0,
};
let circle1 = null;
let circle2 = null;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    circle1 = new Circle(400, 400, 100, 'gray');
    circle2 = new Circle(mouse.x, mouse.y, 30, 'red');
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle1.draw(ctx);

    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.draw(ctx);

    const distance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);

    if (distance < circle1.radius + circle2.radius) {
        circle1.color = 'red';
    }

    requestAnimationFrame(animate);
};

const getDistance = (x1, y1, x2, y2) => {
    const x = Math.abs(x2 - y1);
    const y = Math.abs(y2 - y1);
    const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    return z;
};

const mouseMove = (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
};

resize();
init();
animate();

window.addEventListener('mousemove', mouseMove);
window.addEventListener('resize', resize);
