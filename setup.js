document.getElementById('start-btn').addEventListener('click', () => {
  const input = document.getElementById('minutes-input');
  let minutes = parseInt(input.value, 10);
  
  if (isNaN(minutes) || minutes < 1) minutes = 1;
  if (minutes > 120) minutes = 120;

  localStorage.setItem('focus_duration', minutes);
  window.location.href = 'index.html';
});

document.getElementById('minutes-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('start-btn').click();
  }
});
