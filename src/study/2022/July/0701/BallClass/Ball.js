import { Vector } from './Vector.js';

export class Ball {
    constructor(x, y, radius) {
        this.location = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.radius = radius;
        this.friction = 0.1;
        this.player = false;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    collsiion(b2) {
        if (b2.location.sub(this.location).mag() <= this.radius + b2.radius) {
            return true;
        } else {
            return false;
        }
    }

    resolution(b2) {
        // 충돌할때는 b2 - b1를 뺴주었다. 즉 벡터의 방향은 b1 -> b2이고
        // 그 반발력으로 움직여야하기 때문에
        // b1 - b2를 해주어야만, 벡터의 방향이 충동방향과 반대인 b2 -> b1이 되기 때문이다.
        const dist = this.location.sub(b2.location);
        const depth = this.radius + b2.radius - dist.mag();
        const res = dist.unit().mult(depth / 2);

        this.location = this.location.add(res);
        b2.location = b2.location.add(res.mult(-1));
    }

    update() {
        this.acceleration = this.acceleration.unit();
        this.velocity = this.velocity.add(this.acceleration);
        this.location = this.location.add(this.velocity);

        this.velocity = this.velocity.mult(1 - this.friction);
    }

    display(ctx) {
        this.velocity.drawVec(ctx, this.width * 0.8, this.height * 0.8, 10, 'red');
        this.acceleration.unit().drawVec(ctx, this.width * 0.8, this.height * 0.8, 50, 'green');
        this.acceleration.normal().drawVec(ctx, this.width * 0.8, this.height * 0.8, 50, 'deeppink');

        ctx.beginPath();
        ctx.strokeStyle = '#fff';
        ctx.arc(this.width * 0.8, this.height * 0.8, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        this.acceleration.mult(0);
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
