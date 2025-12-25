// script.js
// 1) Replace YOUR_CPA_GRIP_LINK with your final CPA Grip link.
// 2) Optionally add tracking params to that link on the CPA Grip side.

const FINAL_URL = "https://singingfiles.com/show.php?l=0&u=2480508&id=72846"; // <-- paste your CPA Grip URL here

const statuses = [...document.querySelectorAll(".status")];
const barFill = document.getElementById("barFill");
const progressText = document.getElementById("progressText");
const percentEl = document.getElementById("percent");
const continueBtn = document.getElementById("continueBtn");
const retryBtn = document.getElementById("retryBtn");

let timers = [];

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

function setProgress(pct, text) {
  const v = Math.max(0, Math.min(100, pct));
  barFill.style.width = v + "%";
  percentEl.textContent = v + "%";
  if (text) progressText.textContent = text;
}

function setStatus(i, mode, label) {
  const el = statuses[i];
  el.dataset.status = mode; // pending | work | ok
  el.textContent = label;
}

function resetUI() {
  statuses.forEach(s => {
    s.dataset.status = "pending";
    s.textContent = "Pending";
  });
  continueBtn.disabled = true;
  setProgress(0, "Starting…");
}

function runChecks() {
  clearTimers();
  resetUI();

  // Step 1
  timers.push(setTimeout(() => {
    setStatus(0, "work", "Checking…");
    setProgress(18, "Checking device…");
  }, 250));

  timers.push(setTimeout(() => {
    setStatus(0, "ok", "OK");
    setProgress(38, "Device supported");
  }, 1150));

  // Step 2
  timers.push(setTimeout(() => {
    setStatus(1, "work", "Checking…");
    setProgress(52, "Checking region…");
  }, 1450));

  timers.push(setTimeout(() => {
    setStatus(1, "ok", "OK");
    setProgress(72, "Region supported");
  }, 2400));

  // Step 3
  timers.push(setTimeout(() => {
    setStatus(2, "work", "Checking…");
    setProgress(84, "Checking connection…");
  }, 2650));

  timers.push(setTimeout(() => {
    setStatus(2, "ok", "OK");
    setProgress(100, "All checks completed");
    continueBtn.disabled = false;
  }, 3600));
}

continueBtn.addEventListener("click", () => {
  // Basic guard so you don't accidentally launch with placeholder
  if (!FINAL_URL || FINAL_URL.includes("https://singingfiles.com/show.php?l=0&u=2480508&id=72846")) {
    alert("https://singingfiles.com/show.php?l=0&u=2480508&id=72846");
    return;
  }
  window.location.href = FINAL_URL;
});

retryBtn.addEventListener("click", runChecks);

// Auto start
runChecks();
