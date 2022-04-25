import { Wave } from './Wave.js';

export class WaveGroup {
    constructor() {
        this.totalPoints = 6;
        this.totalWaves = 3;
        this.color = ['rgba(255, 0, 0, 0.4)', 'rgba(0, 255, 0, 0.4)', 'rgba(0, 0,255, 0.4)'];
    }

    resize(width, height) {
        this.waves = [];
        this.width = width;
        this.height = height;

        for (let i = 0; i < this.totalWaves; i++) {
            this.waves.push(new Wave(i, this.totalPoints, this.color[i]));

            this.waves[i].resize(this.width, this.height);
        }
    }

    draw(ctx) {
        for (let w of this.waves) {
            w.draw(ctx);
        }
    }
}
