const c = document.getElementById("particles");
const ctx = c.getContext("2d");
resize();
window.onresize = resize;

let mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Gri-Beyaz-Siyah tonları
const colors = [
  'rgba(255, 255, 255, 0.25)',
  'rgba(200, 200, 200, 0.2)',
  'rgba(150, 150, 150, 0.2)',
  'rgba(100, 100, 100, 0.2)',
  'rgba(50, 50, 50, 0.25)'
];

let particles = [];
for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - .5) * 0.3,
    vy: (Math.random() - .5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 2.5 + 1
  });
}

function resize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  // Partikülleri çiz
  particles.forEach(p => {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    // Mouse itme efekti
    if (dist < 150) {
      const force = (150 - dist) / 150;
      p.vx -= (dx / dist) * force * 0.04;
      p.vy -= (dy / dist) * force * 0.04;
    }

    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.995;
    p.vy *= 0.995;

    // Sınırlar
    if (p.x < 0 || p.x > c.width) p.vx *= -1;
    if (p.y < 0 || p.y > c.height) p.vy *= -1;

    // Glow ile çiz
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Çizgi bağlantıları
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      // Mesafeye göre çizgi opacity'si
      const maxDist = 120;
      if (dist < maxDist) {
        const opacity = 0.12 * (1 - dist / maxDist);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
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
