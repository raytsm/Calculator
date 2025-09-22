
let buffer = '0';
let runningTotal = 0;
let previousOperator = null;

const screen = document.querySelector('.calc-display');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender()
}

function handleNumber(number) {
    if (buffer === '0') {
        buffer = number;
    } else {

        buffer += number;
    }
    
}

function handleMath(value) {
    if (buffer === 0) {
        return; //do nothing
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function flushOperation (intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case '/':
            runningTotal /= intBuffer;
            break;
        case '*':
            runningTotal *= intBuffer;
            break;
    }
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            break;
        case '=':
            if (previousOperator === null) {
                return; // no math needed
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length == 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length-1)
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
    }
}

function init() {
    document
        .querySelector(".calculator")
        .addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
        })
}

function rerender() {
    screen.innerText = buffer;
}

init()