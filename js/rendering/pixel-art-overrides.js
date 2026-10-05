/* Ver.2.1 — handcrafted native-resolution HD-2D-inspired renderer.
   No low-resolution framebuffer. Shapes are authored on a 2px pixel grid. */

function pixelCharPalette(name){return getCharacterPalette(name)}

drawCharacter=function(char,isPlayer=false){
  const q=project(char.x,char.y), s=Math.max(.72,q.scale), pal=pixelCharPalette(isPlayer?"player":char.palette);
  const moving=isPlayer?player.moving:(char.action==="walk"||char.action==="umbrellaWalk");
  const ph=isPlayer?player.step:(char.walkPhase||0), frame=moving?(Math.floor(ph*2)&1):0;
  const ox=px(q.x), oy=px(q.y), u=Math.max(2,px(2*s)), dir=char.direction||"down";
  ctx.save();
  // pixel shadow / wet reflection
  ctx.globalAlpha=.35;pRect(ox-7*u,oy,14*u,2*u,"#05070a");ctx.globalAlpha=.12;pRect(ox-3*u,oy+3*u,6*u,7*u,isPlayer?"#45e8ff":"#9fb0b6");ctx.globalAlpha=1;
  // rear equipment
  if(char.type==="delivery"){pOutlineRect(ox-6*u,oy-22*u,12*u,11*u,char.palette==="blue"?"#327999":"#d5a923");pRect(ox-4*u,oy-20*u,8*u,2*u,"#f2d85a")}
  if(char.type==="student"){pOutlineRect(ox-5*u,oy-20*u,10*u,10*u,"#303942")}
  // legs: deliberately blocky 2-frame walk
  const d=frame?2*u:0;
  pOutlineRect(ox-5*u,oy-9*u-d,4*u,9*u+d,pal.legs);
  pOutlineRect(ox+1*u,oy-9*u+d,4*u,9*u-d,pal.legs);
  pRect(ox-6*u,oy-2*u-d,5*u,2*u,pal.shoes);pRect(ox+1*u,oy-2*u+d,5*u,2*u,pal.shoes);
  // torso stepped silhouette
  pRect(ox-7*u,oy-22*u,14*u,3*u,"#090d11");
  pRect(ox-8*u,oy-19*u,16*u,9*u,"#090d11");
  pRect(ox-7*u,oy-21*u,14*u,3*u,pal.body);
  pRect(ox-7*u,oy-18*u,14*u,8*u,pal.body2);
  pRect(ox-6*u,oy-10*u,12*u,2*u,pal.body);
  if(isPlayer){pRect(ox-u,oy-20*u,2*u,10*u,pal.accent);pGlowPixel(ox,oy-15*u,pal.accent)}
  // arms
  pRect(ox-10*u,oy-18*u+(frame?u:0),3*u,9*u,pal.body2);pRect(ox+7*u,oy-18*u-(frame?u:0),3*u,9*u,pal.body2);
  // head outline and skin pixels
  pRect(ox-6*u,oy-35*u,12*u,3*u,"#090d11");pRect(ox-8*u,oy-32*u,16*u,10*u,"#090d11");pRect(ox-6*u,oy-22*u,12*u,2*u,"#090d11");
  pRect(ox-6*u,oy-32*u,12*u,10*u,pal.skin);pRect(ox-4*u,oy-34*u,8*u,2*u,pal.skin);
  // hair as stepped clusters
  pRect(ox-6*u,oy-34*u,12*u,4*u,pal.hair);pRect(ox-8*u,oy-32*u,3*u,6*u,pal.hair);pRect(ox+5*u,oy-32*u,3*u,5*u,pal.hair);
  pRect(ox-3*u,oy-30*u,2*u,2*u,pal.hair);pRect(ox+2*u,oy-30*u,2*u,2*u,pal.hair);
  if(dir!=="up"){const ex=dir==="left"?-3*u:dir==="right"?3*u:0;pRect(ox-3*u+ex/3,oy-26*u,u,u,"#4d3932");pRect(ox+2*u+ex/3,oy-26*u,u,u,"#4d3932")}
  if(char.type==="shopkeeper"){pRect(ox-5*u,oy-17*u,10*u,7*u,"#c6b398");pRect(ox-3*u,oy-16*u,6*u,2*u,"#8c735c")}
  if(char.type==="office"){pRect(ox-u,oy-19*u,2*u,5*u,"#c2d0d5");pOutlineRect(ox+8*u,oy-9*u,5*u,6*u,"#242b31")}
  if(char.type==="security"){pRect(ox-7*u,oy-35*u,14*u,2*u,"#273747");pRect(ox-4*u,oy-37*u,8*u,2*u,"#273747")}
  if(char.type==="elder"){pRect(ox-5*u,oy-34*u,10*u,2*u,"#aeb2ad");pLine(ox+10*u,oy-11*u,ox+10*u,oy,"#80654a",u)}
  if(char.action==="phone"){pRect(ox+10*u,oy-18*u,2*u,5*u,"#68eaff");pGlowPixel(ox+11*u,oy-16*u,"#68eaff")}
  if(char.action==="umbrella"||char.action==="umbrellaWalk"){
    pLine(ox,oy-30*u,ox,oy-8*u,"#727b80",u);
    pRect(ox-12*u,oy-39*u,24*u,2*u,"#090d11");pRect(ox-10*u,oy-41*u,20*u,2*u,pal.body2);pRect(ox-6*u,oy-43*u,12*u,2*u,pal.body2);
  }
  ctx.restore();
};

