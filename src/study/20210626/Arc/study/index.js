const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const ratio = 3;
const particleArray = [];
let hue = 0;

canvas.style.width = window.innerWidth;
canvas.style.height = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const image = new Image();
image.src = 'park.png';

const mouse = {
    x: null,
    y: null,
};

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 25 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const handleParticle = () => {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        for (let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            // if (distance < 100) {
            //     ctx.strokeStyle = particleArray[i].color;
            //     ctx.beginPath();
            //     ctx.lineWidth = 0.2;
            //     ctx.moveTo(particleArray[i].x, particleArray[i].y);
            //     ctx.lineTo(particleArray[j].x, particleArray[j].y);
            //     ctx.stroke();
            //     ctx.closePath();
            // }
        }

        // if (particleArray[i].size <= 0.3) {
        //     particleArray.splice(i, 1);
        //     i--;
        // }
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleParticle();
    hue += 0.55;

    requestAnimationFrame(animate);
};
animate();
