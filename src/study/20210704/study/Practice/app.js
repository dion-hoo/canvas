import { Particle } from './particle.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', 'canvas');

        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        this.particleArray = [];

        const element = document.querySelector('.line');
        const measurements = element.getBoundingClientRect();
        this.line = {
            x: measurements.x,
            y: measurements.y,
            width: measurements.width,
            height: measurements.height,
        };
    }

    resize() {
        this.canvas.width = window.innerWidth * this.pixelRatio;
        this.canvas.height = window.innerHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        const element = document.querySelector('.line');
        const measurements = element.getBoundingClientRect();

        this.line = {
            x: measurements.x,
            y: measurements.y,
            width: measurements.width,
            height: measurements.height,
        };
    }

    draw() {
        const particleMaxNumber = 30;

        for (let i = 0; i < particleMaxNumber; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particleArray.push(new Particle(x, y));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particleArray.length; i++) {
            this.particleArray[i].update(this.canvas, this.line);
            this.particleArray[i].draw(this.ctx);
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    const app = new App();

    app.resize();
    app.draw();
    app.animate();
};
