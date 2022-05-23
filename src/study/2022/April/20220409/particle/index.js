import { Particle } from './particle.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let particle = [];
let hsl = 0;
const mouse = {
    x: null,
    y: null,
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const mouseMove = (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;

    init();
};

const init = () => {
    for (let i = 0; i < 5; i++) {
        particle.push(new Particle(mouse.x, mouse.y, innerWidth, innerHeight, hsl));
    }

    hsl++;
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particle) {
        p.update();
        p.draw(ctx);

        if (p.end) {
            const index = particle.indexOf(p);
            particle.splice(index, 1);
        }
    }

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);
window.addEventListener('mousemove', mouseMove);

resize();
animate();
