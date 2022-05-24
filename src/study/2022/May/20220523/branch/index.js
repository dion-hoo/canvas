import { Tree } from './Tree.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let tree;

const init = () => {
    tree = new Tree();
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    tree.resize(ctx, innerWidth, innerHeight);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tree.draw();

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
