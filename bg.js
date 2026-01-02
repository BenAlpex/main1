document.addEventListener("mousemove", e => {
  document.querySelectorAll(".hex").forEach((h,i)=>{
    const x=(e.clientX/window.innerWidth-0.5)*20;
    const y=(e.clientY/window.innerHeight-0.5)*20;
    h.style.transform=`translate(${x}px,${y}px)`;
  });
});
