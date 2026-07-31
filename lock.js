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
  
  // Keep only the latest 2 lines visible to maintain a scrolling effect
  if (termEl.children.length > 2) {
    termEl.removeChild(termEl.firstChild);
  }
}, 2400);
