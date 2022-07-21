import { Ball } from './Ball.js';
import { Vector } from './Vector.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let balls = [];

const KEY = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false,
};

const init = () => {
    for (let i = 0; i < 1; i++) {
        const radius = Math.random() * 50 + 40;

        const x = Math.random() * innerWidth + radius - radius;
        const y = Math.random() * innerHeight + radius - radius;

        balls.push(new Ball(x, y, radius));
    }

    balls[0].player = true;
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    for (let b of balls) {
        b.resize(innerWidth, innerHeight);
    }
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
