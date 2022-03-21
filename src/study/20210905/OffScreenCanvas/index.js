const canvas = document.querySelector('canvas');
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker('worker.js');

worker.postMessage({ canvas: offscreen }, [offscreen]);
