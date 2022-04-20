import { Wave } from './Wave.js';
import { People } from './People.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let wave;
let people = [];

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    wave = new Wave('#923');

    for (let i = 0; i < 1; i++) {
        const radius = Math.random() * 10 + 20;
        const x = radius + Math.random() * (innerWidth - radius + 1);
        const y = radius;

        people.push(new People(x, y, radius));
    }
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wave.draw(ctx);

    for (let p of people) {
        p.bounce(wave);
        p.update();
        p.draw(ctx);
    }

    requestAnimationFrame(animate);
};

resize();
init();
animate();

window.addEventListener('resize', resize);
