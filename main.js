// Getting the display elements
const lowerScreen = document.querySelector('.lower-screen');
const upperScreen = document.querySelector('.upper-screen');

// Function to update the lower screen
function updateLowerScreen(content) {
    lowerScreen.innerHTML = content;
}

function updateUpperScreen(content) {
    currentDisplay = content;
    upperScreen.innerHTML = currentDisplay;
}

// Variables to hold calculation data
let input1 = '';
let input2 = '';
let operator1 = 0;
let previousInput = '';
let operator = null;
let result = null;
let calculation = false;
let currentDisplay = '';
let decimalAdded = false; // to track if the decimal has been added

// Function to handle button and keyboard input
function handleInput(value) {
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

    if (numbers.includes(value)) {
        if (value == '.') {
            // Ensure that a decimal point is only added once per input
            if (!decimalAdded) {
                if (operator1 === 1) {
                    input2 += value;
                    decimalAdded = true;
                    currentDisplay = ` ${input1}  ${operator} ${input2}`;
                    updateUpperScreen(currentDisplay);
                } else {
                    input1 += value;
                    decimalAdded = true;
                    updateUpperScreen(input1);
                }
            }
        } else {
            if (operator1 == 1) {
                input2 += value;
                currentDisplay = ` ${input1}  ${operator} ${input2}`;
                updateUpperScreen(currentDisplay);
            } else {
                input1 += value;
                updateUpperScreen(input1);
            }
        }
    } else if (value === 'Clr') {
        window.location.reload();
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (calculation == false) {
            operator = value;
            currentDisplay = ` ${input1}  ${operator}`;
            operator1 = 1;
            decimalAdded = false; // Reset decimal for new input
            updateUpperScreen(currentDisplay);
        } else {
            input1 = result;
            operator = value;
            currentDisplay = ` ${input1}  ${operator}`;
            operator1 = 1;
            decimalAdded = false; // Reset decimal for new input
            updateUpperScreen(currentDisplay);
        }
    } else if (value === '=') {
        operator1 = false;
        calculate(value);
    }
}

// Event listener for button clicks
document.querySelectorAll('.buttons1 button').forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.textContent;
        handleInput(value);
    });
});

// Event listener for keyboard inputs
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9' || key === '.') {
        handleInput(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('Clr');
    }
});

function calculate(value) {
    if (operator && input1 && input2) {
        result = eval(` ${input1}  ${operator} ${input2}`);
        updateLowerScreen(result);
        calculation = true;
        input2 = '';
        operator1 = 0;
        decimalAdded = false; // Reset decimal for new calculation
    }
}
