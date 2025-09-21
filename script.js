const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");


function handleInput(value) {
    if (value === "C" || value === "CE") {
        display.value = "0";
    } 
    else if (value === "⌫" || value === "Backspace") {

        display.value = display.value.slice(0, -1) || "0";
    } 
    else if (value === "=" || value === "Enter") {
        calculate();
    } 
    else if (value === "+/-") {
        display.value = String(-parseFloat(display.value));
    } 
    else if (value === "x²") {
        display.value = String(Math.pow(parseFloat(display.value), 2));
    } 
    else if (value === "√x") {
        display.value = String(Math.sqrt(parseFloat(display.value)));
    } 
    else if (value === "1/x") {
        display.value = String(1 / parseFloat(display.value));
    } 
    else if (value === "%") {

        display.value = String(parseFloat(display.value) / 100);
    } 
    else {

        if (display.value === "0" && value !== ".") {
            display.value = "";
        }
        display.value += value;
    }
}

function calculate() {
    try {

        const expression = display.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/");
            

        const result = new Function('return ' + expression)();

        if (isNaN(result) || !isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = result;
        }

    } catch {
        display.value = "Error";
    }
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    });
});


document.addEventListener("keydown", function(event) {
    const key = event.key;


    const keyMap = {
        "Enter": "=",
        "Backspace": "⌫",
        "Escape": "C",
        "*": "×",
        "/": "÷"
    };

    const allowedKeys = "0123456789.+-";

    if (allowedKeys.includes(key)) {
        handleInput(key);
    } else if (keyMap[key]) {
        handleInput(keyMap[key]);
    }

});
