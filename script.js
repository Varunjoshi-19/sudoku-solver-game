import { generateSudoku } from "./generateSudoku.js"
import { startTimer, stopTimer } from "./game-timer.js";
const pickSound = new Audio("./audio/pick.mp3");
const putSound = new Audio("./audio/put-sound.mp3");
const errorSound = new Audio("./audio/err.mp3");


const selectLevel = document.getElementById("selectLevel");
const startButton = document.querySelector("[data-start]");
const resetButton = document.querySelector("[data-reset]");
const solveButton = document.querySelector("[data-solve]");
const checkButton = document.querySelector("[data-check]");
const timer = document.querySelector("[data-timer]");
const levelMap = new Map();
levelMap.set("easy", 20);
levelMap.set("medium", 30);
levelMap.set("hard", 35);

let LEVEL = "easy";
let checkSolution = false;
let gameStarted = false;

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let selectedNumber = null;

let solveGrid = generateSudoku();
let actualGeneratedBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
let dummyGameBoard = Array.from({ length: 9 }, () => Array(9).fill(''));




startButton.addEventListener("click", () => {
    if (!gameStarted) {
        startGame();
    }
});

resetButton.addEventListener("click", () => {
    if (gameStarted) {
        let resetConfirmation = confirm("Are you sure to reset the game???");
        if (resetConfirmation) {
            resetGame();
        }
    }
});

solveButton.addEventListener("click", () => {
    if (gameStarted) {
        solveSudoku();
        solveButton.disabled = true;
        solveButton.style.opacity = 0.5;
    }
});

checkButton.addEventListener("click", () => {

    verify();

})



function populateCells() {
    const board = document.querySelector('[data-board]');
    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {

            const eachBox = document.createElement('div');
            eachBox.classList.add("eachSmallBox");
            board.appendChild(eachBox);
            for (let k = 0; k < 3; k++) {

                for (let l = 0; l < 3; l++) {

                    createEachCell(i, j, k, l, eachBox);


                }

            }



        }

    }


}

function populateSelectNumbers() {
    const selectNumbers = document.querySelector('[data-select-numbers]');
    numbers.forEach(number => {
        const button = document.createElement('button');
        button.textContent = number;
        button.classList.add("number-button");
        button.addEventListener("click", function () {
            pickSound.play();
            selectedNumber = number;
            removePreviousButton();
            button.classList.add("buttonScale");

        });

        selectNumbers.appendChild(button);

    })
}

function removePreviousButton() {
    const buttonList = document.querySelectorAll(".buttonScale");
    buttonList.forEach(button => {
        button.classList.remove("buttonScale");
    })


}


function generateRandomBoardValues() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const randomValue = Math.floor(Math.random() * levelMap.get(selectLevel.value) + 1);
            if (randomValue < 9) {
                actualGeneratedBoard[i][j] = solveGrid[i][j];
                dummyGameBoard[i][j] = -1;
            }
            else {
                actualGeneratedBoard[i][j] = '';
                dummyGameBoard[i][j] = '';
            }
        }
    }

    populateCells();

}

function clearBoard() {
    const cells = document.querySelectorAll('.cell');
    const fixedCell = document.querySelectorAll(".fixedCell");
    const eachBox = document.querySelectorAll(".eachSmallBox");

    cells.forEach(cell => {
        cell.remove();
    });

    eachBox.forEach(box => {
        box.remove();
    });

    fixedCell.forEach(each => {
        each.remove();
    })
}

function resetGame() {

    stopTimer(timer);
    clearBoard();
    disableEverything();


}

function disableEverything() {
    gameStarted = false;
    document.querySelector('[data-select-numbers]').style.pointerEvents = "none";

    actualGeneratedBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    dummyGameBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
    selectedNumber = null;

    resetButton.disabled = true;
    resetButton.style.opacity = 0.5;
    resetButton.style.userSelect = "none";

    checkButton.disabled = true;
    checkButton.style.opacity = 0.5;
    checkButton.style.pointerEvents = "none";
    checkButton.style.userSelect = "none";

    startButton.disabled = false;
    startButton.style.opacity = 1;
    startButton.style.pointerEvents = "auto";
    startButton.style.userSelect = "auto";

    solveButton.style.opacity = 0.5;
    solveButton.style.pointerEvents = "none";
    solveButton.disabled = false;

    selectLevel.disabled = false;
    selectLevel.style.opacity = 1;
    selectLevel.style.pointerEvents = "auto";
    selectLevel.style.userSelect = "auto";




}

