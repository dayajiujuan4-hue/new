/* Ver.3.0 — production movement/camera controller */
player.vx=0;player.vy=0;player.visualX=player.x;player.visualY=player.y;player.animTime=0;player.footPhase=0;player.facingX=0;player.facingY=1;
const MOVE={max:238,accel:1350,decel:1700,turn:11};
function approach(v,target,delta){return v<target?Math.min(v+delta,target):Math.max(v-delta,target)}
updatePlayer=function(dt){
  let ix=0,iy=0;
  if(keys["w"]||keys["arrowup"])iy--; if(keys["s"]||keys["arrowdown"])iy++;
  if(keys["a"]||keys["arrowleft"])ix--; if(keys["d"]||keys["arrowright"])ix++;
  let l=Math.hypot(ix,iy); if(l){ix/=l;iy/=l}
  const targetX=ix*MOVE.max,targetY=iy*MOVE.max;
  const a=l?MOVE.accel:MOVE.decel;
  player.vx=approach(player.vx,targetX,a*dt);player.vy=approach(player.vy,targetY,a*dt);
  const sp=Math.hypot(player.vx,player.vy);player.moving=sp>18;
  if(l){
    player.facingX=lerp(player.facingX,ix,1-Math.exp(-MOVE.turn*dt));
    player.facingY=lerp(player.facingY,iy,1-Math.exp(-MOVE.turn*dt));
    if(Math.abs(player.facingX)>.42&&Math.abs(player.facingY)>.42)player.direction=(player.facingY<0?"up":"down")+(player.facingX<0?"left":"right");
    else if(Math.abs(player.facingX)>Math.abs(player.facingY))player.direction=player.facingX<0?"left":"right";
    else player.direction=player.facingY<0?"up":"down";
  }
  const dx=player.vx*dt,dy=player.vy*dt;
  if(scene==="city"){
    const nx=player.x+dx;if(!cityBlocked(nx,player.y))player.x=clamp(nx,22,WORLD.width-22);else player.vx*=.15;
    const ny=player.y+dy;if(!cityBlocked(player.x,ny))player.y=clamp(ny,22,WORLD.height-22);else player.vy*=.15;
  }else{
    const nx=player.x+dx;if(!interiorBlocked(nx,player.y))player.x=nx;else player.vx*=.15;
    const ny=player.y+dy;if(!interiorBlocked(player.x,ny))player.y=ny;else player.vy*=.15;
  }
  player.animTime+=dt*(2.2+sp/65);player.step=player.animTime;
  const follow=1-Math.exp(-18*dt);player.visualX=lerp(player.visualX,player.x,follow);player.visualY=lerp(player.visualY,player.y,follow);
};
updateCamera=function(dt){
  const speed=Math.hypot(player.vx||0,player.vy||0);
  const look=clamp(speed*.20,0,48);
  const tx=player.x+(player.facingX||0)*look,ty=player.y+(player.facingY||1)*look*.65;
  const t=1-Math.exp(-5.4*dt);camera.x=lerp(camera.x,tx,t);camera.y=lerp(camera.y,ty,t);
};
