export class Ball {
    constructor(angle, x, y) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.mass = this.radius;
        this.max = 7;
        this.dx = Math.cos(angle) * this.max;
        this.dy = Math.sin(angle) * this.max;
        this.gravity = 0.05;
        this.elasticity = 0.5;
        this.friction = 0.008;
    }

    move() {
        if (this.y + this.gravity < innerHeight) {
            this.dy += this.gravity;
        }

        this.dx -= this.dx * this.friction;

        this.x += this.dx;
        this.y += this.dy;
    }

    ballHit(ball1, ball2) {
        let collision = false;

        const dx = ball1.x - ball2.x;
        const dy = ball1.y - ball2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= ball1.radius + ball2.radius) {
            collision = true;
        }

        return collision;
    }

    collide(index, cannonBalls) {
        let ball1 = cannonBalls[index];
        for (let i = index + 1; i < cannonBalls.length; i++) {
            let ball2 = cannonBalls[i];

            if (this.ballHit(ball1, ball2)) {
                this.collideBalls(ball1, ball2);
            }
        }
    }

    collideBalls(ball1, ball2) {
        let dx = ball2.x - ball1.x;
        let dy = ball2.y - ball1.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        let vCollisionNoramlize = {
            x: dx / distance,
            y: dy / distance,
        };
        let vRelativeVelocity = {
            x: ball1.dx - ball2.dx,
            y: ball1.dy - ball2.dy,
        };
        let speed = vRelativeVelocity.x * vCollisionNoramlize.x + vRelativeVelocity.y * vCollisionNoramlize.y;

        if (speed < 0) return;

        let impluse = (speed * speed) / (ball1.mass + ball2.mass);

        ball1.dx -= impluse * ball2.mass * vCollisionNoramlize.x;
        ball1.dy -= impluse * ball2.mass * vCollisionNoramlize.y;
        ball2.dx += impluse * ball1.mass * vCollisionNoramlize.x;
        ball2.dy += impluse * ball1.mass * vCollisionNoramlize.y;

        ball1.dy *= ball1.elasticity;
        ball2.dy *= ball2.elasticity;
    }

    bounce() {
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx *= -1;

            this.dy *= this.elasticity;
        }
        if (this.x + this.radius > innerWidth) {
            this.x = innerWidth - this.radius;
            this.dx *= -1;

            this.dy *= this.elasticity;
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy *= -1;

            this.dy *= this.elasticity;
        }
        if (this.y + this.radius > innerHeight) {
            this.y = innerHeight - this.radius;
            this.dy *= -1;

            this.dy *= this.elasticity;
        }
    }

    draw(ctx) {
        ctx.globalCompositeOperation = 'xor';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
