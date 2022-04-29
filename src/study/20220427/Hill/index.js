import { Hill } from './Hill.js';
import { SheepController } from './Sheep-controller.js';
import { Sun } from './Sun.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
const image = document.querySelector('.img');
let hill = [];
let sheepController;
let sun;

const init = () => {
    hill = [new Hill('#fd6bea', 0.2, 12), new Hill('#ff59c2', 0.5, 8), new Hill('#ff4574', 1, 8)];
    sheepController = new SheepController();
    sun = new Sun();
};
const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);

    for (let h of hill) {
        h.resize(canvas.width, canvas.height);
    }

    sheepController.resize(canvas.width, canvas.height, image);
    sun.resize(canvas.width, canvas.height);
};
const animate = (t) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sun.draw(ctx, t);

    let dots;
    for (let h of hill) {
        dots = h.draw(ctx);
    }

    sheepController.draw(ctx, t, dots);

    requestAnimationFrame(animate);
};

window.onload = () => {
    init();
    resize();
    animate();
};

window.addEventListener('resize', resize);
