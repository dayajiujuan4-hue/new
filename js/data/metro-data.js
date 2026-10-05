/* 杭州探索録3 Definitive Edition Ver.1.3 — METRO DATA */
const METRO_LINES = {
  L1:{id:"L1",name:"1号线",color:"#e84b55",short:"1"},
  L3:{id:"L3",name:"3号线",color:"#f2a33a",short:"3"},
  L4:{id:"L4",name:"4号线",color:"#7d5cff",short:"4"},
  L7:{id:"L7",name:"7号线",color:"#8d4fd6",short:"7"}
};
const METRO_STATIONS = {
  qianjiang:{name:"市民中心",en:"Civic Center",lines:["L4","L7"],x:1870,y:1180,exit:"A2",style:"future",mapX:50,mapY:78},
  oldtown:{name:"定安路",en:"Ding'an Road",lines:["L1"],x:1820,y:2420,exit:"C",style:"oldtown",mapX:22,mapY:48},
  wulin:{name:"武林广场",en:"Wulin Square",lines:["L1","L3"],x:1900,y:780,exit:"E",style:"commercial",mapX:50,mapY:22},
  westlake:{name:"龙翔桥",en:"Longxiangqiao",lines:["L1"],x:2760,y:1760,exit:"D",style:"westlake",mapX:76,mapY:48}
};
for (const [mapId, station] of Object.entries(METRO_STATIONS)) {
  station.line = station.lines.map(id=>METRO_LINES[id].name).join(" / ");
  station.color = METRO_LINES[station.lines[0]].color;
  const map=MAPS[mapId]; if(!map) continue;
  map.props=map.props||[];
  const existing=map.props.find(p=>p.type==="metro");
  if(existing) Object.assign(existing,{x:station.x,y:station.y,station:mapId});
  else map.props.push({type:"metro",x:station.x,y:station.y,station:mapId});
}
