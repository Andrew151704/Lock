// ---- Status ticker ----
const statuses = [
  "Focus session active…",
  "Notifications silenced…",
  "Deep work mode: on…",
  "Please don't close this window…",
  "Andrew will be right back…"
];
let statusIdx = 0;
const statusEl = document.getElementById('status-text');
setInterval(() => {
  statusIdx = (statusIdx + 1) % statuses.length;
  statusEl.style.opacity = '0';
  setTimeout(() => {
    statusEl.textContent = statuses[statusIdx];
    statusEl.style.opacity = '1';
  }, 200);
}, 3400);

// ---- Countdown timer (reads from localStorage with fallback) ----
const storedMinutes = localStorage.getItem('focus_duration');
const SESSION_MINUTES = storedMinutes ? parseInt(storedMinutes, 10) : 25;
let remaining = SESSION_MINUTES * 60;
const timerEl = document.getElementById('timer');

function renderTimer() {
  const m = Math.floor(remaining / 60).toString().padStart(2, '0');
  const s = Math.floor(remaining % 60).toString().padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
}
renderTimer();

const timerInterval = setInterval(() => {
  if (remaining > 0) {
    remaining--;
    renderTimer();
  } else {
    timerEl.textContent = "DONE";
    clearInterval(timerInterval);
    window.location.href = "screensaver.html";
  }
}, 1000);

// ---- Automated background work terminal simulator ----
const workLogs = [
  "Compiling source modules...",
  "Running background diagnostic checks...",
  "Optimizing neural weights...",
  "Syncing secure socket streams...",
  "Parsing automated test suites...",
  "Executing background data pipeline...",
  "Memory allocation stable (0x7FFF)...",
  "Encrypting local cache partitions..."
];
let logIdx = 0;
const termEl = document.getElementById('terminal-logs');

setInterval(() => {
  if (!termEl) return;
  logIdx = (logIdx + 1) % workLogs.length;
  const line = document.createElement('span');
  line.className = 'term-line';
  line.textContent = `> ${workLogs[logIdx]}`;
  termEl.appendChild(line);
  
  if (termEl.children.length > 2) {
    termEl.removeChild(termEl.firstChild);
  }
}, 2400);

// ---- Matrix rain ----
const mCanvas = document.getElementById('matrix');
const mCtx = mCanvas.getContext('2d');
const glyphs = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let columns, drops;

function setupMatrix() {
  mCanvas.width = window.innerWidth;
  mCanvas.height = window.innerHeight;
  const fontSize = 16;
  columns = Math.floor(mCanvas.width / fontSize);
  drops = new Array(columns).fill(0).map(() => Math.random() * -50);
}
setupMatrix();
window.addEventListener('resize', setupMatrix);

function drawMatrix() {
  mCtx.fillStyle = "rgba(3, 4, 5, 0.08)";
  mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);

  const fontSize = 16;
  mCtx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = glyphs[Math.floor(Math.random() * glyphs.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    mCtx.fillStyle = "#00ff9c";
    mCtx.shadowBlur = 4;
    mCtx.shadowColor = "#00ff9c";
    mCtx.fillText(text, x, y);
    mCtx.shadowBlur = 0;

    if (y > mCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 40);

// ---- Cyber tracking eye ----
const eCanvas = document.getElementById('eye-canvas');
const eCtx = eCanvas.getContext('2d');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function resizeEye() {
  eCanvas.width = window.innerWidth;
  eCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeEye);
resizeEye();

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawEye() {
  eCtx.clearRect(0, 0, eCanvas.width, eCanvas.height);

  const centerX = eCanvas.width / 2;
  const centerY = eCanvas.height / 2;

  const grad = eCtx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 350);
  grad.addColorStop(0, 'rgba(0, 255, 156, 0.10)');
  grad.addColorStop(1, 'transparent');
  eCtx.fillStyle = grad;
  eCtx.fillRect(0, 0, eCanvas.width, eCanvas.height);

  eCtx.beginPath();
  eCtx.ellipse(centerX, centerY, 140, 80, 0, 0, Math.PI * 2);
  eCtx.strokeStyle = 'rgba(0, 255, 156, 0.22)';
  eCtx.lineWidth = 2;
  eCtx.stroke();

  const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
  const dist = Math.min(42, Math.hypot(mouseX - centerX, mouseY - centerX) / 10);
  const pupilX = centerX + Math.cos(angle) * dist;
  const pupilY = centerY + Math.sin(angle) * dist;

  eCtx.beginPath();
  eCtx.arc(pupilX, pupilY, 30, 0, Math.PI * 2);
  eCtx.fillStyle = '#00ff9c';
  eCtx.shadowBlur = 18;
  eCtx.shadowColor = '#00ff9c';
  eCtx.fill();

  eCtx.beginPath();
  eCtx.arc(pupilX, pupilY, 13, 0, Math.PI * 2);
  eCtx.fillStyle = '#030405';
  eCtx.shadowBlur = 0;
  eCtx.fill();

  requestAnimationFrame(drawEye);
}
drawEye();

// ---- Hidden unlock sequence ----
const SECRET = "andrew";
let __buf = "";
window.addEventListener("keydown", (e) => {
  if (e.key.length !== 1) return;
  __buf += (e.key.toLowerCase());
  if (__buf.length > SECRET.length) __buf = __buf.slice(-SECRET.length);
  if (__buf === SECRET) {
    __buf = "";
    window.location.href = "setup.html";
  }
});
