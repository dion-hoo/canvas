import { WaveGroup } from './WaveGroup.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let waveGroup;

const init = () => {
    waveGroup = new WaveGroup();
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);

    waveGroup.resize(innerWidth, innerHeight);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    waveGroup.draw(ctx);

    requestAnimationFrame(animate);
};

init();
resize();
animate();

window.addEventListener('resize', resize);
