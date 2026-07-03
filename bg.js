const c = document.getElementById("particles");
const ctx = c.getContext("2d");
resize();
window.onresize = resize;

let mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Farklı renklerde parçacıklar
const colors = ['#00f5ff', '#ff00e4', '#7000ff', '#00ff9c', '#ff6b00'];

let p = [];
for (let i = 0; i < 80; i++) {
  p.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - .5) * 0.6,
    vy: (Math.random() - .5) * 0.6,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 2 + 1,
    life: Math.random() * 100
  });
}

function resize() {
  c.width = innerWidth;
  c.height = innerHeight;
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  p.forEach(o => {
    let dx = mouse.x - o.x;
    let dy = mouse.y - o.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    // Mouse itme efekti
    if (dist < 150) {
      const force = (150 - dist) / 150;
      o.vx -= (dx / dist) * force * 0.3;
      o.vy -= (dy / dist) * force * 0.3;
    }

    // Hareket
    o.x += o.vx;
    o.y += o.vy;
    o.vx *= 0.99;
    o.vy *= 0.99;

    // Sınırlar
    if (o.x < 0 || o.x > c.width) o.vx *= -1;
    if (o.y < 0 || o.y > c.height) o.vy *= -1;

    // Glow efekti ile çiz
    const gradient = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.size * 4);
    gradient.addColorStop(0, o.color + 'cc');
    gradient.addColorStop(1, o.color + '00');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.size * 4, 0, Math.PI * 2);
    ctx.fill();

    // Çekirdek
    ctx.fillStyle = o.color;
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Parlama
    ctx.shadowBlur = 15;
    ctx.shadowColor = o.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Çizgi bağlantıları
  for (let i = 0; i < p.length; i++) {
    for (let j = i + 1; j < p.length; j++) {
      const dx = p[i].x - p[j].x;
      const dy = p[i].y - p[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < 120) {
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.08 * (1 - dist/120)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p[i].x, p[i].y);
        ctx.lineTo(p[j].x, p[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();