const _pixelDrawWindowRoom=drawWindowRoom;
drawWindowRoom=function(p,style,lit,seed,visualType){
  const s=p.scale,u=Math.max(2,px(2*s)),w=px(42*s),h=px(28*s),x=px(p.x-w/2),y=px(p.y-h);
  pOutlineRect(x,y,w,h,lit?(style.warm?"#8d5e3f":"#244d5d"):"#080d12","#06090c");
  if(lit){
    // mullions, desk, lamp, monitor, person/plant silhouettes: actual pixel clusters
    pRect(x+w/2-u,y,u,h,"#18242a");pRect(x,y+h/2,w,u,"#18242a");
    if(hash(seed+1)>.35){pRect(x+3*u,y+h-5*u,7*u,u,"#4c3c31");pRect(x+5*u,y+h-8*u,4*u,3*u,"#0c1820");pRect(x+6*u,y+h-7*u,2*u,u,"#5de5ff")}
    if(hash(seed+2)>.58){pRect(x+w-6*u,y+h-7*u,2*u,5*u,"#14221a");pRect(x+w-8*u,y+h-8*u,6*u,2*u,"#315d40")}
    if(hash(seed+3)>.72){pRect(x+w/2+2*u,y+h-7*u,3*u,5*u,"#1b1716");pRect(x+w/2+u,y+h-9*u,5*u,3*u,"#2a201c")}
    pRect(x+u,y+u,w-2*u,u,style.warm?"#e5a45d":"#4aa9c7");
  } else if(hash(seed+4)>.7){pRect(x+2*u,y+2*u,w-4*u,u,"#15232c")}
};

const _pixelDrawAC=drawAC;
drawAC=function(x,y,z){
  const p=project(x,y,z),u=Math.max(2,px(2*p.scale)),cx=px(p.x),cy=px(p.y);
  pOutlineRect(cx-8*u,cy-8*u,16*u,8*u,"#9da3a0","#31383a");
  pRect(cx-6*u,cy-6*u,12*u,u,"#c3c8c4");pRect(cx-5*u,cy-4*u,10*u,3*u,"#555d5c");
  for(let i=-3;i<=3;i+=2)pRect(cx+i*u,cy-4*u,u,3*u,"#252c2d");
  pLine(cx+8*u,cy-3*u,cx+11*u,cy+u,"#6e7774",u);
};

const _pixelDrawStreetSign=drawStreetSign;
drawStreetSign=function(sign){
  const p=project(sign.x,sign.y,105),s=p.scale,c=sign.color||"#4beaff",w=px(160*s),h=px(30*s),x=px(p.x-w/2),y=px(p.y-h);
  pOutlineRect(x,y,w,h,"#071017","#020507");pRect(x+2,y+2,w-4,2,c);pRect(x+2,y+h-4,w-4,2,c);
  ctx.save();ctx.fillStyle=c;ctx.textAlign="center";ctx.font=`${Math.max(8,px(10*s))}px monospace`;ctx.fillText(sign.text,px(p.x),px(p.y-9*s));ctx.restore();
};

