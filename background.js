const canvas = document.getElementById('sparkle-canvas');
const ctx = canvas.getContext('2d');

let sparkles = [];
const sparkleCount = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createSparkle() {
  const colorOptions = [
    'rgba(255, 255, 255, OPACITY)',   // bright silver
    'rgba(200, 140, 255, OPACITY)',   // soft purple
    'rgba(220, 170, 255, OPACITY)'    // light violet
  ];
  const baseOpacity = Math.random() * 0.4 + 0.5; // 0.5–0.9
  const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
                 .replace('OPACITY', baseOpacity.toFixed(2));

  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1, // larger sparkles
    opacity: baseOpacity,
    color,
    speedY: Math.random() * 0.3 + 0.1,
    blink: Math.random() * 0.03 + 0.01
  };
}

function initSparkles() {
  sparkles = [];
  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push(createSparkle());
  }
}

function drawSparkles() {
  // dark background refresh
  ctx.fillStyle = '#0b0b0e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  sparkles.forEach(s => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.shadowColor = s.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = s.color;
    ctx.fill();
    ctx.restore();

    s.y += s.speedY;
    s.opacity += s.blink;

    if (s.opacity >= 1 || s.opacity <= 0.4) s.blink *= -1;

    if (s.y > canvas.height) {
      Object.assign(s, createSparkle());
      s.y = 0;
    }
  });

  requestAnimationFrame(drawSparkles);
}

// Resize handler
window.addEventListener('resize', () => {
  resizeCanvas();
  initSparkles();
});

// Initialize everything
resizeCanvas();
initSparkles();
drawSparkles();