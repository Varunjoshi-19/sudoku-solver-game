const TIME = 10 * 1000; // 30 MINS
let timeoutId = null;
let intervalId = null;
let currentTime = TIME;



function updateTimer(timer) {
    currentTime = currentTime - 1000;
    const { min, sec } = formatTime();
    const minutes = min.toString().padStart(2, '0');
    const seconds = sec.toString().padStart(2, '0');

    timer.textContent = `${minutes}:${seconds}`;
    console.log(min, seconds);
}

function formatTime() {

    const sec = Math.floor((currentTime / 1000) % 60);
    const min = Math.floor(currentTime / 60 / 1000);

    return { min, sec };

}

export function startTimer(timer, stopGame) {

    intervalId = setInterval(() => {
        updateTimer(timer);
    }, 1000);

    clearAllTimes(stopGame);

}


export function stopTimer() {
    currentTime = TIME;
    clearInterval(intervalId);
    clearTimeout(timeoutId);

}


function clearAllTimes(stopGame) {


    timeoutId = setTimeout(() => {
        stopGame();
        clearInterval(intervalId);
        currentTime = TIME;
    }, TIME);

}



