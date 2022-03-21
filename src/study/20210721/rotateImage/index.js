const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const pixel = window.devicePixelRatio;

const resize = () => {
    canvas.width = window.innerWidth * pixel;
    canvas.height = window.innerHeight * pixel;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    ctx.scale(pixel, pixel);
};
resize();

window.addEventListener('resize', resize);

const particleArray = [];
const numberofLenght = 30;
const image = new Image();
image.src = 'park.png';

class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = 0;
        this.size = Math.random() * 30 + 20;
        this.angle = Math.random() * 360;
        this.spin = Math.random() > 0.5 ? 1 : -1;
        this.speed = Math.random() * 3 + 1.5;
    }

    update() {
        this.angle += 1;
        this.y += this.speed;

        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * window.innerWidth;
            this.size = Math.random() * 10 + 50;
            this.speed = Math.random() * 2 + 0.6;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(((this.angle * Math.PI) / 360) * this.spin);
        ctx.drawImage(image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

const init = () => {
    for (let i = 0; i < numberofLenght; i++) {
        particleArray.push(new Particle());
    }
};
init();

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }

    requestAnimationFrame(animate);
};
animate();
