const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = canvas.width / 2;
        this.y = 200;
        this.weight = 5;
        this.size = 30;
        this.speed = 0.3;
        this.floor = 0;
    }

    update() {
        if (this.y + this.size > canvas.height) {
            this.y -= 9;
            this.weight *= -0.6;
            this.floor++;
        }
        if (this.floor > 16) {
            this.y = canvas.height - this.size;
        } else {
            this.weight += 0.05;
            this.y += this.weight;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }
}

const particle = new Particle();

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particle.update();
    particle.draw();

    requestAnimationFrame(animate);
};

animate();
