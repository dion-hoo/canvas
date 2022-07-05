import { Ball } from './Ball.js';
import { Vector } from './Vector.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let balls = [];
let ball1;
let ball2;
let ball3;

const KEY = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false,
};

const init = () => {
    ball1 = new Ball(300, 200, 50);
    ball2 = new Ball(500, 500, 70);
    ball3 = new Ball(700, 500, 100);

    ball1.player = true;
    balls.push(ball1, ball2, ball3);
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    ball1.resize(innerWidth, innerHeight);
    ball2.resize(innerWidth, innerHeight);
    ball3.resize(innerWidth, innerHeight);
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

let acceleration = 1;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball, index) => {
        ball.draw(ctx);

        if (ball.player) {
            if (KEY.LEFT) {
                ball.acceleration.x = -acceleration;
            }
            if (KEY.UP) {
                ball.acceleration.y = -acceleration;
            }
            if (KEY.RIGHT) {
                ball.acceleration.x = acceleration;
            }
            if (KEY.DOWN) {
                ball.acceleration.y = acceleration;
            }

            if (!KEY.LEFT && !KEY.RIGHT) {
                ball.acceleration.x = 0;
            }

            if (!KEY.UP && !KEY.DOWN) {
                ball.acceleration.y = 0;
            }
        }

        for (let i = index + 1; i < balls.length; i++) {
            // 충돌했을 경우
            if (balls[index].collision(balls[i], ctx)) {
                balls[index].resolution(balls[i]);
                balls[index].collisionBall(balls[i]);
            }
        }

        ball.update();
        ball.display(ctx);
        ball.bounce();
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
