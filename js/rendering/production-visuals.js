/* Ver.3.0 — polished pixel character + cinematic city finish */
const _v3DrawCharacter=drawCharacter;
drawCharacter=function(char,isPlayer=false){
  if(!isPlayer){_v3DrawCharacter(char,false);return}
  const wx=player.visualX??player.x,wy=player.visualY??player.y,p=project(wx,wy),s=Math.max(.72,p.scale),u=Math.max(2,px(2*s));
  const pal=getCharacterPalette("player"),moving=player.moving,phase=player.animTime||0;
  const cyc=moving?Math.sin(phase*Math.PI):0, stride=cyc*2*u, lift=Math.abs(cyc)*u;
  const x=px(p.x),y=px(p.y-lift*.35);
  ctx.save();
  ctx.globalAlpha=.32;pRect(x-7*u,y,14*u,2*u,"#030609");ctx.globalAlpha=.11;pRect(x-3*u,y+3*u,6*u,8*u,"#43e7ff");ctx.globalAlpha=1;
  // legs with opposing stride, feet stay planted instead of telescoping
  pOutlineRect(x-5*u,y-10*u+Math.max(0,stride*.25),4*u,9*u,pal.legs);
  pOutlineRect(x+1*u,y-10*u+Math.max(0,-stride*.25),4*u,9*u,pal.legs);
  pRect(x-6*u+stride*.35,y-2*u,6*u,2*u,pal.shoes);pRect(x+1*u-stride*.35,y-2*u,6*u,2*u,pal.shoes);
  // coat silhouette
  pRect(x-8*u,y-21*u,16*u,11*u,"#080c10");pRect(x-7*u,y-22*u,14*u,12*u,pal.body);
  pRect(x-6*u,y-18*u,12*u,8*u,pal.body2);pRect(x-u,y-21*u,2*u,11*u,pal.accent);
  // natural arm counter-swing
  const arm=stride*.45;pRect(x-10*u,y-19*u-arm,3*u,9*u,pal.body2);pRect(x+7*u,y-19*u+arm,3*u,9*u,pal.body2);
  // neck/head separated slightly; stable head bob
  pRect(x-2*u,y-24*u,4*u,3*u,pal.skin);
  pRect(x-7*u,y-35*u,14*u,12*u,"#080c10");pRect(x-6*u,y-34*u,12*u,10*u,pal.skin);
  pRect(x-6*u,y-35*u,12*u,4*u,pal.hair);pRect(x-8*u,y-32*u,3*u,6*u,pal.hair);pRect(x+5*u,y-32*u,3*u,5*u,pal.hair);
  const d=player.direction||"down";
  if(!d.startsWith("up")){let ex=d.includes("left")?-u:d.includes("right")?u:0;pRect(x-3*u+ex,y-27*u,u,u,"#44322c");pRect(x+2*u+ex,y-27*u,u,u,"#44322c")}
  pGlowPixel(x,y-15*u,pal.accent);ctx.restore();
};

const _v3DrawBackground=drawBackground;
drawBackground=function(){
  _v3DrawBackground();
  // distant skyline pixels/parallax; gives each frame a composed horizon
  ctx.save();ctx.globalAlpha=.22;
  const base=H*.29,shift=(camera.x*.018)%64;
  for(let i=-2;i<Math.ceil(W/42)+2;i++){
    const hh=22+hash(i*17+currentMapId.length)*95,xx=i*42-shift;
    pRect(xx,base-hh,30+hash(i*9)*18,hh,currentMapId==="oldtown"?"#15171a":"#0d1823");
    if(i%2===0)for(let yy=base-hh+8;yy<base-5;yy+=10)pRect(xx+6,yy,2,2,i%4?"#335260":"#6a405f");
  }ctx.restore();
};

const _v3DrawAtmosphere=drawAtmosphere;
drawAtmosphere=function(){
  _v3DrawAtmosphere();
  // restrained cinematic vignette; avoids muddying the center
  const g=ctx.createRadialGradient(W*.5,H*.55,Math.min(W,H)*.18,W*.5,H*.55,Math.max(W,H)*.68);
  g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,2,6,.38)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
};

// micro pixel highlights on wet road after puddles
const _v3Puddles=drawPuddles;
drawPuddles=function(){_v3Puddles();ctx.save();for(let i=0;i<34;i++){const wx=80+hash(i*71+currentMapId.length)*Math.max(100,WORLD.width-160),wy=100+hash(i*113)*Math.max(100,WORLD.height-200),p=project(wx,wy);if(p.x>0&&p.x<W&&p.y>0&&p.y<H){const c=i%3===0?"#4beaff":i%3===1?"#d65cff":"#e4a85d";ctx.globalAlpha=.13;pRect(p.x-6*p.scale,p.y,12*p.scale,Math.max(2,2*p.scale),c)}}ctx.restore()};
