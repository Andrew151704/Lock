// ---- Matrix rain (Cyan variant) ----
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

    mCtx.fillStyle = "#33d1ff";
    mCtx.shadowBlur = 4;
    mCtx.shadowColor = "#33d1ff";
    mCtx.fillText(text, x, y);
    mCtx.shadowBlur = 0;

    if (y > mCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 40);

// ---- Cyber tracking eye (Cyan variant) ----
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
  grad.addColorStop(0, 'rgba(51, 209, 255, 0.10)');
  grad.addColorStop(1, 'transparent');
  eCtx.fillStyle = grad;
  eCtx.fillRect(0, 0, eCanvas.width, eCanvas.height);

  eCtx.beginPath();
  eCtx.ellipse(centerX, centerY, 140, 80, 0, 0, Math.PI * 2);
  eCtx.strokeStyle = 'rgba(51, 209, 255, 0.22)';
  eCtx.lineWidth = 2;
  eCtx.stroke();

  const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
  const dist = Math.min(42, Math.hypot(mouseX - centerX, mouseY - centerX) / 10);
  const pupilX = centerX + Math.cos(angle) * dist;
  const pupilY = centerY + Math.sin(angle) * dist;

  eCtx.beginPath();
  eCtx.arc(pupilX, pupilY, 30, 0, Math.PI * 2);
  eCtx.fillStyle = '#33d1ff';
  eCtx.shadowBlur = 18;
  eCtx.shadowColor = '#33d1ff';
  eCtx.fill();

  eCtx.beginPath();
  eCtx.arc(pupilX, pupilY, 13, 0, Math.PI * 2);
  eCtx.fillStyle = '#030405';
  eCtx.shadowBlur = 0;
  eCtx.fill();

  requestAnimationFrame(drawEye);
}
drawEye();
