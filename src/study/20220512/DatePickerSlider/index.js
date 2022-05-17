import { TextGroup } from './TextGroup.js';
import { SelectBar } from './SelectBar.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;

let selectBar = null;
let textGroup = null;

const mouse = {
    moveY: 0,
    decreaseY: 0,
    offsetY: 0,
    isDown: false,
};

const init = () => {
    selectBar = new SelectBar();
    textGroup = new TextGroup(10, 4);
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    ctx.globalCompositeOperation = 'xor';

    selectBar.resize(innerWidth, innerHeight);
    textGroup.resize(innerWidth, innerHeight, selectBar);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    textGroup.draw(ctx, mouse, selectBar);
    selectBar.draw(ctx);

    requestAnimationFrame(animate);
};

const onDown = (e) => {
    mouse.offsetY = e.clientY;

    mouse.isDown = true;

    mouse.decreaseY = 0;
    mouse.moveY = 0;
};
const onMove = (e) => {
    if (mouse.isDown) {
        mouse.moveY = e.clientY - mouse.offsetY;
        mouse.decreaseY = e.clientY - mouse.offsetY;

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
