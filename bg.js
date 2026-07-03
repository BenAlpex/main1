const glow = document.getElementById("glow");

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  
  // Hareket edince glow büyüsün
  const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
  if (speed > 15) {
    glow.style.width = "700px";
    glow.style.height = "700px";
    setTimeout(() => {
      glow.style.width = "600px";
      glow.style.height = "600px";
    }, 200);
  }
});

// Card paralaks
document.addEventListener("mousemove", e => {
  document.querySelectorAll(".card").forEach((card, i) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    setTimeout(() => {
      card.style.setProperty('--x', x + 'px');
      card.style.setProperty('--y', y + 'px');
    }, i * 10);
  });
});
