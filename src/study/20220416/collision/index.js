import { randomIntFromRange } from './utils.js';

import { Particle } from './Particle.js';
let particles = [];

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
const image = document.querySelector('.image');

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    particles = [];

    for (let i = 0; i < 13; i++) {
        const radius = 40;
        const x = randomIntFromRange(radius, innerWidth - radius);
        const y = randomIntFromRange(-radius, 0);

        particles.push(new Particle(x, y, radius, image));
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
        p.collision(particles);
        p.update(particles);
        p.draw(ctx);
    }

    requestAnimationFrame(animate);
};

resize();
init();
animate();

window.addEventListener('resize', resize);
