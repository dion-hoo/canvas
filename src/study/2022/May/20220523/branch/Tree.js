import { Branch } from './Branch.js';
import { degreeToRadian, Random } from './util.js';

export class Tree {
    constructor() {
        this.depth = 10;
        this.animation = null;
    }

    init() {
        this.branch = [];

        for (let i = 0; i < this.depth; i++) {
            this.branch.push([]);
        }

        this.createBranch(this.width / 2, this.height, -90, 0);
    }

    resize(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.init();
    }

    createBranch(startX, startY, angle, depth) {
        if (depth === this.depth) return;

        const len = depth === 0 ? Random(8, 10) : Random(0, 11);
        const endX = startX + Math.cos(degreeToRadian(angle)) * len * (this.depth - depth);
        const endY = startY + Math.sin(degreeToRadian(angle)) * len * (this.depth - depth);

        this.branch[depth].push(new Branch(startX, startY, endX, endY, this.depth - depth));

        this.createBranch(endX, endY, angle + Random(10, 15), depth + 1);
        this.createBranch(endX, endY, angle - Random(10, 15), depth + 1);
    }

    draw() {
        for (let i = 0; i < this.branch.length; i++) {
            let isFinish;
            for (let j = 0; j < this.branch[i].length; j++) {
                this.branch[i][j].draw(this.ctx);

                isFinish = this.branch[i][j].result;
            }
            if (!isFinish) {
                break;
            }

            if (i === this.branch.length - 1) {
                cancelAnimationFrame(this.animation);
            }
        }

        this.animation = requestAnimationFrame(this.draw.bind(this));
    }
}
