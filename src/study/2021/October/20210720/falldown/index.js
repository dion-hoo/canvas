const canvas = document.getElementById('canvas');
const buttonStart = document.getElementsByClassName('start');
const buttonNext = document.getElementsByClassName('next');
const ctx = canvas.getContext('2d');

const ratio = window.devicePixelRatio;

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;

ctx.scale(ratio, ratio);

const regex = /\d+/gi;
const wWidth = +canvas.style.width.match(regex)[0];
const wHidth = +canvas.style.height.match(regex)[0];

const emoji = ['🐌', '👺', '👻', '👼', '🚜', '👾', '👿', '💀'];
const particleArray = [];
const numberOfParticle = 24;
const NextClientRect = buttonNext[0].getBoundingClientRect();
const line = {
    x: NextClientRect.x,
    y: NextClientRect.y,
    width: NextClientRect.width,
    height: NextClientRect.height,
};

class Particle {
    constructor() {
        this.size = Math.random() * 30 + 40;
        this.x = Math.random() * wWidth;
        this.y = 0;

        this.weight = Math.random() * 10 + 5;
        this.index = parseInt(Math.random() * 7);
        this.directionX = Math.random() < 0.5 ? -1.3 : 1.3;
        this.spin = Math.random() > 0.5 ? 1 : -1;
        this.end = false;
        this.angle = Math.random() * 360;
    }

    update() {
        this.weight += 0.09;

        this.y += this.weight;
        this.x += this.directionX;
        this.angle += 1;

        if (line.x < this.x + this.size && this.x < line.x + line.width && line.y < this.y + this.size && line.y + line.height > this.y) {
            this.y -= 5;
            this.weight *= -0.4;
        }

        if (this.y + this.size > canvas.height) {
            this.end = true;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(((this.angle * Math.PI) / 360) * this.spin);
        ctx.font = `${this.size}px helvetica`;
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji[this.index], -this.size / 2, -this.size / 2);
        ctx.beginPath();
        ctx.arc(-this.size / 2, -this.size / 2, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

const init = () => {
    for (let i = 0; i < numberOfParticle; i++) {
        particleArray.push(new Particle());
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particleArray.length === 0) {
        return false;
    }

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        if (particleArray[i].end) {
            particleArray.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
};

init();

buttonStart[0].addEventListener('click', () => {
    animate();
    buttonStart[0].remove();
});
