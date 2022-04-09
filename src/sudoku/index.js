const target = document.querySelector('.sudoku');
const li = document.createElement('li');
let tag = '';

const rows = [
    ['5', '3', '3', '', '7', '', '', '', ''],
    ['6', '', '', '1', '9', '5', '', '', ''],
    ['', '9', '8', '', '', '', '', '6', ''],
    ['8', '', '', '', '6', '', '', '', '3'],
    ['4', '', '', '8', '', '3', '', '', '1'],
    ['7', '', '', '', '2', '', '', '', '6'],
    ['', '', '', '', '', '', '2', '8', ''],
    ['', '6', '', '4', '1', '9', '', '', '5'],
    ['', '', '', '', '8', '', '', '7', '9'],
];

function Sudoku(rows) {
    const rowSet = new Set();
    const columnSet = new Set();
    const boxSet = new Set();

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows.length; j++) {
            const rowNumber = rows[i][j];
            const columnNumber = rows[j][i];
            const boxCharacter = rows[3 * Math.floor(i / 3) + Math.floor(j / 3)][((i * 3) % 9) + (j % 3)]; // 이부분 다시보기

            NumberCheck(rowNumber, rowSet);
            NumberCheck(columnNumber, columnSet);
            NumberCheck(boxCharacter, boxSet);

            tag += `<li>${rowNumber}</li>`;
        }

        rowSet.clear();
        columnSet.clear();
        boxSet.clear();
    }

    target.innerHTML = tag;

    function NumberCheck(number, setArray) {
        if (number !== '') {
            if (setArray.has(number)) return false;
            setArray.add(number);
        }
    }

    return true;
}

Sudoku(rows);
