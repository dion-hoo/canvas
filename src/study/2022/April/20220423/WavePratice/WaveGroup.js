import { Wave } from './Wave.js';

export class WaveGroup {
    constructor(width, height) {
        this.totlaPoints = 6;
        this.totalWaves = 3;
        this.color = ['rgba(255, 0, 0, 0.4)', 'rgba(255, 255, 0, 0.4)', 'rgba(0, 255, 255, 0.4)'];
        this.width = width;
        this.height = height;
        this.waves = [];

        this.init();
    }

    init() {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(i, this.totlaPoints, this.color[i], this.width, this.height);

            this.waves.push(wave);
        }
    }

    draw(ctx) {
        for (let w of this.waves) {
            w.draw(ctx);
        }
    }
}
