import { Ball } from './Ball.js';
import { Vector } from './Vector.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let ball1 = null;
let ball2 = null;

let force1 = new Vector(0, 0),
    force2 = new Vector(0, 0);

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    ball1 = new Ball(innerWidth * 0.2, innerHeight * 0.5, '#1c9');
    ball2 = new Ball(innerWidth * 0.9, innerHeight * 0.5, '#19c');
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.addEventListener('mousedown', () => {
        force1 = new Vector(0.1, 0);
        force2 = new Vector(-0.1, 0);
    });

    window.addEventListener('mouseup', () => {
        force1 = new Vector(0, 0);
        force2 = new Vector(0, 0);
    });

    // ball1.applyForce(force1);
    ball1.update();
    ball1.draw(ctx);
    ball1.collision(ball2);

    ball2.applyForce(force2);
    ball2.update();
    ball2.draw(ctx);

    requestAnimationFrame(animate);
};

resize();
init();
animate();

window.addEventListener('resize', resize);
