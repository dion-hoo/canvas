import { WaterGun } from './WaterGun.js';
import { Mouse } from './Mouse.js';
import { Bubble } from './Ball.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let waterGun;
let mouseShape;
let theta = 0;
let ball = [];

const image = {
    width: 100,
    height: 100,
};
const mouse = {
    x: 170,
    y: innerHeight / 2,
    isDown: false,
};

const init = () => {
    waterGun = new WaterGun(100, innerHeight / 2, image.width, image.height);
    mouseShape = new Mouse(mouse.x, mouse.y);
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

    waterGun.rotation(theta);
    waterGun.draw(ctx);
    mouseShape.draw(ctx, mouse);

    for (let b of ball) {
        b.update();
        b.bounce();
        b.collision(ball);
        b.draw(ctx);
    }

    requestAnimationFrame(animate);
};

const settingPos = (x, y) => {
    const dx = x - waterGun.x;
    const dy = y - waterGun.y;
    const dz = Math.sqrt(dx * dx + dy * dy);
    const newAngle = Math.atan2(dy, dx);

    const newX = waterGun.x + Math.cos(theta + newAngle) * dz;
    const newY = waterGun.y + Math.sin(theta + newAngle) * dz;

    return {
        x: newX,
        y: newY,
    };
};

const onDown = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isDown = true;

    const ballPos = settingPos(170, innerHeight / 2);

    const dx = mouse.x - ballPos.x;
    const dy = mouse.y - ballPos.y;

    const angle = Math.atan2(dy, dx);

    ball.push(new Bubble(angle, ballPos.x, ballPos.y));
};
const onMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const dx = mouse.x - waterGun.x;
    const dy = mouse.y - waterGun.y;
    const angle = Math.atan2(dy, dx);

    theta = angle;

    const ballPos = settingPos(170, innerHeight / 2);
    mouseShape = new Mouse(ballPos.x, ballPos.y);
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
