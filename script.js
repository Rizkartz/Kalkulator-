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
 
    else if (value === "sin") {
        display.value = String(Math.sin(parseFloat(display.value)));
    }
    else if (value === "cos") {
        display.value = String(Math.cos(parseFloat(display.value)));
    }
    else if (value === "tan") {
        display.value = String(Math.tan(parseFloat(display.value)));
    }
    else if (value === "ln") {
        display.value = String(Math.log(parseFloat(display.value)));
    }
    else if (value === "∛x") { // Akar pangkat 3
        display.value = String(Math.cbrt(parseFloat(display.value)));
    }
    else if (value === "Rad") {
        // Konversi angka (Derajat) menjadi Radian
        display.value = String(parseFloat(display.value) * (Math.PI / 180));
    }
    else if (value === "x!") {
        // Logika Faktorial (if 5! = 5x4x3x2x1)
        let n = parseInt(display.value);
        if (n < 0) {
            display.value = "Error"; // Faktorial ga bisa minus
        } else {
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            display.value = String(result);
        }
    }
    else if (value === "π") { // Simbol Phi
        // Munculin angka 3.14159... bla bla
        if (display.value === "0") {
            display.value = Math.PI;
        } else {
            display.value += Math.PI;
        }
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

            display.value = Math.round(result * 100000000) / 100000000; 
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
