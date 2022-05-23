import { WaveGroup } from './WaveGroup.js';

class App {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ratio = window.devicePixelRatio;
        this.waveGroup = new WaveGroup();

        this.resize();
        this.animate();
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.canvas.width = window.innerWidth * this.ratio;
        this.canvas.height = window.innerHeight * this.ratio;

        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';

        this.ctx.scale(this.ratio, this.ratio);

        this.waveGroup.resize(window.innerWidth, window.innerHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.waveGroup.draw(this.ctx);

        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};
