const FILL = 0;
const STROKE = 1;
const MEASURE = 2;

let renderType = FILL;
let maxSpaceSize = 3;
let minSpaceSize = 0.5;
let renderTextJustified = (ctx, text, x, y, width) => {
  let words,
    wordsWidth,
    count,
    spaces,
    spaceWidth,
    adjSpace,
    renderer,
    i,
    textAlign,
    useSize,
    totalWidth;

  textAlign = ctx.textAlign;
  ctx.textAlign = "left";
  wordsWidth = 0;
  words = text.split("").map((word) => {
    let w = ctx.measureText(word).width;
    wordsWidth += w;

    return {
      width: w,
      word,
    };
  });

  count = words.length;
  spaces = count - 1;
  spaceWidth = ctx.measureText("").width;
  adjSpace = Math.max(spaceWidth * minSpaceSize, (width - wordsWidth) / spaces);
  useSize = adjSpace > spaceWidth * maxSpaceSize ? spaceWidth : adjSpace;
  totalWidth = wordsWidth + useSize * spaces;

  if (renderType === MEASURE) {
    ctx.textAlign = textAlign;

    return totalWidth;
  }

  renderer =
    renderType === FILL ? ctx.fillText.bind(ctx) : ctx.strokeText.bind(ctx);

  switch (textAlign) {
    case "right":
      x -= totalWidth;
      break;

    case "end":
      x += width - totalWidth;
      break;

    case "center":
      x -= totalWidth / 2;
    default:
  }

  if (useSize === spaceWidth) {
    renderer(text, x, y);
  } else {
    for (i = 0; i < count; i++) {
      renderer(words[i].word, x, y);
      x += words[i].width;
      x += useSize;
    }
  }

  ctx.textAlign = textAlign;
};

const justifiedTextSettings = (settings) => {
  let min, max;
  let vetNumber = (num, defaultNum) => {
    num = num !== null && (num !== null) & !isNaN(num) ? num : defaultNum;
    if (num < 0) {
      num = defaultNum;
    }
    return num;
  };
  if (settings === undefined || settings === null) {
    return;
  }
  max = vetNumber(settings.maxSpaceSize, maxSpaceSize);
  min = vetNumber(settings.minSpaceSize, minSpaceSize);

  if (min > max) {
    return;
  }
  minSpaceSize = min;
  maxSpaceSize = max;
};

const fillJustifyText = (text, x, y, width, settings) => {
  justifiedTextSettings(settings);

  renderType = FILL;
  renderTextJustified(this, text, x, y, width);
};

const strokeJustifyText = (text, x, y, width, settings) => {
  justifiedTextSettings(settings);

  renderType = STROKE;
  renderTextJustified(this, text, x, y, width);
};

const measureJustifiedText = (text, width, settings) => {
  justifiedTextSettings(settings);

  renderType = MEASURE;
  return renderTextJustified(this, text, 0, 0, width);
};

CanvasRenderingContext2D.prototype.fillJustifyText = fillJustifyText;
CanvasRenderingContext2D.prototype.strokeJustifyText = strokeJustifyText;
CanvasRenderingContext2D.prototype.measureJustifiedText = measureJustifiedText;

const canvas = document.querySelector("canvs");
const ctx = canvas.getContext("2d");

ctx.fillJustifyText();
