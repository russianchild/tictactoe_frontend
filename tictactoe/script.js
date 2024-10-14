const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player is X, computer is O
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameState[cellIndex] !== "" || !isGameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    checkResult();

    if (isGameActive) {
        computerMove();
    }
}

function computerMove() {
    const emptyCells = gameState.map((cell, index) => (cell === "") ? index : null).filter(index => index !== null);
    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellToFill = emptyCells[randomIndex];

    gameState[cellToFill] = "O";
    document.querySelector(`.cell[data-index='${cellToFill}']`).innerText = "O";

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerText = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
    board.innerHTML = '';
    createBoard();
}

createBoard();
statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
