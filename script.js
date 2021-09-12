"use strict";
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const newBtnEl = document.querySelector(".btn--new");
const rollBtnEl = document.querySelector(".btn--roll");
const holdBtnEl = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// State
let scores = [0, 0];
let activePlayer = 0;
let isPlayable = true;
let sum = 0;

function resetState() {
    scores = [0, 0];
    activePlayer = 0;
    isPlayable = true;
    sum = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    document.querySelector(`.player--0`).classList.add("player--active");

    holdBtnEl.disabled = false;
    rollBtnEl.disabled = false;
    diceEl.classList.add("hidden");

    isPlayable = true;
}

function generateRandomRoll() {
    return parseInt(Math.abs(Math.random() * 6)) + 1;
}

function displayDiceRoll(number) {
    if (diceEl.classList.contains("hidden")) {
        diceEl.classList.remove("hidden");
    }

    diceEl.src = `dice-${number}.png`;

    calculateScore(number);
}

function switchPlayer() {
    // Reset current player score to zero and display it.
    sum = 0;
    document.getElementById(`current--${activePlayer}`).textContent = sum;
    // Swap Player
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

function calculateScore(number) {
    if (number !== 1) {
        sum += number;
        document.getElementById(`current--${activePlayer}`).textContent = sum;
    } else {
        switchPlayer();
    }
    return sum;
}

function init() {
    displayDiceRoll(generateRandomRoll());
}

rollBtnEl.addEventListener("click", () => {
    if (isPlayable) init();
});

holdBtnEl.addEventListener("click", () => {
    scores[activePlayer] += sum;
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    if (scores[activePlayer] >= 40) {
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");

        holdBtnEl.disabled = true;
        rollBtnEl.disabled = true;
        diceEl.classList.add("hidden");

        isPlayable = false;
    } else {
        switchPlayer();
    }
});

newBtnEl.addEventListener("click", resetState);
