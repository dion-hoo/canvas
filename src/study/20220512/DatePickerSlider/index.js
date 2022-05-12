import { TextGroup } from './TextGroup.js';
import { SelectBar } from './SelectBar.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;

let selectBar = null;
let textGroup = null;

const mouse = {
    y: 0,
    offsetY: 0,
    isDown: false,
};

const init = () => {
    textGroup = new TextGroup(2, 10);
    selectBar = new SelectBar();
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    ctx.globalCompositeOperation = 'multiply';

    textGroup.resize(innerWidth, innerHeight);
    selectBar.resize(innerWidth, innerHeight);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    selectBar.draw(ctx);
    textGroup.draw(ctx, mouse);

    // requestAnimationFrame(animate);
};

const onDown = (e) => {
    mouse.offsetY = e.clientY;
    mouse.y = 0;
    mouse.isDown = true;
};
const onMove = (e) => {
    if (mouse.isDown) {
        mouse.y = e.clientY - mouse.offsetY;
        mouse.offsetY = e.clientY;
    }
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
