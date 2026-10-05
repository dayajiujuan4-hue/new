/* Ver.2.1 — native-resolution pixel-art primitives */
const PX=2;
function px(v){return Math.round(v/PX)*PX}
function pRect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(px(x),px(y),Math.max(PX,px(w)),Math.max(PX,px(h)))}
function pLine(x1,y1,x2,y2,c,w=2){
  ctx.strokeStyle=c;ctx.lineWidth=Math.max(PX,px(w));ctx.lineCap="butt";ctx.lineJoin="miter";
  ctx.beginPath();ctx.moveTo(px(x1),px(y1));ctx.lineTo(px(x2),px(y2));ctx.stroke();
}
function pDither(x,y,w,h,c1,c2,step=4){
  pRect(x,y,w,h,c1);ctx.fillStyle=c2;
  for(let yy=px(y);yy<y+h;yy+=step)for(let xx=px(x)+(((yy/step)&1)?step/2:0);xx<x+w;xx+=step)ctx.fillRect(px(xx),px(yy),PX,PX);
}
function pOutlineRect(x,y,w,h,fill,edge="#070b10"){
  pRect(x-PX,y-PX,w+PX*2,h+PX*2,edge);pRect(x,y,w,h,fill);
}
function pGlowPixel(x,y,c){ctx.save();ctx.globalAlpha=.18;pRect(x-6,y-6,12,12,c);ctx.globalAlpha=.55;pRect(x-2,y-2,4,4,c);ctx.restore();}
