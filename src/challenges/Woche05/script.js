const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");

const timerElement = document.getElementById("timer");

const lapContainerElement = document.getElementById("lapContainer");

let elapsedMs = 0;
let intervalId = null;
let lapCount = 0;

pauseBtn.style.display = "none";
resetBtn.disabled = true;
lapBtn.disabled = true;

lapBtn.addEventListener("click", createLap);

startBtn.addEventListener("click", timerStart);
pauseBtn.addEventListener("click", timerPause);

resetBtn.addEventListener("click", timerReset);

function renderTime() {
  const minutes = Math.floor(elapsedMs / 60000);
  const seconds = Math.floor((elapsedMs % 60000) / 1000);
  const miliseconds = elapsedMs % 1000;

  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  const ms = String(miliseconds).padStart(3, "0").slice(0, 2);

  timerElement.textContent = `${m}:${s}:${ms}`;
}

function createLap() {
  document.getElementById("lapSection").style.display = "flex";
  console.log("Lap trigger");
  lapCount++;
  const lapContainer = document.createElement("div");
  lapContainer.innerHTML = `<div class="lap-number" id="lapNumber">${lapCount}</div>
            <span id="lapTime">${timerElement.textContent}</span>`;
  lapContainerElement.appendChild(lapContainer);
}

function timerStart() {
  if (intervalId != null) return;
  intervalId = setInterval(() => {
    elapsedMs += 10;
    renderTime();
  }, 10);
  startBtn.style.display = "none";
  pauseBtn.style.display = "flex";
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function timerPause() {
  if (intervalId == null) return;
  clearInterval(intervalId);
  intervalId = null;
  startBtn.style.display = "flex";
  pauseBtn.style.display = "none";
}

function timerReset() {
  if (intervalId != null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  document.getElementById("lapSection").style.display = "none";

  elapsedMs = 0;
  renderTime();

  lapCount = 0;
  lapContainerElement.innerHTML = "";
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}
