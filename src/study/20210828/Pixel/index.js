const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const image1 = new Image();
image1.src = './park.png';

const inputSlide = document.querySelector('#resolution');
const inputLabel = document.querySelector('#resolutionLabel');
inputSlide.addEventListener('change', handleSlider);

class Cell {
    constructor(x, y, symbol, color) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

class AsciiEffect {
    #imageCellarray = [];
    #pixels = [];
    #ctx;
    #width;
    #height;

    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
    }

    #convertToSymble(g) {
        if (g > 250) return '@';
        else if (g > 220) return '+';
        else if (g > 200) return '-';
        else if (g > 180) return '#';
        else if (g > 160) return '$';
        else if (g > 140) return '%';
        else if (g > 120) return '^';
        else if (g > 100) return '&';
        else if (g > 80) return '*';
        else if (g > 60) return '(';
        else return '';
    }

    #scanImage(cellSize) {
        this.#imageCellarray = [];

        for (let y = 0; y < this.#pixels.height; y += cellSize) {
            for (let x = 0; x < this.#pixels.width; x += cellSize) {
                const posX = x * 4;
                const posY = y * 4;
                const pos = posY * this.#pixels.width + posX; // 이해가 안됨

                if (this.#pixels.data[pos + 3] > 128) {
                    //  투명하지 않는지 판단하고 각각의 3개의 평균을 구한다
                    const red = this.#pixels.data[pos];
                    const green = this.#pixels.data[pos + 1];
                    const blue = this.#pixels.data[pos + 2];
                    const total = red + green + blue;
                    const averageColorValue = total / 3;
                    const color = `rgb(${red}, ${blue}, ${green})`;
                    const symbol = this.#convertToSymble(averageColorValue);

                    if (total > 200) {
                        this.#imageCellarray.push(new Cell(x, y, symbol, color));
                    }
                }
            }
        }
    }
    #drawAsccii() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);

        for (let i = 0; i < this.#imageCellarray.length; i++) {
            this.#imageCellarray[i].draw(this.#ctx);
        }
    }
    draw(cellSize) {
        this.#scanImage(cellSize);
        this.#drawAsccii();
    }
}

function handleSlider() {
    if (inputSlide.value < 3) {
        inputLabel.innerHTML = 'Original image';
        ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    } else {
        inputLabel.innerHTML = 'Resolution' + inputSlide.value + 'px';
        effect.draw(parseInt(inputSlide.value));
    }
}

let effect;
image1.onload = () => {
    canvas.width = image1.width;
    canvas.height = image1.height;

    effect = new AsciiEffect(ctx, canvas.width, canvas.height);

    handleSlider();
};
