/* 杭州探索録3 Definitive Edition Ver.1.2 — AMBIENT TRAFFIC */
const TRAFFIC=[];
const TRAFFIC_COLORS=["#d9e3e7","#252d38","#70828e","#d5b85c","#9a4450"];
let trafficMapId=null;
function resetTraffic(){
  TRAFFIC.length=0; trafficMapId=currentMapId;
  const count=currentMapId==="westlake"?5:currentMapId==="oldtown"?7:10;
  for(let i=0;i<count;i++){
    const vertical=i%2===0;
    TRAFFIC.push({
      axis:vertical?"y":"x", x:vertical?(WORLD.width*.47+(i%3)*82):Math.random()*WORLD.width,
      y:vertical?Math.random()*WORLD.height:(WORLD.height*.43+(i%3)*82),
      dir:i%4<2?1:-1, speed:80+Math.random()*75,
      kind:i%5===0?"bus":i%4===0?"taxi":"car", color:TRAFFIC_COLORS[i%TRAFFIC_COLORS.length], phase:Math.random()*10
    });
  }
}
function updateTraffic(dt){
  if(scene!=="city")return; if(trafficMapId!==currentMapId)resetTraffic();
  for(const v of TRAFFIC){
    const speed=v.speed*(v.kind==="bus"?.72:1);
    if(v.axis==="y"){v.y+=speed*v.dir*dt;if(v.y>WORLD.height+180)v.y=-180;if(v.y<-180)v.y=WORLD.height+180;}
    else{v.x+=speed*v.dir*dt;if(v.x>WORLD.width+180)v.x=-180;if(v.x<-180)v.x=WORLD.width+180;}
    v.phase+=dt;
  }
}
function drawTrafficVehicle(v){
  const p=project(v.x,v.y,4),s=p.scale; const long=v.kind==="bus"?66:40,wide=v.kind==="bus"?25:21;
  ctx.save();ctx.translate(p.x,p.y);if(v.axis==="y")ctx.rotate(Math.PI/2);
  ctx.fillStyle="rgba(0,0,0,.28)";ctx.beginPath();ctx.ellipse(0,5*s,long*.55*s,wide*.55*s,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=v.kind==="taxi"?"#3fbe78":v.color;roundedRect(-long*.5*s,-wide*s,long*s,wide*s,5*s);ctx.fill();
  ctx.fillStyle="rgba(126,188,210,.55)";ctx.fillRect(-long*.2*s,-wide*.84*s,long*.4*s,wide*.38*s);
  if(v.kind==="bus"){ctx.fillStyle="rgba(177,220,232,.42)";for(let i=-2;i<=2;i++)ctx.fillRect(i*10*s-4*s,-wide*.72*s,7*s,7*s);}
  ctx.fillStyle=v.dir>0?"#fff2b0":"#ff5757";glow(ctx.fillStyle,7);ctx.fillRect((long*.5-4)*s,-wide*.62*s,3*s,4*s);ctx.fillRect((long*.5-4)*s,-wide*.12*s,3*s,4*s);noGlow();ctx.restore();
}
resetTraffic();
