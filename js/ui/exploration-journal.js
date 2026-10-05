/* 杭州探索録3 Definitive Edition Ver.1.2 — EXPLORATION JOURNAL */
const JOURNAL_KEY="hangzhou-night-v12";
let journalState={maps:{},talked:0,metroTrips:0};
try{journalState={...journalState,...JSON.parse(localStorage.getItem(JOURNAL_KEY)||"{}")};}catch(e){}
function saveJournal(){localStorage.setItem(JOURNAL_KEY,JSON.stringify(journalState));}
function markMapVisited(){journalState.maps=journalState.maps||{};journalState.maps[currentMapId]=true;saveJournal();renderJournal();}
const journal=document.createElement("div");journal.id="journalPanel";journal.className="v12-panel hidden";document.getElementById("game").appendChild(journal);
function renderJournal(){
 const maps=Object.values(MAPS);const visited=maps.filter(m=>journalState.maps?.[m.id]).length;
 journal.innerHTML=`<div class="v12-head"><span>杭州探索手帳</span><button data-close>×</button></div><div class="v12-sub">NIGHT EXPLORATION RECORD</div><div class="journal-score">探索地区 <b>${visited} / ${maps.length}</b>　地下鉄利用 <b>${journalState.metroTrips||0}</b>　会話 <b>${journalState.talked||0}</b></div><div class="journal-grid">${maps.map(m=>`<div class="journal-card ${journalState.maps?.[m.id]?"found":""}"><small>${m.chapter||"AREA"}</small><strong>${journalState.maps?.[m.id]?m.name:"？？？？"}</strong><span>${journalState.maps?.[m.id]?m.englishName:"UNEXPLORED"}</span></div>`).join("")}</div><div class="v12-foot">J または ESC で閉じる</div>`;
 journal.querySelector("[data-close]").onclick=()=>journal.classList.add("hidden");
}
function toggleJournal(){journal.classList.toggle("hidden");renderJournal();}
window.addEventListener("keydown",e=>{if(e.key.toLowerCase()==="j"&&!e.repeat)toggleJournal();if(e.key==="Escape"&&!journal.classList.contains("hidden"))journal.classList.add("hidden");});
const _journalSwitch=switchMapData;switchMapData=function(id){_journalSwitch(id);markMapVisited();};
const _journalInteract=interact;interact=function(){if(interactionTarget?.type==="npc"){journalState.talked=(journalState.talked||0)+1;saveJournal();renderJournal();}_journalInteract();};
markMapVisited();
