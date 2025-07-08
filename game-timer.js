const TIME = 30 * 60 * 1000; // 30 MINS
let timeoutId = null;
let intervalId = null;
let currentTime = TIME;



function updateTimer(timer) {
    currentTime = currentTime - 1000;
    const { min, seconds } = formatTime();
    timer.textContent = `${min}:${seconds}`;
    console.log(min, seconds);
}

function formatTime() {

    const seconds = Math.floor((currentTime / 1000) % 60);
    const min = Math.floor(currentTime / 60 / 1000);

    return { min, seconds };

}

export function startTimer(timer) {

    intervalId = setInterval(() => {
        updateTimer(timer);
    }, 1000);

    clearAllTimes();

}


export function stopTimer(timer) {
    currentTime = TIME;
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    timer.textContent = "30:00";
}


function clearAllTimes() {


    timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        currentTime = TIME;
    }, TIME);

}



