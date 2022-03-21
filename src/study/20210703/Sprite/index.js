const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = './img/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % 4; // 각각 스프라이트 이미지 길이 만큼 프레임이 길어진다!!

    //    frameX = spriteWidth * position;

    ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();

const draw = () => {};
