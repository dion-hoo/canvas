const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const ratio = window.devicePixelRatio;
canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;

let bubbles = [];

class Bubbles {
    constructor(color, speedY) {
        this.color = color;
        this.radius = Math.random() * 150 + 30;
        this.life = true;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * 20 + canvas.height + this.radius;

        this.vy = Math.random() * 0.0002 + 0.001 + speedY; // 거품이 위쪽으로 이동하는 속도
        this.vr = 0; // 반경속도

        this.vx = Math.random() * 4 - 2;
    }

    update() {
        this.vy += 0.00001;
        this.vr += 0.02;
        this.y -= this.vy;

        this.x += this.vx; // 좌우로 -2 ~ 2 왔다갔다한다

        if (this.radius > 1) {
            this.radius -= this.vr;
        }
        if (this.radius <= 1) {
            this.life = false;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const handleBubbles = () => {
    bubbles.push(new Bubbles('rgba(255, 255, 255', 1.4));

    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update();
        if (!bubbles[i].life) {
            bubbles.splice(i, 1);
        }
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleBubbles();
    console.log(bubbles);
    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].draw();
    }

    requestAnimationFrame(animate);
};

window.addEventListener('load', animate);
