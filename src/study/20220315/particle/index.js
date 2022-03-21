const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;

const particles = [];
let hue = 0;
let angle = 0;

function resize() {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
}

class Particle {
    constructor(x, y, hue, angle) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 10 + 1;
        this.vx = Math.sin(angle);
        this.vy = Math.cos(angle);
        this.hue = hue;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

const init = () => {
    window.addEventListener('mousemove', (e) => {
        const { pageX, pageY } = e;

        particles.push(new Particle(pageX, pageY, hue, angle));
    });
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particles) {
        particle.update();
        particle.draw(ctx);
    }

    hue++;
    angle++;

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);
resize();
init();
animate();
