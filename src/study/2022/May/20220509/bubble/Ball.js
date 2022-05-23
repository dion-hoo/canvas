export class Bubble {
    constructor(angle, x, y) {
        this.x = x;
        this.y = y;
        this.radius = 50;
        this.mass = this.radius;
        this.speed = 10;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.gravity = 0.05;
        this.elasticity = 0.9;
        this.friction = 0.008;

        this.image = new Image();
        this.image.src = './bubble.png';
        this.isLoad = false;

        this.loaded();
    }

    loaded() {
        this.image.onload = () => {
            this.isLoad = true;
        };
    }

    collision(ball) {
        for (let b of ball) {
            if (b === this) continue;

            const dx = this.x - b.x;
            const dy = this.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // https://www.youtube.com/watch?v=Zdicf60eNzA

            if (distance < (this.radius / 2) * 2) {
                // 벡터를 정규화 한다. 크기를 1로 만든다.
                const normalize = {
                    x: dx / distance,
                    y: dy / distance,
                };
                const velocity = {
                    x: b.vx - this.vx,
                    y: b.vy - this.vy,
                };

                // 내적을 계산 한다. 두 벡터의 각도을 알기 위해서
                const dot = normalize.x * velocity.x + normalize.y * velocity.y;

                if (Math.floor(dot) < 0) {
                    return;
                }

                const impluse = (2 * dot) / (this.mass + b.mass);

                this.vx += impluse * b.mass * normalize.x;
                this.vy += impluse * b.mass * normalize.y;

                b.vx -= impluse * this.mass * normalize.x;
                b.vy -= impluse * this.mass * normalize.y;

                this.vy *= b.elasticity;
                b.vy *= this.elasticity;
            }
        }
    }

    update() {
        if (this.y + this.gravity < innerHeight) {
            this.vy += this.gravity;
        }

        this.vx -= this.vx * this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    bounce() {
        if (this.x - this.radius / 2 < 0) {
            this.x = this.radius / 2;
            this.vx *= -1;

            this.vy *= this.elasticity;
        }

        if (this.x + this.radius / 2 > innerWidth) {
            this.x = innerWidth - this.radius / 2;
            this.vx *= -1;

            this.vy *= this.elasticity;
        }

        if (this.y - this.radius / 2 < 0) {
            this.y = this.radius / 2;
            this.vy *= -1;

            this.vy *= this.elasticity;
        }

        if (this.y + this.radius / 2 > innerHeight) {
            this.y = innerHeight - this.radius / 2;
            this.vy *= -1;

            this.vy *= this.elasticity;
        }
    }

    draw(ctx) {
        if (this.isLoad) {
            ctx.drawImage(this.image, this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius);
        }
    }
}
