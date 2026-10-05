/* ==========================================================
   DEFINITIVE ADDON
   NPC talk + mini map + district accent
========================================================== */

const NPC_DIALOGUE = {"office":[["今晚又得加班，地铁末班车可别错过了。","今夜も残業だ。地下鉄の終電を逃さないようにしないと。"],["前面那栋楼还在装修，过去得绕一下。","前のビルはまだ改装中だから、向こうへ行くには少し迂回しないと。"]],"student":[["我也没什么目的，就随便逛逛。","僕も特に目的はなく、気ままに歩いてるだけ。"],["来都来了，夜市那边也去看看吧。","せっかく来たんだから、夜市の方も見ていこうよ。"]],"delivery":[["我先去取餐，晚高峰这边特别堵。","先に料理を受け取りに行くよ。夕方のラッシュはこの辺すごく渋滞する。"],["下雨天单子多，送完这趟才能歇会儿。","雨の日は注文が多い。この配達が終わってやっと少し休める。"]],"shopkeeper":[["要吃点什么？都是现点现做的。","何か食べる？全部注文を受けてから作るよ。"],["慢慢看，不着急，十一点左右才打烊。","ゆっくり見て。急がなくていいよ、閉店は11時ごろだから。"]],"security":[["这个出口今晚临时关闭，从旁边绕行吧。","この出口は今夜一時閉鎖中。横から迂回してください。"],["消防通道别停电动车，麻烦配合一下。","消防通路に電動バイクを停めないでください。ご協力お願いします。"]],"elder":[["以前这一带没这么亮，现在变化真大。","昔この辺はこんなに明るくなかった。今は本当に変わったね。"],["老城区嘛，就是要有点烟火气才有意思。","旧市街というのはね、少し生活感があってこそ面白いんだよ。"]],"street":[["雨刚停，路口那边还有积水，小心点。","雨が止んだばかりで、交差点にはまだ水たまりがある。気をつけて。"],["从这条巷子穿过去，会比走大路快一点。","この路地を抜けると、大通りを行くより少し早いよ。"]]};

let dialogueState={active:false,text:"",timer:0};

function nearestTalkNPC(){
  if(scene!=="city") return null;
  let best=null,bestD=74;
  for(const npc of NPCS){const d=dist(player.x,player.y,npc.x,npc.y);if(d<bestD){best=npc;bestD=d;}}
  return best;
}

const _updateInteraction=updateInteraction;
updateInteraction=function(){
  _updateInteraction();
  if(scene!=="city" || interactionTarget) return;
  const npc=nearestTalkNPC();
  if(npc){interactionTarget={type:"npc",npc};interactionBox.classList.remove("hidden");interactionText.textContent="話す";}
};

const _interact=interact;
interact=function(){
  if(interactionTarget?.type==="npc"){
    const npc=interactionTarget.npc;
    const lines=NPC_DIALOGUE[npc.type]||NPC_DIALOGUE.street;
    const pair=lines[Math.floor(Math.random()*lines.length)];dialogueState.active=true;dialogueState.text=pair[0];dialogueState.jp=pair[1];dialogueState.timer=7;
    return;
  }
  _interact();
};

const _update=update;
update=function(dt){_update(dt);if(dialogueState.timer>0){dialogueState.timer-=dt;if(dialogueState.timer<=0)dialogueState.active=false;}};

function drawMiniMap(){
  if(scene!=="city") return;
  const mw=154,mh=128,x=W-mw-24,y=24;
  ctx.save();ctx.fillStyle="rgba(3,8,13,.78)";roundedRect(x,y,mw,mh,8);ctx.fill();
  ctx.strokeStyle="rgba(91,225,245,.18)";ctx.stroke();
  const sx=(mw-20)/WORLD.width, sy=(mh-35)/WORLD.height;
  ctx.fillStyle="rgba(130,155,165,.20)";
  for(const b of BUILDINGS) ctx.fillRect(x+10+b.x*sx,y+25+b.y*sy,Math.max(2,b.w*sx),Math.max(2,b.h*sy));
  ctx.fillStyle="#5beaff";ctx.beginPath();ctx.arc(x+10+player.x*sx,y+25+player.y*sy,3,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="rgba(230,245,248,.75)";ctx.font="10px sans-serif";ctx.fillText(currentMap.name,x+10,y+15);ctx.restore();
}

function drawDialogue(){if(!dialogueState.active)return;const jp=window.jpSubtitles===true,bw=Math.min(720,W-60),bh=jp?126:94,x=(W-bw)/2,y=H-(jp?190:158);ctx.save();ctx.fillStyle="rgba(2,7,12,.96)";ctx.fillRect(x,y,bw,bh);ctx.strokeStyle="#55e8ff";ctx.lineWidth=2;ctx.strokeRect(x+.5,y+.5,bw-1,bh-1);ctx.fillStyle="#55e8ff";ctx.font="700 11px monospace";ctx.fillText("杭州居民 // LOCAL",x+20,y+24);ctx.fillStyle="#f3fbff";ctx.font="700 16px sans-serif";ctx.fillText(dialogueState.text,x+20,y+56);if(jp){ctx.strokeStyle="rgba(213,102,255,.35)";ctx.beginPath();ctx.moveTo(x+20,y+72);ctx.lineTo(x+bw-20,y+72);ctx.stroke();ctx.fillStyle="#d8b9e8";ctx.font="12px sans-serif";ctx.fillText(dialogueState.jp||"",x+20,y+98);}ctx.restore();}

const _draw=draw;
draw=function(){_draw();drawMiniMap();drawDialogue();};
