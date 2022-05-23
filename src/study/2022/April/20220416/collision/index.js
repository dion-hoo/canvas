import { getDistance, randomIntFromRange } from './utils.js';
import { Vector } from './Vector.js';

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

    for (let i = 0; i < 4; i++) {
        const radius = 40;
        let x = randomIntFromRange(radius, innerWidth - radius);
        let y = randomIntFromRange(-innerHeight * 0.2, 0);

        particles.push(new Particle(x, y, radius, image));
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gravity = new Vector(0.0001, 0.01);

    for (let p of particles) {
        p.applyForce(gravity);
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
