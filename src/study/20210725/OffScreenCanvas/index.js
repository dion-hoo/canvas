const createCanvas = (width, height) => {
  const canvas = document.createElement("canvas");

  document.body.appendChild(canvas);

  canvas.width = width;
  canvas.height = height;

  canvas.ctx = canvas.getContext("2d");

  return canvas;
};

const myCanvas = createCanvas(256, 256);

myCanvas.ctx.fillStyle = "blue";
myCanvas.ctx.fillRect(0, 0, 256, 256);

// 지금 시점에서는 뭔가 많이 지원하는 브라우저가 없는거 같다..
