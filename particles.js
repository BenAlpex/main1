const c = document.getElementById("particles");
const ctx = c.getContext("2d");
resize();
window.onresize = resize;

let mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const colors = [
  'rgba(108, 99, 255, 0.2)',
  'rgba(0, 212, 255, 0.15)',
  'rgba(255, 255, 255, 0.08)'
];

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - .5) * 0.3,
    vy: (Math.random() - .5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 2 + 1.5
  });
}

function resize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  particles.forEach(p => {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 150) {
      const force = (150 - dist) / 150;
      p.vx -= (dx / dist) * force * 0.04;
      p.vy -= (dy / dist) * force * 0.04;
    }

    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.995;
    p.vy *= 0.995;

    if (p.x < 0 || p.x > c.width) p.vx *= -1;
    if (p.y < 0 || p.y > c.height) p.vy *= -1;

    ctx.shadowBlur = 6;
    ctx.shadowColor = p.color;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Hafif bağlantı çizgileri
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < 100) {
        ctx.strokeStyle = `rgba(108, 99, 255, ${0.03 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();
