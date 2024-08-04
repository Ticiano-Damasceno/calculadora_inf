let teclas = document.querySelectorAll('#teclado > [data-number]');

let reset = false;
let operation = '';
let memory = Number.NaN;

let formatter = new Intl.NumberFormat('pt-BR', {maximumFractionDigits: 2});
function parseFormatter(value) {
    let number = value.replace(/\./g,'').replace(',','.')
    return number;
}

for (let i=0; i < teclas.length; i++){
    teclas[i].addEventListener('click', handleKeyPress);
};

function handleMathOperation(value, operator) {
    if (isNaN(memory)) {
        if (operator !== 'equal'){
            memory = Number(value);
            operation = operator;
            reset = true;
        };
    } else {
        let result = 0
        if (operation === '+') {
            result = Number(memory) + Number(value);
            operation = operator;
            reset = true;
        } else if (operation === '-') {
            result = Number(memory) - Number(value);
            operation = operator;
            reset = true;
        } else if (operation === '*') {
            result = Number(memory) * Number(value);
            operation = operator;
            reset = true;
        } else if (operation === '/') {
            result = Number(memory) / Number(value);
            operation = operator;
            reset = true;
        };
        if (operator === 'equal') {memory = Number.NaN} else {memory = result};
        
        return result;
    };
};

function handleKeyPress (event) {
    let element = event.target;
    let button_value = element.getAttribute('data-number');
    let display = document.getElementById('display');
    let value_display = parseFormatter(display.innerText);

    if (!display.innerText.includes(',') && button_value === ',') {
        display.innerText += ',';
    } else if (display.innerText === "0" && !isNaN(Number(button_value)) || reset && !isNaN(Number(button_value)) ){
        display.innerText = button_value;
        reset = false;
    } else if (isNaN(Number(button_value))){
        if (button_value === "AC") {
            memory = Number.NaN;
            display.innerText = "0";
        } else if (button_value === "CE") {
            if (value_display === "0") {memory = Number.NaN}
            display.innerText = "0";
        } else if (Number.isNaN(Number(memory))) {
            handleMathOperation(value_display, button_value);
        } else {
            display.innerText = formatter.format(handleMathOperation(value_display, button_value));
        }
    } else {
        if (display.innerText.indexOf(',') !== -1) {
            if (display.innerText.length - display.innerText.indexOf(',') <= 2){
                display.innerText = value_display + button_value;
                display.innerText = formatter.format(display.innerText);
            }
        } else {
            display.innerText = value_display + button_value;
            display.innerText = formatter.format(display.innerText);
        }
    };
};



