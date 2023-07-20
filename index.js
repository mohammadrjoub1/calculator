// Get the calculator elements
const resultElement = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "0";
let previousNumber = null;
let operator = null;

// Function to update the result display
function updateDisplay() {
    resultElement.value = currentNumber;
}

// Function to handle number button clicks
function handleNumberClick(number) {
    if (currentNumber === "0" || currentNumber === "-0") {
        currentNumber = number.toString();
    } else {
        currentNumber += number.toString();
    }
    updateDisplay();
}

// Function to handle decimal button click
function handleDecimalClick() {
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
        updateDisplay();
    }
}

// Function to handle operator button clicks
function handleOperatorClick(op) {
    if (operator !== null) {
        performCalculation();
    }
    previousNumber = parseFloat(currentNumber);
    operator = op;
    currentNumber = "0";
}

// Function to perform the calculation
function performCalculation() {
    const num1 = previousNumber;
    const num2 = parseFloat(currentNumber);

    switch (operator) {
        case "+":
            currentNumber = (num1 + num2).toString();
            break;
        case "-":
            currentNumber = (num1 - num2).toString();
            break;
        case "*":
            currentNumber = (num1 * num2).toString();
            break;
        case "/":
            currentNumber = (num1 / num2).toString();
            break;
    }

    operator = null;
    updateDisplay();
}

// Function to handle clear button click
function handleClearClick() {
    currentNumber = "0";
    previousNumber = null;
    operator = null;
    updateDisplay();
}

// Function to handle equal button click
function handleEqualClick() {
    if (operator !== null) {
        performCalculation();
        previousNumber = null;
        operator = null;
    }
}

// Add event listeners to the number buttons
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const buttonValue = this.textContent;

        if (!isNaN(buttonValue) || buttonValue === "-") {
            handleNumberClick(buttonValue);
        } else if (buttonValue === ".") {
            handleDecimalClick();
        } else if (buttonValue === "=") {
            handleEqualClick();
        } else if (buttonValue === "C") {
            handleClearClick();
        } else {
            handleOperatorClick(buttonValue);
        }
    });
});
