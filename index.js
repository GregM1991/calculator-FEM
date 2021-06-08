console.log("hello world");

let INITIAL_NUMBER = 0;

let currentCalculation = INITIAL_NUMBER;

// Grab the input screen element
const intButtons = document.querySelectorAll(".int");
intButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn.innerText);
  });
});

// set the value of input to a currentNumber var
// add
//
