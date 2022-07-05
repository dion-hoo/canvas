import { Vector } from './Vector.js';

export class Ball {
    constructor(x, y, radius) {
        this.location = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.radius = radius;
        this.friction = 0.035;
        this.player = false;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    collision(b2, ctx) {
        if (b2.location.sub(this.location).mag() <= this.radius + b2.radius) {
            b2.location
                .sub(this.location)
                .unit()
                .drawVec(ctx, this.width * 0.8, this.height * 0.8, 50, 'yellow');

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
        const res = dist.unit().mult(depth / 2); // 방향을 구해야하기 때문에 dist에서 단위벡터를 구해준다.

        this.location = this.location.add(res);
        b2.location = b2.location.add(res.mult(-1));
    }

    collisionBall(b2) {
        let normal = this.location.sub(b2.location).unit();
        let velocity = this.velocity.sub(b2.velocity);
        let sepVel = Vector.dot(velocity, normal);
        let new_sepVel = -sepVel;
        let sepVelVec = normal.mult(new_sepVel);

        this.velocity = this.velocity.add(sepVelVec);
        b2.velocity = b2.velocity.add(sepVelVec.mult(-1));
    }

    update() {
        this.acceleration = this.acceleration.unit();
        this.velocity = this.velocity.add(this.acceleration);
        this.location = this.location.add(this.velocity);

        this.velocity = this.velocity.mult(1 - this.friction);
    }

    bounce() {
        if (this.location.x - this.radius < 0) {
            this.velocity.x *= -1;
            this.location.x = this.radius;
        }
        if (this.location.x > innerWidth - this.radius) {
            this.velocity.x *= -1;
            this.location.x = innerWidth - this.radius;
        }

        if (this.location.y - this.radius < 0) {
            this.velocity.y *= -1;
            this.location.y = this.radius;
        }

        if (this.location.y > innerHeight - this.radius) {
            this.velocity.y *= -1;
            this.location.y = innerHeight - this.radius;
        }
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
