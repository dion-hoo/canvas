import { Text } from './Text.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let text;

const init = () => {
    text = new Text('A', innerWidth / 2, innerHeight / 2);
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    text.update();
    text.draw(ctx);

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
