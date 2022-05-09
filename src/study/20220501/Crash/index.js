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

    for (let i = 0; i < 20; i++) {
        text.push(new Text(ctx));
    }
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    ctx.globalCompositeOperation = 'xor';
    ctx.fillStyle = '#fff';

    for (let i = 0; i < text.length; i++) {
        const t = text[i];
        const index = i % letterSize;

        t.setText(letter[index]);
    }

    for (let i = 0; i < text.length; i++) {
        const t = text[i];

        t.resize(i, innerWidth, innerHeight, text);
    }
};

const animate = (time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gravity = createVector(0, 0.4);
    // const gravity = createVector(0, 0.04);

    for (let t of text) {
        if (clicked) {
            t.applyForce(gravity);
            t.collision(text);
            t.update();
            t.windowBounce();
        }

        t.draw(time, mouse);
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
