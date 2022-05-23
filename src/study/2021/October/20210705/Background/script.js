const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const numberOfParticles = 50;
let particlesArray = [];
const pumpkin = new Image();
pumpkin.src = './img/park.png';

window.addEventListener('load', () => {
    ctx.drawImage(pumpkin, 0, 0);
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 20;
        this.speed = Math.random() * 1 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
        this.spriteSize = 900 / 3;
    }

    draw() {
        ctx.save(); //
        ctx.translate(this.x, this.y);
        // requestAnimationFrame에 켄버스가 this.x, this.y방향으로 계속 이동한다
        // 그래서 ctx.save()로 현재상태 저장하고 이동시키고, ctx.restore()로 계속 복원 해준다!!
        ctx.rotate(((this.angle * Math.PI) / 360) * this.spin);
        ctx.drawImage(pumpkin, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
    update() {
        if (this.y - this.size > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width - this.size;
            this.size = Math.random() * 10 + 50;
            this.speed = Math.random() * 2 + 0.6;
        }
        this.angle += 1;
        this.y += this.speed;
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
// init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}
// animate();
