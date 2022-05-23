import { Canoon } from './Cannon.js';
import { Ball } from './Ball.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
const cannonBalls = [];
let angle = 0;
let cannon = null;
let mouse = {
    x: 0,
    y: 0,
};

const settingPos = (x, y) => {
    const rotateAnlge = angle;
    const dx = x - cannon.x;
    const dy = y - cannon.y;
    const dz = Math.sqrt(dx * dx + dy * dy);

    const originAngle = Math.atan2(dy, dx);

    // 아직 이해가 안됨
    const newX = cannon.x + Math.cos(originAngle + rotateAnlge) * dz;
    const newY = cannon.y + Math.sin(originAngle + rotateAnlge) * dz;

    return {
        x: newX,
        y: newY,
    };
};

const init = () => {
    cannon = new Canoon(80, innerHeight);
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

    angle = cannon.cannonRotate(mouse);
    cannon.draw(ctx);

    for (let i = 0; i < cannonBalls.length; i++) {
        const b = cannonBalls[i];

        b.bounce();
        b.collide(i, cannonBalls);
        b.move();
        b.draw(ctx);
    }

    requestAnimationFrame(animate);
};

const onDown = () => {
    let ballPos = settingPos(cannon.x + cannon.imageWidth / 2, cannon.y - cannon.imageHeight + 13);

    // 이부분도 이해가 안된다.
    // if (!canShoot) return;
    // canShoot = false;

    cannonBalls.push(new Ball(angle, ballPos.x, ballPos.y));

    // setTimeout(() => {
    //     canShoot = true;
    // }, 1000);
};

const onMove = (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
};

window.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
