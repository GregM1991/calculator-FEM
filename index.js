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
    this.previousOperand = this.currentOperand + " " + this.operation;
    this.currentOperand = "0";
    this.updateDisplay();
  }

  delete() {
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

let root = document.documentElement;
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
const themePickerBall = document.getElementById("ball");

const operatorBtns = [addBtn, subtractBtn, divisionBtn, timesBtn];

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => calculator.appendOperator(btn.innerText));
});

resetBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => calculator.delete());

intButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

equateBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

const purpleTheme = {
  "--text": "#f8e44c",
  "--previous-operand-text": "#c09300",
  "--secondary-text": "#fff",
  "--buttons-text": "#f8e44c",
  "--buttons": "#331b4d",
  "--buttons-shadow": "#83209a",
  "--buttons-shadow-darker": "#b741d1",
  "--secondary-button": "#56077c",
  "--secondary-button-shadow": "#b71beb",
  "--secondary-button-shadow-darker": "#d24bff",
  "--alternate-button": "#00decf",
  "--alternate-buttons-shadow": "#76f4f0",
  "--alternate-buttons-shadow-darker": "#b9fffd",
  "--body-background": "#17062a",
  "--calculator-background": "#1e0837",
  "--input-background": "#1e0837",
};

const blueTheme = {
  "--text": "#fff",
  "--previous-operand-text": "#ededed",
  "--secondary-text": "#fff",
  "--buttons-text": "#454a58",
  "--buttons": "#eae3db",
  "--buttons-shadow": "#b2a39b",
  "--buttons-shadow-darker": "#938177",
  "--secondary-button": "#647299",
  "--secondary-button-shadow": "#414e71",
  "--secondary-button-shadow-darker": "#2b385b",
  "--alternate-button": "#d03f30",
  "--alternate-buttons-shadow": "#a62d20",
  "--alternate-buttons-shadow-darker": "#851306",
  "--body-background": "#3b4664",
  "--calculator-background": "#252d44",
  "--input-background": "#181f33",
};

const whiteTheme = {
  "--text": "#37372b",
  "--previous-operand-text": "#5f5f4e",
  "--secondary-text": "#fff",
  "--buttons-text": "#37372b",
  "--buttons": "#e5e4e0",
  "--buttons-shadow": "#a79d94",
  "--buttons-shadow-darker": "#807468",
  "--secondary-button": "#388187",
  "--secondary-button-shadow": "#215e65",
  "--secondary-button-shadow-darker": "#0f454b",
  "--alternate-button": "#c85401",
  "--alternate-buttons-shadow": "#873901",
  "--alternate-buttons-shadow-darker": "#561d00",
  "--body-background": "#e6e6e6",
  "--calculator-background": "#d3cdcd",
  "--input-background": "#fff",
};

let currentTheme = 0;
const THEMES = ["purpleTheme", "blueTheme", "whiteTheme"];

themePickerBall.addEventListener("click", () => {
  currentTheme = currentTheme + 1;
  if (currentTheme === 3) {
    currentTheme = 0;
  }
  if (THEMES[currentTheme] === "purpleTheme") {
    for (const property in purpleTheme) {
      root.style.setProperty(property, purpleTheme[property]);
      themePickerBall.style.left = "5%";
    }
  } else if (THEMES[currentTheme] === "blueTheme") {
    for (const property in blueTheme) {
      root.style.setProperty(property, blueTheme[property]);
      themePickerBall.style.left = "calc(50% - 7px)";
    }
  } else if (THEMES[currentTheme] === "whiteTheme") {
    for (const property in whiteTheme) {
      root.style.setProperty(property, whiteTheme[property]);
      themePickerBall.style.left = "calc(95% - 13px)";
    }
  }
});

// const retrieveEquateArray = () => {
//   const regex = /\+|-|x|\//g;
//   let newCalc = [];
//   let tempNum = "";
//   const splitCurrentNumber = CURRENT_NUMBER.split("");
//   splitCurrentNumber.map((currentVal, i) => {
//     if (regex.test(currentVal)) {
//       newCalc = [...newCalc, tempNum, currentVal];
//       tempNum = "";
//     } else if (i + 1 === splitCurrentNumber.length) {
//       newCalc = [...newCalc, (tempNum += currentVal)];
//     } else {
//       tempNum += currentVal;
//     }
//   });
//   CURRENT_CALCULATION = newCalc;
// };