const _pixelDrawProp=drawProp;
drawProp=function(prop){
  const p=project(prop.x,prop.y),s=p.scale,u=Math.max(2,px(2*s)),x=px(p.x),y=px(p.y);
  if(prop.type==="bike"){
    // square-pixel wheels instead of antialiased circles
    ctx.strokeStyle="#879398";ctx.lineWidth=u;ctx.strokeRect(x-9*u,y-7*u,6*u,6*u);ctx.strokeRect(x+4*u,y-7*u,6*u,6*u);
    pLine(x-6*u,y-4*u,x,y-10*u,"#879398",u);pLine(x,y-10*u,x+7*u,y-4*u,"#879398",u);pLine(x-6*u,y-4*u,x+2*u,y-4*u,"#879398",u);
  }else if(prop.type==="scooter"){
    pOutlineRect(x-8*u,y-5*u,14*u,5*u,"#2a3238");pRect(x+3*u,y-14*u,2*u,10*u,"#879398");pOutlineRect(x-6*u,y-11*u,7*u,6*u,"#d3ac28");
  }else if(prop.type==="vending"){
    pOutlineRect(x-8*u,y-25*u,16*u,25*u,"#c8cecf");pRect(x-6*u,y-22*u,12*u,11*u,"#183c4b");
    for(let r=0;r<3;r++)for(let c=0;c<4;c++)pRect(x-5*u+c*3*u,y-20*u+r*3*u,2*u,u,(r+c)%2?"#f0c36a":"#68e7ff");
    pRect(x+3*u,y-8*u,3*u,3*u,"#182329");
  }else if(prop.type==="trash"){pOutlineRect(x-5*u,y-10*u,10*u,10*u,"#3e484b");pRect(x-6*u,y-12*u,12*u,2*u,"#20272a")}
  else if(prop.type==="boxes"){pOutlineRect(x-7*u,y-7*u,12*u,7*u,"#8b6540");pLine(x-u,y-7*u,x-u,y,"#5e432c",u);pOutlineRect(x-2*u,y-13*u,10*u,6*u,"#735238")}
  else if(prop.type==="bench"){pRect(x-10*u,y-8*u,20*u,3*u,"#76553a");pRect(x-10*u,y-4*u,20*u,3*u,"#66472f");pRect(x-8*u,y-u,2*u,4*u,"#303538");pRect(x+6*u,y-u,2*u,4*u,"#303538")}
  else if(prop.type==="cone"){pRect(x-u,y-8*u,2*u,6*u,"#e17b36");pRect(x-3*u,y-2*u,6*u,2*u,"#e17b36");pRect(x-2*u,y-5*u,4*u,u,"#e9ddd0")}
  else if(prop.type==="drain"){pRect(x-7*u,y-u,14*u,2*u,"#263139");for(let i=-5;i<6;i+=2)pRect(x+i*u,y-u,u,2*u,"#65727a")}
  else _pixelDrawProp(prop);
};

const _pixelDrawStall=drawStall;
drawStall=function(stall){
  const p=project(stall.x,stall.y),s=p.scale,u=Math.max(2,px(2*s)),x=px(p.x),y=px(p.y),c=stall.color||"#e7a84b";
  // ground light remains subtle HD lighting; stall itself is pixel-authored
  ctx.save();ctx.globalAlpha=.08;pRect(x-22*u,y-2*u,44*u,4*u,c);ctx.restore();
  pLine(x-14*u,y-20*u,x-14*u,y,"#493a30",u);pLine(x+14*u,y-20*u,x+14*u,y,"#493a30",u);
  pOutlineRect(x-16*u,y-18*u,32*u,18*u,"#322620");pRect(x-17*u,y-20*u,34*u,3*u,"#78563a");
  for(let i=-10;i<=10;i+=10)pRect(x+i*u-3*u,y-16*u,6*u,3*u,i===0?"#c9854b":"#9f5540");
  pOutlineRect(x-20*u,y-28*u,40*u,7*u,c);for(let i=-18;i<18;i+=6)pRect(x+i*u,y-27*u,3*u,5*u,(i/6)%2?"#f1d7a1":c);
  ctx.save();ctx.fillStyle="#fff1d8";ctx.textAlign="center";ctx.font=`${Math.max(8,px(9*s))}px monospace`;ctx.fillText(stall.name,x,y-23*u);ctx.restore();
  // pixel steam
  const f=Math.floor(performance.now()/180)%3;for(let i=-1;i<=1;i++){pRect(x+i*6*u,y-(32+f+i%2)*u,2*u,2*u,"rgba(225,235,235,.28)");pRect(x+(i*6+1)*u,y-(35+f)*u,u,2*u,"rgba(225,235,235,.18)")}
};

// Make native canvas itself crisp without resampling the entire scene.
ctx.imageSmoothingEnabled=false;
