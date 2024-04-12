const digitsContainer = document.querySelector(".options-and-digits");

function addDigits() {
  for (let i = 9; i > -1; i--) {
    const digit = document.createElement("button");
    digit.classList.add("digit");
    digit.setAttribute("id", i);
    digit.textContent = i;
    digitsContainer.appendChild(digit);
  }
  const dot = document.createElement("button");
  dot.classList.add("digit");
  dot.textContent = ".";
  dot.setAttribute("id", ".");
  digitsContainer.appendChild(dot);
}

addDigits();

const currentNumber = document.querySelector("#number");
const fullOperation = document.querySelector("#full-operation");

function operate(first, operator, second) {
  if (operator === "+") {
    return first + second
  }

  if (operator === "-") {
    return first - second
  }

  if (operator === "*") {
    return first * second
  }

  if (operator === "/") {
    return first / second
  }
}

const allDigits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");

let current = "firstNumber";
let firstNumber = "";
let operatorValue = "";
let secondNumber = "";
let calculationPending = false;
let keyboardPress = false;
let displayValue = ''

function addOperator(varValue) {
  if (calculationPending) {
    firstNumber = operate(
      Number(firstNumber),
      operatorValue,
      Number(secondNumber)
    );
    fullOperation.textContent += "=" + " " + firstNumber + " ";
    currentNumber.textContent = firstNumber;
    secondNumber = "";
  }
  operatorValue = varValue;
  fullOperation.textContent += operatorValue + " ";
}

function addNumber(varValue) {
  if (operatorValue == "") {
    firstNumber += varValue;
    currentNumber.textContent = firstNumber;
  } else {
    secondNumber += varValue;
    currentNumber.textContent = secondNumber;
    calculationPending = true;
  }

  displayValue = firstNumber + " " + operatorValue + " " + secondNumber + " ";
  fullOperation.textContent = displayValue

}

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    addOperator(operator.id);
  });
});

function clickEqual () {
  if (firstNumber !== "" && operatorValue !== "" && secondNumber !== "") {
    firstNumber = operate(
      Number(firstNumber),
      operatorValue,
      Number(secondNumber)
    );
    currentNumber.textContent = firstNumber;
    fullOperation.textContent += '=' + ' ' + firstNumber + ' '
    operatorValue = "";
    secondNumber = "";
    calculationPending = false;
  }
}

window.addEventListener("keypress", (e) => {
  if (!isNaN(e.key)) {
    addNumber(e.key);
  }

  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    addOperator(e.key);
  }

  if (e.key === '=' || e.key === 'Enter') {
    clickEqual()
  }
});

function undoInput () {
  if (operatorValue == "") {
    firstNumber = firstNumber.slice(0, -1);
    displayValue = displayValue.replace(firstNumber, firstNumber.slice(0, -1));
    fullOperation.textContent = displayValue
    currentNumber.textContent = firstNumber;
  } else {
    secondNumber = secondNumber.slice(0, -1);
    displayValue = displayValue.replace(secondNumber, secondNumber.slice(0, -1));
    fullOperation.textContent = displayValue
    currentNumber.textContent = secondNumber;
  }
}
 
window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    undoInput()
  }
});

const undoButton = document.querySelector('#undo')

undoButton.addEventListener('click', () => {
  undoInput()
})

allDigits.forEach((digit) => {
  digit.addEventListener("click", () => {
    addNumber(digit.id);
  });
});

equal.addEventListener("click", () => {
  clickEqual()
});

const clearButton = document.querySelector("#clear-button");

clearButton.addEventListener("click", () => {
  array = [];
  firstNumber = "";
  secondNumber = "";
  operatorValue = "";
  currentNumber.textContent = "";
  fullOperation.textContent = "";
});

const negateButton = document.querySelector('#negate')

negateButton.addEventListener('click', () => {
  displayValue = displayValue * -1
  currentNumber.textContent = displayValue
  fullOperation.textContent = displayValue
})