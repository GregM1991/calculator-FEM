class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0") this.currentOperand = "";
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  appendOperator(operator) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operator;
    this.previousOperand = this.currentOperand + this.operation;
    this.currentOperand = "0";
    this.updateDisplay();
  }

  delete() {
    console.log(this.currentOperand.slice(0, -1));
    this.currentOperand = this.currentOperand.slice(0, -1);
    if (this.currentOperand === "") this.currentOperand = "0";
    this.updateDisplay();
  }

  updateDisplay() {
    currentOperandTextElement.innerText = this.currentOperand;
    previousOperandTextElement.innerText = this.previousOperand;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.previousOperand = "";
    this.operation = undefined;
  }
}

const calculator = new Calculator();

// Grab the input screen element
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");
const intButtons = document.querySelectorAll(".int");
const deleteBtn = document.getElementById("del");
const resetBtn = document.getElementById("reset");
const addBtn = document.getElementById("add");
const subtractBtn = document.getElementById("subtract");
const divisionBtn = document.getElementById("divide");
const timesBtn = document.getElementById("multiply");
const equateBtn = document.getElementById("equate");

const operatorBtns = [addBtn, subtractBtn, divisionBtn, timesBtn];

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => calculator.appendOperator(btn.innerText));
});

resetBtn.addEventListener("click", () => calculator.clear());

deleteBtn.addEventListener("click", () => calculator.delete());

intButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

equateBtn.addEventListener("click", () => {
  retrieveEquateArray();
  console.log(CURRENT_CALCULATION);
});

const retrieveEquateArray = () => {
  const regex = /\+|-|x|\//g;
  let newCalc = [];
  let tempNum = "";
  const splitCurrentNumber = CURRENT_NUMBER.split("");
  splitCurrentNumber.map((currentVal, i) => {
    if (regex.test(currentVal)) {
      newCalc = [...newCalc, tempNum, currentVal];
      tempNum = "";
    } else if (i + 1 === splitCurrentNumber.length) {
      newCalc = [...newCalc, (tempNum += currentVal)];
    } else {
      tempNum += currentVal;
    }
  });
  CURRENT_CALCULATION = newCalc;
};

const operatorSymbolAttacher = (operator, input) => {
  CURRENT_NUMBER = CURRENT_NUMBER + operator;
  input.value = CURRENT_NUMBER;
};
