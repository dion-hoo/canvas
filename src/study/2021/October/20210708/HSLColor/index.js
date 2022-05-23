const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const colours = ['white', 'rgba(255, 255, 255, 0.3)', 'rgba(173, 216, 230, 0.8)', 'rgba(211, 211, 211, 0.8)'];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

let mouse = {
    x: null,
    y: null,
};

window.addEventListener('mousemove', (event) => {
    const { x, y } = event;

    mouse.x = x;
    mouse.y = y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, colour) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.colour = colour;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }

    update() {
        if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;

        if (
            mouse.x - this.x < mouseRadius &&
            mouse.x - this.x > -mouseRadius &&
            mouse.y - this.y < mouseRadius &&
            mouse.y - this.y < -mouseRadius
        ) {
            if (this.size < maxSize) {
                this.size += 3;
            }
        } else if (this.size > minSize) {
            this.size -= 0.1;
        }

        if (this.size < 0) {
            this.size = 0;
        }

        this.draw();
    }
}

const init = () => {
    particleArray = [];
    for (let i = 0; i < 1000; i++) {
        const size = 0;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = Math.random() * 0.2 - 1;
        const directionY = Math.random() * 0.2 - 1;
        const colour = colours[Math.floor(Math.random() * colours.length)];

        particleArray.push(new Particle(x, y, directionX, directionY, size, colour));
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
};

init();
animate();
