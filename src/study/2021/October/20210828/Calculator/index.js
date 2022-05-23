const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const pixel = window.devicePixelRatio;
let width = window.innerWidth;
let height = window.innerHeight;
let isDown = false;
let moveX = 0;
let offsetX = 0;

canvas.width = width * pixel;
canvas.height = height * pixel;

canvas.style.width = width + 'px';
canvas.style.height = height + 'px';

ctx.scale(pixel, pixel);

class Particle {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.interval = 30;
        this.move = 0;
    }

    draw() {
        ctx.save();
        ctx.fillStyle = '#ca8b5f';

        ctx.beginPath();

        ctx.translate(this.x, this.y);

        this.move -= moveX;

        ctx.lineWidth = 1;
        for (let i = 0; i < this.length; i++) {
            ctx.moveTo(i * this.interval - this.move, 0);
            ctx.lineTo(i * this.interval - this.move, 40);
            ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }
}

let particle = new Particle(width / 2, height / 2, 35);

const onDown = (e) => {
    isDown = true;
    moveX = 0;
    offsetX = e.clientX;
};

const onMove = (e) => {
    if (isDown) {
        moveX = e.clientX - offsetX;
        offsetX = e.clientX;
    }
};

const onUp = () => {
    isDown = false;
};

const animate = () => {
    ctx.clearRect(0, 0, width, height);
    moveX *= 0.93;

    particle.draw();

    requestAnimationFrame(animate);
};
animate();

document.addEventListener('pointerdown', onDown);
document.addEventListener('pointermove', onMove);
document.addEventListener('pointerup', onUp);
