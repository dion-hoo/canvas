import { Tree } from './Tree.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let mouse = {
    x: 0,
    maxTree: 3,
    count: 0,
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const onClick = () => {
    mouse.x += Math.floor(innerWidth / (mouse.maxTree + 1));
    const color = ['rgba(199, 70, 119)', 'rgba(236, 35, 95)', 'rgba(114, 126, 166)'];

    if (mouse.count < mouse.maxTree) {
        new Tree(ctx, mouse.x, innerHeight, color[mouse.count]);
    }

    mouse.count++;
};

resize();

window.addEventListener('click', onClick);
window.addEventListener('resize', resize);
