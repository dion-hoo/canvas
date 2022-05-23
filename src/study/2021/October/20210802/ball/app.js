import { Ball } from './ball.js';
import { Block } from './block.js';

class App {
    constructor() {
        // canvas make
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // apppend
        document.body.appendChild(this.canvas);

        // resize event
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 30, 10);
        this.block = new Block(700, 30, 300, 450);

        this.animate();
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);

        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};
