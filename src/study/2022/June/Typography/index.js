import { Visual } from './Visual.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let visual;

const init = () => {
    WebFont.load({
        google: {
            families: ['Hind:700'],
        },
        fontactive: () => {
            visual = new Visual();

            resize();
            animate();
        },
    });
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    visual.show(ctx, innerWidth, innerHeight);
};

const animate = (time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    visual.animate(ctx, time);

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);
window.onload = () => {
    init();
};
