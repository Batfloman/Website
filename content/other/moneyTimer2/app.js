const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const hDot = document.querySelector("#hDot");
const mDot = document.querySelector("#mDot");
const sDot = document.querySelector("#sDot");

const elapsedTimeKey = "elapsedTime";

const startTime = new Date(Date.now() - localStorage.getItem(elapsedTimeKey));

function updateTimer() {
  const elapsedTime = (Date.now() - startTime);

  const h = Math.floor( elapsedTime / 1000 / 60 / 60);
  const m = Math.floor( elapsedTime / 1000 / 60) % 60;
  const s = Math.floor( elapsedTime / 1000) % 60;

  hours.innerText = h < 10 ? "0" + h : h;
  minutes.innerText = m < 10 ? "0" + m : m;
  seconds.innerText = s < 10 ? "0" + s : s;

  hDot.style.setProperty("--angle", 360 / 24 * h);
  mDot.style.setProperty("--angle", 360 / 60 * m);
  sDot.style.setProperty("--angle", 360 / 60 * s);

  localStorage.setItem(elapsedTimeKey, elapsedTime);
  window.requestAnimationFrame(updateTimer);
}

window.requestAnimationFrame(updateTimer);