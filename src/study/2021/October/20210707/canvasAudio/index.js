const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const ratio = window.devicePixelRatio;

canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;
ctx.scale(ratio, ratio);
let canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

class Expolsion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = './img/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 360;
        this.sound = new Audio();
        this.sound.src = 'sound/boom.wav';
    }

    update() {
        this.timer++;
        if (this.timer % 5 === 0) {
            this.frame++;
        }
        if (this.frame === 0) {
            this.sound.play();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frame,
            0,
            this.spriteWidth,
            this.spriteHeight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
    }
}

window.addEventListener('click', (event) => {
    createAnimate(event);
});

window.addEventListener('touchstart', (event) => {
    createAnimate(event);
});

// window.addEventListener('mousemove', (event) => {
//     createAnimate(event);
// });

function createAnimate() {
    const { x, y } = event;
    let positionX = x - canvasPosition.x;
    let positionY = y - canvasPosition.y;

    explosions.push(new Expolsion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}

animate();
