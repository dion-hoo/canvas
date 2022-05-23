import { Branch } from './branch.js';

export class Tree {
    constructor(ctx) {
        this.ctx = ctx;
        this.depth = 9;
        this.currentDepth = 0;
        this.branch = [];
        this.angle = 0;
        this.time = 0;
        this.animation = null;
        this.init();
    }

    init() {
        for (let i = 0; i < this.depth; i++) {
            this.branch.push([]);
        }
        this.createBranch(innerWidth / 2, innerHeight, -90, 0);
        this.draw();
    }

    createBranch(startX, startY, angle, depth) {
        if (this.depth === depth) return false;

        const length = depth === 0 ? this.random(10, 15) : this.random(0, 11);
        const endX = startX + Math.cos(this.degreeToRadian(angle)) * length * (this.depth - depth);
        const endY = startY + Math.sin(this.degreeToRadian(angle)) * length * (this.depth - depth);

        this.branch[depth].push(new Branch(startX, startY, endX, endY, this.depth - depth));

        this.createBranch(endX, endY, angle + this.random(10, 25), depth + 1);
        this.createBranch(endX, endY, angle - this.random(10, 25), depth + 1);
    }

    draw() {
        if (this.currentDepth === this.depth) {
            cancelAnimationFrame(this.animation);
            return false;
        }

        for (let i = this.currentDepth; i < this.branch.length; i++) {
            let pass = true;
            for (let j = 0; j < this.branch[i].length; j++) {
                pass = this.branch[i][j].draw(this.ctx);
            }
            if (!pass) break;
            this.currentDepth++;
        }

        this.animation = requestAnimationFrame(this.draw.bind(this));
    }

    degreeToRadian(dgree) {
        return dgree * (Math.PI / 180);
    }

    random(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}
