document.addEventListener("mousemove", e => {
  document.querySelectorAll(".cube").forEach((cube, i) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    cube.style.transform =
      `rotateX(${y}deg) rotateY(${x}deg)`;
  });
});
