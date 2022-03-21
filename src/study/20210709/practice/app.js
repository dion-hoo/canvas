import { Bubble } from './bubble.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');

        document.body.appendChild(this.canvas);
        this.canvas.setAttribute('id', 'canvas');

        this.ctx = this.canvas.getContext('2d');
        this.ratio = window.devicePixelRatio > 1 ? 2 : 1;

        this.bubble = [];
        this.resize();

        window.addEventListener('resize', this.resize.bind(this));
        window.requestAnimationFrame(this.animate.bind(this));
    }
    resize() {
        this.canvas.width = window.innerWidth * this.ratio;
        this.canvas.height = window.innerHeight * this.ratio;
    }

    draw() {
        this.bubble.push(new Bubble('rgba(255, 255, 255)', 1.5));

        for (let i = 0; i < this.bubble.length; i++) {
            this.bubble[i].update();
            if (!this.bubble[i].life) {
                this.bubble.splice(i, 1);
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw();
        for (let i = 0; i < this.bubble.length; i++) {
            this.bubble[i].draw(this.ctx);
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.addEventListener('load', () => {
    new App();
});
