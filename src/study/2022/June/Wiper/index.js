import { Wiper } from './Wiper.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let wiper;

const init = () => {
    wiper = new Wiper();
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    wiper.resize(innerWidth, innerHeight);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wiper.update();
    wiper.draw(ctx);

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
