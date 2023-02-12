const numberButtons = document.querySelectorAll(".number-button");
const checkerButtons = document.querySelectorAll(".checker-button");
const ergebnisRow = document.querySelector("#ergebnis");
const checkerRow = document.querySelector("#checkDivision");
const numberDiv = document.querySelector("#number") ?? document.createElement("div");
const dividerDiv = document.querySelector("#divider") ?? document.createElement("div");
const resultDiv = document.querySelector("#result") ?? document.createElement("div");

let number;
let divider;
let result;

let isChecked = false;

ergebnisRow?.classList.add("hidden");
checkerRow?.classList.add("hidden");

for (let i = 0; i < numberButtons.length; i++) {
  const button = numberButtons[i];
  button.addEventListener("click", () => {
    console.log(i);
  });
}

checkerButtons[0].addEventListener("click", () => console.log("yes"));
checkerButtons[1].addEventListener("click", () => console.log("no"));

function newProblem(amountOfDigits = 2, biggestDivider = 9) {
  result = Math.round(Math.pow(10, amountOfDigits) * Math.random());
  divider = Math.ceil(biggestDivider * Math.random());
  number = result * divider;

  dividerDiv.textContent = `${divider}`;
  numberDiv.textContent = `${number}`;
}

newProblem();
