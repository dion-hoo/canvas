import { Branch } from './Branch.js';

export class Tree {
    constructor(ctx, x, y, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.branchs = [];
        this.depth = 10;
        this.color = color;

        this.cntDepth = 0;
        this.animation = null;

        this.init();
    }

    init() {
        for (let i = 0; i < this.depth; i++) {
            this.branchs.push([]);
        }
        this.createBranch(this.x, this.y, -90, 0);
        this.draw();
    }

    createBranch(startX, startY, angle, depth) {
        if (depth === this.depth) return false;

        const len = depth === 0 ? this.random(8, 10) : this.random(0, 10);
        const endX = startX + Math.cos(this.degToRan(angle)) * len * (this.depth - depth);
        const endY = startY + Math.sin(this.degToRan(angle)) * len * (this.depth - depth);

        this.branchs[depth].push(new Branch(startX, startY, endX, endY, this.depth - depth, this.color));

        this.createBranch(endX, endY, angle - this.random(10, 20), depth + 1);
        this.createBranch(endX, endY, angle + this.random(10, 20), depth + 1);
    }

    draw() {
        if (this.cntDepth === this.depth) {
            cancelAnimationFrame(this.animation);

            return false;
        }

        for (let i = this.cntDepth; i < this.branchs.length; i++) {
            let pass = true;
            for (let j = 0; j < this.branchs[i].length; j++) {
                pass = this.branchs[i][j].draw(this.ctx);
            }

            if (!pass) break;
            this.cntDepth++;
        }

        this.animation = requestAnimationFrame(this.draw.bind(this));
    }

    degToRan(degree) {
        return degree * (Math.PI / 180);
    }

    random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
}
