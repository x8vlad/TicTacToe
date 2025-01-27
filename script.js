let counter = 0;
let blockCells = document.querySelectorAll('.block div');
let header = document.getElementById('header');

function IsVictory() {
    const combos = [
        [0, 1, 2],
        [3, 4, 5], // horiz
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7], //vert
        [2, 5, 8],

        [0, 4, 8], // diagonal
        [2, 4, 6]
    ];

    for (const combo of combos) {
        const [a, b, c] = combo;
        if (
            blockCells[a].innerHTML !== '' &&
            blockCells[a].innerHTML === blockCells[b].innerHTML &&
            blockCells[b].innerHTML === blockCells[c].innerHTML
        ) {
            return true;
        }
    }
    return false;
}

function tap(event) {
    if (event.target.innerHTML !== '') return; // Не даём кликать по заполненным ячейкам

    if (counter % 2 === 0) {
        event.target.innerHTML = 'X';
    } else {
        event.target.innerHTML = '0';
    }

    if (IsVictory()) {
        for (const cell of blockCells) {
            cell.removeEventListener('click', tap);
        }
        header.innerText = counter % 2 === 0 ? "X is winner" : "0 is winner";
    } else if (counter === 8) {
        header.innerText = "Draw";
    }

    counter++;
    event.target.removeEventListener('click', tap); // Блокируем повторный клик на ячейке
}

function StartGame() {
    header.innerText = 'Tic Tac Toe';
    counter = 0;

    blockCells.forEach(cell => {
        cell.innerHTML = '';
        cell.addEventListener('click', tap);
    });
}

StartGame();
