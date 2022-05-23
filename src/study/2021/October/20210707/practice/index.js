const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const ratio = window.devicePixelRatio;
const image = new Image();
const audio = new Audio();
let particle = [];
image.src = './img/boom.png';
audio.src = './sound/talk.mp3';

canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;

ctx.scale(ratio, ratio);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.frame = 0;
        this.timer = 0;
    }

    update() {
        this.timer++;
        if (this.timer % 5 === 0) {
            this.frame++;
            audio.currentTime = -1;
            audio.play();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(
            image,
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

const createAnimation = (event) => {
    const { x, y } = event;

    particle.push(new Particle(x, y));
};

canvas.addEventListener('click', (event) => {
    createAnimation(event);
});

// canvas.addEventListener('mousemove', (event) => {
//     createAnimation(event);
// });

const animate = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particle.length; i++) {
        particle[i].update();
        particle[i].draw();
        if (particle[i].frame > 5) {
            particle.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
};
animate();
