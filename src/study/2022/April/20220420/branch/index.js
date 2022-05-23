import { Tree } from './Tree.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

resize();

window.addEventListener('click', () => {
    const tree = new Tree(ctx);
    tree.draw();
});
window.addEventListener('resize', resize);
