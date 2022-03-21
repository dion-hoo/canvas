import { Vector } from './Vector.js';
import { Player } from './Player.js';
import { Platform } from './Platform.js';
import { GenericObject } from './GenericObject.js';

import platfrom from '../img/platform.png';
import background from '../img/background.png';
import hills from '../img/hills.png';
import platformSmallTall from '../img/platformSmallTall.png';

import spriteRunLeft from '../img/spriteRunLeft.png';
import spriteRunRight from '../img/spriteRunRight.png';
import spriteStandLeft from '../img/spriteStandLeft.png';
import spriteStandRight from '../img/spriteStandRight.png';

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = window.devicePixelRatio;

canvas.width = canvasWidth * ratio;
canvas.height = canvasHeight * ratio;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

ctx.scale(ratio, ratio);

function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;

    return image;
}

const platform = createImage(platfrom);
const bg = createImage(background);
const hill = createImage(hills);
const platformSmall = createImage(platformSmallTall);
const standRight = createImage(spriteStandRight);
const standLeft = createImage(spriteStandLeft);
const runRight = createImage(spriteRunRight);
const runLeft = createImage(spriteRunLeft);

const images = [platform, bg, hill, platformSmall, standRight, runRight];
let isLoadedCount = 0;

for (let image of images) {
    image.onload = () => {
        isLoadedCount++;
        if (isLoadedCount === images.length) {
            onAllImageLoad();
        }
    };
}

let player, platforms, genericObject, scrollOffset, keys;

function init() {
    scrollOffset = 0;

    keys = {
        right: {
            pressed: false,
        },
        left: {
            pressed: false,
        },
    };

    const width = +canvas.style.width.replace('px', '');
    const height = +canvas.style.height.replace('px', '');

    player = new Player(width, height, standRight, 66, 150);

    platforms = [
        new Platform({
            x: platform.width * 4 + 300 - 2 + platformSmall.width,
            y: canvasHeight - platformSmall.height * 1.2,
            image: platformSmall,
        }),
        new Platform({
            x: -1,
            y: canvasHeight - platform.height,
            image: platform,
        }),
        new Platform({
            x: platform.width - 3,
            y: canvasHeight - platform.height,
            image: platform,
        }),
        new Platform({
            x: platform.width * 2 + 100,
            y: canvasHeight - platform.height,
            image: platform,
        }),
        new Platform({
            x: platform.width * 3 + 300,
            y: canvasHeight - platform.height,
            image: platform,
        }),
        new Platform({
            x: platform.width * 4 + 300 - 2,
            y: canvasHeight - platform.height,
            image: platform,
        }),
        new Platform({
            x: platform.width * 5 + 700 - 2,
            y: canvasHeight - platform.height,
            image: platform,
        }),
    ];

    genericObject = [new GenericObject({ x: -1, y: -1, image: bg }), new GenericObject({ x: -1, y: -1, image: hill })];
}

function onAllImageLoad() {
    init();
    const animte = () => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        genericObject.forEach((object) => {
            object.draw(ctx);
        });

        platforms.forEach((platform) => {
            platform.draw(ctx);
        });

        const gravity = new Vector(0, 2.6);

        // player
        player.applyForce(gravity);
        player.update();
        player.draw(ctx);

        // 이부분이 중요하다!! 꼼꼼히 다시 보기
        if (keys.right.pressed && player.position.x <= canvasWidth * 0.4) {
            player.velocity.x = player.speed;
        } else if (
            (keys.left.pressed && player.position.x > canvasWidth * 0.1) ||
            (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
        ) {
            player.velocity.x = -player.speed;
        } else {
            player.velocity.x = 0;

            if (keys.right.pressed) {
                scrollOffset += player.speed;

                genericObject.forEach((object) => {
                    object.position.x -= player.speed * 0.66;
                });

                platforms.forEach((platform) => {
                    platform.position.x -= player.speed;
                });
            } else if (keys.left.pressed && scrollOffset > 0) {
                scrollOffset -= player.speed;

                genericObject.forEach((object) => {
                    object.position.x += player.speed * 0.66;
                });

                platforms.forEach((platform) => {
                    platform.position.x += player.speed;
                });
            }
        }

        platforms.forEach((platform) => {
            if (
                player.position.y + player.imageCanvasHeight <= platform.position.y &&
                player.position.y + player.imageCanvasHeight + player.velocity.y >= platform.position.y &&
                player.position.x + player.imageCanvasWidth >= platform.position.x &&
                player.position.x <= platform.position.x + platform.width
            ) {
                player.velocity.y = 0;
            }
        });

        // win codition
        if (scrollOffset > platform.width * 5 + 700 - 2) {
            console.log('you win');
        }

        // lose condision
        if (player.position.y > canvasHeight) {
            init();
        }

        requestAnimationFrame(animte);
    };
    animte();
}

window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
        case 'ㅁ':
            keys.left.pressed = true;

            player.imageCanvasWidth = 128;
            player.cropWidth = 341;
            player.currentImage = runLeft;
            break;
        case 'd':
        case 'ㅇ':
            keys.right.pressed = true;

            player.imageCanvasWidth = 128;
            player.cropWidth = 341;
            player.currentImage = runRight;
            break;
        case 's':
        case 'ㄴ':
            break;
        case 'w':
        case 'ㅈ':
            player.velocity.y = -20;
            break;
    }
});

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
        case 'ㅁ':
            keys.left.pressed = false;

            player.imageCanvasWidth = 66;
            player.cropWidth = 177;
            player.currentImage = standLeft;
            break;
        case 'd':
        case 'ㅇ':
            keys.right.pressed = false;

            player.imageCanvasWidth = 66;
            player.cropWidth = 177;
            player.currentImage = standRight;
            break;
        case 's':
        case 'ㄴ':
            break;
        case 'w':
        case 'ㅈ':
            break;
    }
});
