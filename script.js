let teclas = document.querySelectorAll("#teclado > [data-number]");
let elementDisplay = document.getElementById("display");

let reset = false;
let operation = "";
let memory = Number.NaN;
let formatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 });

function parseFormatter(value) {
    let number = value.replace(/\./g, "").replace(",", ".");
    return number;
}
function inputDisplayNumber(dataNumber) {
    let display = document.getElementById("display").innerText;
    let value_display = parseFormatter(display);
    let hasDecimal = display.indexOf(",") !== -1;
    let decimalSize = display.length - display.indexOf(",");
    if (display === "0" || reset) {
        elementDisplay.innerText = dataNumber;
        reset = false;
    } else {
        if (display.length < 22) {
            if ((hasDecimal && decimalSize <= 4) || !hasDecimal) {
                elementDisplay.innerText = formatter.format(
                    value_display + dataNumber
                );
            }
        }
    }
}

function inputDisplayNotNumber(dataNumber) {
    let display = document.getElementById("display").innerText;
    let value_display = parseFormatter(display);
    let hasDecimal = display.indexOf(",") !== -1;

    if (dataNumber === "," && !hasDecimal) {
        elementDisplay.innerText = value_display + dataNumber;
    } else if (dataNumber === "AC") {
        memory = Number.isNaN;
        elementDisplay.innerText = "0";
    } else if (dataNumber === "CE") {
        if (display === "0") {
            memory = Number.isNaN;
        }
        elementDisplay.innerText = "0";
    } else {
        handleMathOperation(Number(value_display), dataNumber);
    }
}

function inputDisplayResult(value) {
    if (
        value < 1000000000000000000 &&
        !Number.isNaN(value) &&
        Number.isFinite(value)
    ) {
        elementDisplay.innerText = formatter.format(value);
    } else {
        elementDisplay.innerText = "Error";
    }
}

function handleMathOperation(value, operator) {
    let isMemoryNumber = !isNaN(Number(memory));

    reset = true;

    if (!isMemoryNumber) {
        if (operator !== "=") {
            memory = value;
            operation = operator;
        }
    } else {
        let result = 0;
        if (operation === "+") {
            result = memory + value;
        } else if (operation === "-") {
            result = memory - value;
        } else if (operation === "*") {
            result = memory * value;
        } else if (operation === "/") {
            result = memory / value;
        }
        memory = result;
        operation = operator;

        if (operator === "=") {
            memory = Number.NaN;
        }

        inputDisplayResult(result);
    }
}
function handleKeyPress(event) {
    let button_value = event.target.getAttribute("data-number");
    let isNumberButton = !isNaN(Number(button_value));

    if (isNumberButton) {
        inputDisplayNumber(button_value);
    } else {
        inputDisplayNotNumber(button_value);
    }
}

for (let i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener("click", handleKeyPress);
}
