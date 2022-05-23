const box = document.querySelector('.box');

const player = box.animate(
    [
        { color: 'red', transform: 'translate(0)' },
        { color: 'blue', transform: 'translate(100px, 100px)' },
    ],
    500
);

player.addEventListener('finish', function () {
    box.style.transform = 'translate(100px, 100px)';
});
