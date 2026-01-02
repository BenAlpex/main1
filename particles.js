const c=document.getElementById("particles");
const ctx=c.getContext("2d");
resize();
window.onresize=resize;

let p=[];
for(let i=0;i<60;i++){
  p.push({
    x:Math.random()*c.width,
    y:Math.random()*c.height,
    vx:(Math.random()-.5)*.4,
    vy:(Math.random()-.5)*.4
  });
}

function resize(){
  c.width=innerWidth;
  c.height=innerHeight;
}

function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  p.forEach(o=>{
    o.x+=o.vx; o.y+=o.vy;
    if(o.x<0||o.x>c.width) o.vx*=-1;
    if(o.y<0||o.y>c.height) o.vy*=-1;
    ctx.fillStyle="rgba(0,255,156,.35)";
    ctx.fillRect(o.x,o.y,2,2);
  });
  requestAnimationFrame(draw);
}
draw();
