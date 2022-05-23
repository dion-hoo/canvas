let audio = new Audio(
);
const autioCtx = new AudioContext();

// console.log(autioCtx);

// button.addEventListener('click', () => {
//     audio.play();
//     audio.addEventListener('playing', () => {
//         console.log('Audio started playing!');
//     });
//     audio.addEventListener('ended', () => {
//         console.log('Audio ended!');
//     });
// });

// const button2 = document.querySelector('#button2');

// button2.addEventListener('click', playSound);
// function playSound() {
//     const oscillator = autioCtx.createOscillator();
//     oscillator.connect(autioCtx.destination);
//     oscillator.type = 'sine';
//     oscillator.start();
//     setTimeout(() => {
//         oscillator.stop();
//     }, 1000);
// }

const container = document.querySelector('.container');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

canvas.width = window.innerWidth;
canvas.width = window.innerHeight;

container.addEventListener('click', () => {
    audio.play();
    audioSource = autioCtx.createMediaElementSource(audio);
    analyser = autioCtx.createAnalyser();
    audioSource.connect(analyser);
    audioSource.connect(autioCtx.destination);
    analyser.fftSize = 64;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
});