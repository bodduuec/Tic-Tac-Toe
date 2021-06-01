const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
let circleTurn = false;

function startGame() {
    resetData();
    addClickEvents();
}

function resetData() {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
    });
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    board.classList.add(X_CLASS);
    document.querySelector('.winning-message-popup').classList.remove('show');
}

function addClickEvents() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });
    document.querySelector('.restart-button').removeEventListener('click', startGame);
    document.querySelector('.restart-button').addEventListener('click', startGame);
}

function handleClick(event) {
    const cell = event.target;
    fillCell(cell);
    if(checkWin()){
        showMessage('win');
    } else if(checkDraw()){
        showMessage('draw');
    } else {
        circleTurn = !circleTurn;
    }
}

function fillCell(cell) {
    cell.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS);
    board.classList.remove(circleTurn ? CIRCLE_CLASS : X_CLASS);
    board.classList.add(!circleTurn ? CIRCLE_CLASS : X_CLASS);
}

function checkWin() {
    return WIN_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(circleTurn ? CIRCLE_CLASS : X_CLASS);
        });
    });
}

function showMessage(msg) {
    document.querySelector('.winning-message-popup').classList.add('show');
    if(msg === 'win') {
        document.querySelector('.winning-message').innerHTML = `${circleTurn ? "CIRCLE'S" : "X's"} WIN`;
    } else {
        document.querySelector('.winning-message').innerHTML = `DRAW`;
    }
}

function checkDraw() {
    let draw = true;
    cells.forEach(cell => {
        if(!cell.classList.contains(CIRCLE_CLASS) && !cell.classList.contains(X_CLASS)){
            draw = false;
            return;
        }
    });
    return draw;
}

startGame();