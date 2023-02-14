"use strict";
const gridWidth = 25; // defined as 25
const cellSize = window.innerWidth / gridWidth;
const gridHeight = Math.floor(window.innerHeight / cellSize);
let number;
let result;
let divider;
function newProblem(maxDigits = 2, maxDividerValue = 9) {
    result = Math.floor(Math.pow(10, maxDigits) * Math.random());
    divider = Math.floor(Math.random() * maxDividerValue) + 1;
    number = result * divider;
}
