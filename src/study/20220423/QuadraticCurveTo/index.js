const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    ctx.scale(ratio, ratio);
};

const init = () => {
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
};
const animate = () => {
    ctx.beginPath();

    let px = 100;
    let py = 300;

    ctx.moveTo(px, py);

    const ccx = (px + 300) / 2;
    const ccy = (py + 500) / 2;

    ctx.lineTo(ccx, ccy);
    console.log(ccx, ccy);

    px = 300;
    py = 500;

    const ccx2 = (px + 500) / 2;
    const ccy2 = (py + 200) / 2;

    ctx.lineTo(ccx2, ccy2);
    console.log(ccx2, ccy2);

    px = 500;
    py = 200;

    const ccx3 = (px + 700) / 2;
    const ccy3 = (py + 500) / 2;

    ctx.lineTo(ccx3, ccy3);
    console.log(ccx3, ccy3);

    ctx.stroke();
    ctx.closePath();

    // Curve
    ctx.beginPath();

    let kx = 100;
    let ky = 700;

    ctx.moveTo(kx, ky);

    const ckx = (kx + 300) / 2;
    const cky = (ky + 900) / 2;

    ctx.quadraticCurveTo(kx, ky, ckx, cky);

    kx = 300;
    ky = 900;

    const ckx2 = (kx + 500) / 2;
    const cky2 = (ky + 600) / 2;

    //ctx.lineTo(ckx2, cky2);

    ctx.quadraticCurveTo(kx, ky, ckx2, cky2);

    ctx.stroke();
    ctx.closePath();
};

resize();
init();
animate();

window.addEventListener('resize', resize);
