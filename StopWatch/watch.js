let timer;
let seconds = 0, minutes = 0, hours = 0;
let isRunning = false;

function updateDisplay() {
    let display = document.getElementById("display");
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = `${h}:${m}:${s}`;
}

document.getElementById("start").addEventListener("click", function() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(function() {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
    }
});

document.getElementById("stop").addEventListener("click", function() {
    clearInterval(timer);
    isRunning = false;
});

document.getElementById("reset").addEventListener("click", function() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
});

updateDisplay();
