const FILL = 0;
const STROKE = 1;
const MEASURE = 2;

let renderType = FILL;
let maxSpaceSize = 3;
let minSpaceSize = 0.5;
let renderTextJustified = (ctx, text, x, y, width) => {
    let words, wordsWidth, count, spaces, spacedWidth, adjSpace, renderer, i, textAlign, useSize, totalWidth;

    textAlign = ctx.textAlign;
    ctx.textAlign = 'left';
    wordsWidth = 0;
    words = text.split('').map((word) => {
        let w = ctx.measureText(word).width;

        wordsWidth += w;

        return {
            width: w,
            word,
        };
    });

    count = word.length;
    spaces = count - 1;
    spaceWidth = ctx.measureText('').width;
};
