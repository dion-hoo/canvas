let numberSelected = null;
let tileSelected = null;
let errors = 0;

const board = ['--74916-5', '2---6-3-9', '-----7-1-', '-586----4', '--3----9-', '--62--187', '9-4-7---2', '67-83----', '81--45---'];
const solution = ['3874916-5', '241568379', '569327418', '758619234', '123784596', '496253187', '924176852', '675832941', '812945763'];

const selectTile = (tile) => {
    if (numberSelected) {
        if (tile.innerText != '') {
            return;
        }

        let coord = tile.id.split('-');
        let row = parseInt(coord[0]);
        let col = parseInt(coord[1]);

        if (solution[row][col] === numberSelected.id) {
            tile.innerText = numberSelected.id;
        } else {
            errors += 1;
            document.querySelector('.errors').innerText = errors;
        }
    }
};

const selectNumber = (number) => {
    if (numberSelected != null) {
        numberSelected.classList.remove('number-selected');
    }
    numberSelected = number;
    numberSelected.classList.add('number-selected');
};

const setGame = () => {
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement('li');

        number.id = i;
        number.classList.add('number');
        number.innerText = i;
        number.addEventListener('click', () => selectNumber(number));

        document.querySelector('.digits').appendChild(number);
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let tile = document.createElement('li');

            tile.id = row.toString() + '-' + col.toString();

            if (board[row][col] != '-') {
                tile.innerText = board[row][col];
                tile.classList.add('defaultTile');
            }

            if (row === 2 || row === 5) {
                tile.classList.add('horizontal-line');
            }

            if (col === 2 || col === 5) {
                tile.classList.add('vertical-line');
            }

            tile.classList.add('tile');
            tile.addEventListener('click', () => selectTile(tile));

            document.querySelector('.sudoku').append(tile);
        }
    }
};

window.onload = () => {
    setGame();
};
