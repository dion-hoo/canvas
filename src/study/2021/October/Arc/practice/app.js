import { Particle } from './particle.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const particles = [];
let hue = 0;

// resize
const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

setCanvasSize();
window.addEventListener('resize', () => {
    setCanvasSize();
});

const mouse = {
    x: null,
    y: null,
};

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(mouse.x, mouse.y, hue));
    }
});

const draw = () => {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    draw();
    hue++;

    requestAnimationFrame(animate);
};

animate();
