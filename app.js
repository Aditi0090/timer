document.getElementById("set-timer").addEventListener("click", function () {
    let hours = parseInt(document.getElementById("hours").value) || 0;
    let minutes = parseInt(document.getElementById("minutes").value) || 0;
    let seconds = parseInt(document.getElementById("seconds").value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please enter a valid time.");
        return;
    }

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    addTimer(totalSeconds);
});

let timers = [];

function addTimer(totalSeconds) {
    let timerId = Date.now();
    let timerObj = { id: timerId, remaining: totalSeconds, interval: null };

    let timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.setAttribute("data-id", timerId);
    timerElement.innerHTML = `
        <span class="time-display">${formatTime(totalSeconds)}</span>
        <button class="delete">Delete</button>
    `;

    document.getElementById("timers-list").appendChild(timerElement);

    timerObj.interval = setInterval(() => {
        timerObj.remaining--;
        if (timerObj.remaining >= 0) {
            timerElement.querySelector(".time-display").innerText = formatTime(timerObj.remaining);
        } else {
            clearInterval(timerObj.interval);
            timerElement.innerHTML = `
                <span class="timer-ended">Timer Is Up!</span>
                <button class="stop">Stop</button>
            `;
            document.getElementById("alarm-sound").play();
        }
    }, 1000);

    timers.push(timerObj);
}

document.getElementById("timers-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        let timerElement = e.target.parentElement;
        let timerId = timerElement.getAttribute("data-id");

        timers = timers.filter(timer => {
            if (timer.id == timerId) {
                clearInterval(timer.interval);
            }
            return timer.id != timerId;
        });

        timerElement.remove();
    } else if (e.target.classList.contains("stop")) {
        let timerElement = e.target.parentElement;
        timerElement.remove();
    }
});

function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
}