function gameOver() {

    document.querySelector('[data-select-numbers]').style.pointerEvents = "none";

    actualGeneratedBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    dummyGameBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
    selectedNumber = null;

    startButton.disabled = true;
    startButton.style.opacity = 0.5;
    startButton.style.pointerEvents = "none";
    startButton.style.userSelect = "none";

    solveButton.style.opacity = 0.5;
    solveButton.style.pointerEvents = "none";
    solveButton.disabled = true;

    checkButton.style.opacity = 0.5;
    checkButton.style.pointerEvents = "none";
    checkButton.disabled = true;


}


function startGame() {
    startTimer(timer);
    generateRandomBoardValues();

    gameStarted = true;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.add('active');
    });

    document.querySelector('[data-select-numbers]').style.pointerEvents = "auto";

    startButton.disabled = true;
    startButton.style.opacity = 0.5;
    startButton.style.pointerEvents = "none";
    startButton.style.userSelect = "none";

    resetButton.disabled = false;
    resetButton.style.opacity = 1;
    resetButton.style.pointerEvents = "auto";
    resetButton.style.userSelect = "auto"

    solveButton.style.opacity = 1;
    solveButton.style.pointerEvents = "auto";
    solveButton.disabled = false;


    selectLevel.style.opacity = 0.5;
    selectLevel.style.pointerEvents = "none";
    selectLevel.disabled = true;

    checkButton.style.opacity = 1;
    checkButton.style.pointerEvents = "auto";
    checkButton.disabled = false;

}

function solveSudoku() {

    clearDom();

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            if (dummyGameBoard[i][j] == -1) {
                continue;
            }
            else {
                document.querySelector(`[data-cell="${i}-${j}"]`).textContent = solveGrid[i][j];
            }

        }
    }

    gameOver();

}

function verify() {
    checkSolution = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.querySelector(`[data-cell="${i}-${j}"]`);
            const className = cell.className;

            const value = Number(cell.textContent);
            if (value == 0) {
                continue;
            }
            if (value != solveGrid[i][j]) {
                cell.style.backgroundColor = "rgba(254, 74, 74, 0.909)";

            }
            else if (value == solveGrid[i][j] && className == 'cell active') {
                cell.style.backgroundColor = "rgba(74, 254, 92, 0.91)";


            }
        }
    }

}


function clearDom() {

    if (!checkSolution) {
        return;
    }

    console.log("clear the dom because the you prervious check that solution");

    const allCells = document.querySelectorAll(".cell.active");

    allCells.forEach(each => {
        each.style.backgroundColor = "rgb(34,34,34)";
    })


}


function createEachCell(i, j, k, l, eachBox) {


    const cell = document.createElement('span');
    if (actualGeneratedBoard[i * 3 + k][j * 3 + l] == '') {
        cell.classList.add("cell");
    }
    else {
        cell.classList.add("fixedCell");
    }
    cell.setAttribute("data-cell", `${i * 3 + k}-${j * 3 + l}`);
    eachBox.appendChild(cell);

    cell.textContent = actualGeneratedBoard[i * 3 + k][j * 3 + l];
    cell.addEventListener("click", function () {

        if (selectedNumber != null && dummyGameBoard[i * 3 + k][j * 3 + l] != -1) {
            cell.textContent = `${selectedNumber}`;
            putSound.play();
            clearDom();
            cell.style.backgroundColor = "rgb(34, 34, 34)";
        }
        if (selectedNumber && dummyGameBoard[i * 3 + k][j * 3 + l] == -1) {
            errorSound.play();
            clearDom();
        }
    });

    cell.addEventListener("mouseenter", function () {
        if (cell.textContent == '') {
            cell.style.backgroundColor = "rgb(241, 241, 145)";
        }
    });

    cell.addEventListener("mouseleave", function () {
        if (cell.textContent == '') {
            cell.style.backgroundColor = "rgb(34, 34, 34)";
        }
    });

}




populateSelectNumbers();
