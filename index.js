let INITIAL_NUMBER = 0;

let currentCalculation = [];

// Grab the input screen element
const input = document.querySelector(".input-screen");
const intButtons = document.querySelectorAll(".int");
const deleteBtn = document.getElementById("del");
const resetBtn = document.getElementById("reset");
const addBtn = document.getElementById("add");
const subtractBtn = document.getElementById("subtract");
const divisionBtn = document.getElementById("divide");
const timesBtn = document.getElementById("multiply");
const equateBtn = document.getElementById("equate");

const operatorBtns = [addBtn, subtractBtn, divisionBtn, timesBtn, timesBtn];

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentCalculation.push(btn.innerText);
    input.value = currentCalculation.join("");
  });
});

resetBtn.addEventListener("click", () => {
  currentCalculation = [];
  input.value = 0;
});

deleteBtn.addEventListener("click", () => {
  currentCalculation.pop();
  input.value = currentCalculation.join("");
});

intButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentCalculation.push(btn.innerText);
    input.value = currentCalculation.join("");
  });
});

// set the value of input to a currentNumber var
// add
//
