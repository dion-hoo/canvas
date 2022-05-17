import { Text } from './Text.js';
import { createVector } from './vector.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let letter = ['N', 'A', 'T', 'U', 'R', 'E', 'O', 'F', 'C', 'O', 'D', 'E'];
let letterSize = letter.length;
let text = [];
let clicked = false;
let mouse = {
    x: 0,
    y: 0,
    isDown: false,
};

const init = () => {
    WebFont.load({
        google: {
            families: ['Hind:700'],
        },
    });

    const radius = 30;
    for (let i = 0; i < 30; i++) {
        const index = i % letterSize;

        const circle = {
            radius,
            x: Math.random() * (innerWidth - radius * 2) + radius,
            y: Math.random() * (innerHeight * 0.3 - radius * 2) + radius,
        };

        let isOverlapping = false;
        for (let j = 0; j < text.length; j++) {
            const otherCricle = text[j];

            const dx = otherCricle.location.x - circle.x;
            const dy = otherCricle.location.y - circle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < otherCricle.radius + circle.radius) {
                isOverlapping = true;
                break;
            }
        }

        if (!isOverlapping) {
            const t = letter[index];

            text.push(new Text(t, circle.x, circle.y, circle.radius));
        }
    }
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    const fontSize = 60;
    const fontName = 'Hind';

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontSize}px ${fontName}`;

    for (let t of text) {
        t.resize(innerWidth, innerHeight);
    }
};

const animate = (time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gravity = createVector(0, 0.4);
    //const gravity = createVector(0, 0.04);

    for (let t of text) {
        if (clicked) {
            t.applyForce(gravity);
            t.collision(text);
            t.update();
            t.windowBounce();
        }

        t.draw(ctx, time, clicked);
    }

    requestAnimationFrame(animate);
};

const onMove = (event) => {
    if (mouse.isDown) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
};

const onDown = () => {
    mouse.isDown = true;
    clicked = true;
};

const onUp = () => {
    mouse.isDown = false;
};

window.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
