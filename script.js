const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// 1. Buat satu fungsi utama untuk menangani semua input
function handleInput(value) {
    if (value === "C" || value === "CE") {
        display.value = "0";
    } 
    else if (value === "⌫" || value === "Backspace") {
        // Gabungkan logika backspace di sini
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
        // Hati-hati, logika persen di kalkulator bisa beda-beda.
        // Ini versi sederhana: mengubah angka jadi persennya (50 -> 0.5)
        display.value = String(parseFloat(display.value) / 100);
    } 
    else {
        // Logika utama untuk menambahkan angka/operator
        if (display.value === "0" && value !== ".") {
            display.value = ""; // Hapus "0" jika input baru bukan titik
        }
        display.value += value;
    }
}

function calculate() {
    try {
        // Ganti simbol visual dengan operator yang bisa dievaluasi
        const expression = display.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/");
            
        // Gunakan new Function() sebagai alternatif eval() yang sedikit lebih aman
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

// 2. Event listener untuk klik tombol mouse
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    });
});

// 3. Event listener untuk keyboard
document.addEventListener("keydown", function(event) {
    const key = event.key;

    // Mapping tombol keyboard ke value yang dimengerti handleInput
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