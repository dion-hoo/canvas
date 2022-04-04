import { Particle } from './Particle.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
const particle = [];
let hsl = 0;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

window.addEventListener('resize', resize);
resize();

const init = (event) => {
    const x = event.pageX;
    const y = event.pageY;

    for (let i = 0; i < 5; i++) {
        particle.push(new Particle(x, y, hsl, innerWidth, innerHeight));
    }
    hsl++;
};

window.addEventListener('pointermove', (event) => {
    init(event);
});

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
animate();
