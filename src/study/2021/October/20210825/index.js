const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const pixel = window.devicePixelRatio;

canvas.width = window.innerWidth * pixel;
canvas.height = window.innerHeight * pixel;

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

ctx.scale(pixel, pixel);

let polygon = null;
let isDown = false;
let moveX = 0;
let offsetX = 0;

const PI2 = Math.PI * 2;
const polygons = [];
const COLORS = [
    '#4b45ab',
    '#554fb8',
    '#605ac7',
    '#2a91a8',
    '#2e9ab2',
    '#32a5bf',
    '#81b144',
    '#85b944',
    '#8fc549',
    '#e0af27',
    '#eeba2a',
    '#fec72e',
    '#bf342d',
    '#ca3931',
    '#d7423a',
];

class Polygon {
    constructor(x, y, radius, sides) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
    }

    draw(moveX) {
        ctx.save();

        const slide2 = 4;
        const angle = PI2 / this.sides;
        const angle2 = PI2 / slide2;

        ctx.translate(this.x, this.y);

        this.rotate += moveX * 0.009;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);

            i == 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);

            ctx.save();
            ctx.fillStyle = COLORS[i];
            ctx.translate(x, y);
            ctx.rotate((((360 / this.sides) * i + 45) * Math.PI) / 180);

            ctx.beginPath();
            for (let j = 0; j < slide2; j++) {
                const x2 = 30 * Math.cos(angle2 * j);
                const y2 = 30 * Math.sin(angle2 * j);

                j == 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
            }

            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        ctx.restore();
    }
}

const onDown = (e) => {
    isDown = true;
    moveX = 0;
    offsetX = e.clientX;
};

const onMove = (e) => {
    if (isDown) {
        moveX = e.clientX - offsetX;
        offsetX = e.clientX;
    }
};

const onUp = (e) => {
    isDown = false;
};

const regex = /[^0-9]/g;
const wWidth = Number(canvas.style.width.replace(regex, ''));
const wHeight = Number(canvas.style.height.replace(regex, ''));

polygon = new Polygon(wWidth / 2, wHeight - wHeight / 75, 190, 15);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveX *= 0.92;

    polygon.draw(moveX);

    requestAnimationFrame(animate);
};

animate();

canvas.addEventListener('pointerdown', onDown);
canvas.addEventListener('pointermove', onMove);
canvas.addEventListener('pointerup', onUp);
