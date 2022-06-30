const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;

const init = () => {};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);
};

let x = 100;
let y = 100;

let LEFT, RIGHT, UP, DOWN;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 0, 0 ,0.3)';
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    move();

    requestAnimationFrame(animate);
};

canvas.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        RIGHT = true;
    }

    if (event.code === 'ArrowLeft') {
        LEFT = true;
    }

    if (event.code === 'ArrowUp') {
        UP = true;
    }

    if (event.code === 'ArrowDown') {
        DOWN = true;
    }
});

canvas.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') {
        RIGHT = false;
    }

    if (event.code === 'ArrowLeft') {
        LEFT = false;
    }

    if (event.code === 'ArrowUp') {
        UP = false;
    }

    if (event.code === 'ArrowDown') {
        DOWN = false;
    }
});

function move() {
    if (LEFT) {
        x -= 5;
    }

    if (UP) {
        y -= 5;
    }

    if (RIGHT) {
        x += 5;
    }

    if (DOWN) {
        y += 5;
    }
}

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
