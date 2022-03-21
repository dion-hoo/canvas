import { Wave } from './Wave.js';

export class WaveGroup {
    constructor() {
        this.totalPoints = 6;
        this.waveGourp = 3;
        this.color = ['rgba(255, 0, 0, 0.4)', 'rgba(0, 0, 255, 0.4)', 'rgba(0, 255, 255, 0.4)'];
        this.waves = [];

        for (let i = 0; i < this.waveGourp; i++) {
            const wave = new Wave(i, this.totalPoints, this.color[i]);
            this.waves[i] = wave;
        }
    }

    resize(width, height) {
        for (let i = 0; i < this.waves.length; i++) {
            this.waves[i].resize(width, height);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.waves.length; i++) {
            this.waves[i].draw(ctx);
        }
    }
}
