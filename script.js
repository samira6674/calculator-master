import { updateHistory, historyData } from "./history.js";
const keys = document.querySelector(".buttons");
const display = document.querySelector("#display");
const show = document.querySelector("#show");
const numbers = {
  num1: "",
  num2: "",
};

let result = null;
let operand = null;
let displayValue = "0";
let isOperandSelected = false;
let isDotSelected = false;

function digit(num) {
  if (num == ".") {
    if (isDotSelected) {
      return;
    }
    isDotSelected = true;
  }
  //read it again
  if (result !== null) {
    result = null;
    numbers.num1 = "";
    numbers.num2 = "";
    numbers.num1 = num;
  } else if (isOperandSelected == true) {
    if (numbers.num2 == "" && num == ".") {
      numbers.num2 = "0.";
    } else {
      numbers.num2 += num;
    }
  } else {
    if (numbers.num1 == "" && num == ".") {
      numbers.num1 = "0.";
    } else {
      numbers.num1 += num;
    }
  }
  updateDisplay();
}

function operator(operation) {
  isDotSelected = false;
  if (result) {
    numbers.num1 = result;
    numbers.num2 = "";
    result = null;
  }

  if (isOperandSelected && result == null) {
    secondOperand();
  }

  if (operation === "numberPow2") {
    result = parseFloat(Math.pow(display.innerHTML, 2));
    show.innerHTML = `sqr(${display.innerHTML}) `;
  } else if (operation === "numberPow3") {
    result = parseFloat(Math.pow(display.innerHTML, 3));
    show.innerHTML = `sqr(${display.innerHTML}) `;
  } else if (operation === "radical") {
    result = parseFloat(Math.sqrt(display.innerHTML));
    show.innerHTML = `√(${display.innerHTML})`;
  } else if (operation === "1/x") {
    result = parseFloat(1 / display.innerHTML);
    show.innerHTML = `1/(${display.innerHTML})`;
  } else {
    show.innerHTML = numbers.num1 + operation;
    operand = operation;
    isOperandSelected = true;
  }
  updateDisplay();
}

function secondOperand() {
  let secondResult = null;
  switch (operand) {
    case "+": {
      secondResult = parseFloat(numbers.num1) + parseFloat(numbers.num2);
      break;
    }
    case "-": {
      secondResult = numbers.num1 - numbers.num2;
      break;
    }
    case "×": {
      secondResult = numbers.num1 * numbers.num2;
      break;
    }
    case "÷": {
      secondResult = numbers.num1 / numbers.num2;
      break;
    }
  }
  let item = `${numbers.num1} ${operand} ${numbers.num2}=<br> ${secondResult}`;
  historyData.push(item);
  //chera numbers.num1=secondResult?
  updateHistory();
  numbers.num1 = secondResult;
  numbers.num2 = "";
}

function resultNumber() {
  if (result) {
    numbers.num1 = result;
    result = "";
  }
  switch (operand) {
    case "+": {
      result = parseFloat(numbers.num1) + parseFloat(numbers.num2);
      break;
    }
    case "-": {
      result = numbers.num1 - numbers.num2;
      break;
    }
    case "×": {
      result = numbers.num1 * numbers.num2;
      break;
    }
    case "÷": {
      result = numbers.num1 / numbers.num2;
      break;
    }
  }
  show.innerHTML = numbers.num1 + operand + numbers.num2 + "=";
  isOperandSelected = false;
  updateDisplay();
  let item = show.innerHTML + "<br>" + display.innerHTML;
  historyData.push(item);
  updateHistory();
  console.log(historyData);
}

function percentOperation() {
  numbers.num2 = (numbers.num1 * numbers.num2) / 100;
  show.innerHTML += numbers.num2;
  updateDisplay();
}

function clearAll() {
  display.innerHTML = "0";
  show.innerHTML = "";
  numbers.num1 = "";
  numbers.num2 = "";
  isOperandSelected = false;
  isDotSelected = false;
  result = null;
  operand = null;

  //  what else is going on
}

function clearEntry() {
  if (isOperandSelected && result == null) {
    numbers.num2 = "";
    display.innerHTML = 0;
  } else {
    clearAll();
  }
}

function clearLastNumber() {
  if (isOperandSelected && numbers.num2 == "") {
  } else {
    display.innerHTML = display.innerHTML.substring(
      0,
      display.innerHTML.length - 1
    );
    if (numbers.num2 !== "") {
      numbers.num2 = display.innerHTML;
      if (display.innerHTML.length == "0") {
        display.innerHTML = "0";
      }
    } else {
      numbers.num1 = display.innerHTML;
      if (display.innerHTML.length == "0") {
        display.innerHTML = "0";
      }
    }
  }
}

function positiveNegative() {
  if (display.innerHTML.includes("-")) {
    display.innerHTML = display.innerHTML.replace("-", "");
  } else {
    display.innerHTML = "-" + display.innerHTML;
  }
  if (numbers.num2 !== "" && isOperandSelected == true) {
    //saved "-"+num
    numbers.num2 = display.innerHTML;
  } else {
    numbers.num1 = display.innerHTML;
  }
  updateDisplay();
}

function updateDisplay() {
  if (result !== null) {
    display.innerHTML = result;
  } else if (numbers.num2 !== "") {
    display.innerHTML = numbers.num2;
  } else {
    display.innerHTML = numbers.num1;
  }
}

keys.addEventListener("click", (event) => {
  const { target } = event;

  if (target.classList.contains("operator")) {
    operator(target.value);
  }

  if (target.classList.contains("clear-all")) {
    clearAll();
  }

  if (target.classList.contains("clear-entry")) {
    clearEntry();
  }

  if (target.classList.contains("positive-negative")) {
    positiveNegative();
  }

  if (target.classList.contains("clear-last-number")) {
    console.log("clear-last-number", target.value);
    clearLastNumber();
  }

  if (target.classList.contains("result")) {
    resultNumber();
  }

  if (target.classList.contains("number")) {
    digit(target.value);
  }

  if (target.classList.contains("percent")) {
    percentOperation();
  }
});
export { display, numbers, isOperandSelected };
