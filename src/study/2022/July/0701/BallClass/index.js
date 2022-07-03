import { Ball } from './Ball.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let balls = [];
let ball1;
let ball2;

const KEY = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false,
};

const init = () => {
    ball1 = new Ball(300, 200, 50);
    ball2 = new Ball(500, 500, 70);

    ball1.player = true;
    balls.push(ball1, ball2);
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);
};

const onDown = (event) => {
    if (event.keyCode === 37) {
        KEY.LEFT = true;
    }
    if (event.keyCode === 38) {
        KEY.UP = true;
    }
    if (event.keyCode === 39) {
        KEY.RIGHT = true;
    }
    if (event.keyCode === 40) {
        KEY.DOWN = true;
    }
};

const onUp = (event) => {
    if (event.keyCode === 37) {
        KEY.LEFT = false;
    }
    if (event.keyCode === 38) {
        KEY.UP = false;
    }
    if (event.keyCode === 39) {
        KEY.RIGHT = false;
    }
    if (event.keyCode === 40) {
        KEY.DOWN = false;
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
        ball.draw(ctx);

        if (ball.player) {
            ball.update(KEY);
            ball.display(ctx);
        }
    });

    requestAnimationFrame(animate);
};

window.addEventListener('keydown', onDown);
window.addEventListener('keyup', onUp);

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
