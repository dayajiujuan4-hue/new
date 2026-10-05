/* ==========================================================
   杭州探索録3｜Definitive Edition
   EXTRA DISTRICTS
   MAP 03 : 武林夜市
   MAP 04 : 西湖東岸
========================================================== */

MAPS.oldtown.exits = MAPS.oldtown.exits || [];
MAPS.oldtown.exits.push({
  id:"toWulin", x:1450,y:0,w:650,h:120,
  direction:"north", targetMap:"wulin", targetX:1800,targetY:3350,
  label:"↑ 武林夜市"
});

MAPS.wulin = {
  id:"wulin", chapter:"MAP 03", name:"武林夜市", englishName:"WULIN NIGHT MARKET",
  district:"杭州 · 拱墅区", weather:"小雨", time:"00:31", width:3800,height:3600, ambience:"nightmarket",
  playerSpawn:{x:1800,y:3350},
  roads:[
    {x:1450,y:0,w:900,h:3600,type:"main"},
    {x:0,y:900,w:3800,h:600,type:"main"},
    {x:0,y:2450,w:3800,h:500,type:"oldmain"},
    {x:500,y:0,w:380,h:3600,type:"alley"},
    {x:2900,y:0,w:400,h:3600,type:"alley"},
    {x:850,y:1600,w:2100,h:420,type:"backstreet"},
    {x:0,y:1580,w:620,h:420,type:"transition"}
  ],
  plazas:[
    {x:930,y:1540,w:500,h:480,type:"commercial"},
    {x:2380,y:1540,w:500,h:480,type:"commercial"},
    {x:1050,y:3020,w:1700,h:360,type:"modern"}
  ],
  buildings:[
    {id:"wulinMall",x:80,y:120,w:1250,h:700,floors:12,sign:"武林广场",neon:"#ff4fb8",visualType:"megaTower"},
    {id:"wulinHotel",x:2470,y:100,w:1180,h:720,floors:19,sign:"杭州大厦",neon:"#52eaff",visualType:"glassOffice"},
    {id:"marketWest",x:80,y:1540,w:720,h:760,floors:6,sign:"武林夜市",neon:"#ff6657",visualType:"oldMixed"},
    {id:"marketEast",x:3020,y:1540,w:680,h:760,floors:7,sign:"夜食杭州",neon:"#ffb74f",visualType:"oldMixed"},
    {id:"bookstore",x:920,y:2050,w:470,h:340,floors:5,sign:"晓风书屋",neon:"#b06cff",visualType:"apartmentStore"},
    {id:"dessert",x:2410,y:2050,w:470,h:340,floors:4,sign:"桂花甜品",neon:"#ff8ab4",visualType:"dinerBuilding"},
    {id:"southWestW",x:80,y:3020,w:1250,h:430,floors:10,sign:"武林生活",neon:"#f39a55",visualType:"residential"},
    {id:"southEastW",x:2470,y:3020,w:1180,h:430,floors:13,sign:"延安路",neon:"#56ddff",visualType:"techOffice"}
  ],
  trees:[{x:1380,y:700},{x:2420,y:700},{x:1380,y:2300},{x:2420,y:2300},{x:1000,y:3000},{x:2800,y:3000}],
  streetLights:[{x:1400,y:500},{x:2400,y:500},{x:1400,y:1250},{x:2400,y:1250},{x:1400,y:2350},{x:2400,y:2350},{x:1400,y:3100},{x:2400,y:3100}],
  streetSigns:[
    {x:1420,y:1430,text:"← 西湖　武林广场 ↑",color:"#ff59c7"},
    {x:2350,y:2420,text:"夜市 · 延安路",color:"#ffc75e"},
    {x:540,y:1770,text:"← 西湖東岸",color:"#72d9ff"}
  ],
  npcs:[
    NPC(1720,1100,"student","purple","phone",150,100), NPC(2050,1200,"office","navy","wander",150,100),
    NPC(1050,1760,"street","red","eat",40,40), NPC(1250,1860,"street","cream","umbrella",100,80),
    NPC(2680,1760,"delivery","yellow","delivery",130,100), NPC(2820,1880,"shopkeeper","brown","shop",50,40),
    NPC(1750,2650,"student","cyan","wander",150,100), NPC(2100,2700,"street","green","phone",100,80),
    NPC(1850,3200,"security","navy","idle",30,30), NPC(3100,2600,"street","gray","umbrella",130,100)
  ],
  props:[
    {type:"bike",x:980,y:1500},{type:"bike",x:1030,y:1515},{type:"scooter",x:2850,y:1540},
    {type:"vending",x:900,y:2000},{type:"trash",x:2920,y:2000},{type:"bench",x:1300,y:2960},
    {type:"bench",x:2500,y:2960},{type:"boxes",x:760,y:2200},{type:"plant",x:3000,y:2200},
    {type:"drain",x:1700,y:1500},{type:"drain",x:2100,y:1500},{type:"cone",x:2300,y:2860}
  ],
  stalls:[
    {x:980,y:1650,name:"葱包桧",color:"#ff6b55"},{x:980,y:1820,name:"臭豆腐",color:"#ffc45c"},
    {x:980,y:1990,name:"烤串",color:"#ff5d8e"},{x:2820,y:1650,name:"桂花糕",color:"#ffb7d3"},
    {x:2820,y:1820,name:"片儿川",color:"#62dcff"},{x:2820,y:1990,name:"龙井茶",color:"#79d98a"}
  ],
  wires:[{x1:850,y1:1520,x2:1400,y2:1520,z:210},{x1:2400,y1:1520,x2:2950,y2:1520,z:210},{x1:900,y1:2380,x2:1400,y2:2380,z:190}],
  clothesLines:[],
  exits:[
    {id:"toOldtown",x:1450,y:3480,w:900,h:120,direction:"south",targetMap:"oldtown",targetX:1780,targetY:150,label:"↓ 杭州旧城区"},
    {id:"toWestlake",x:0,y:1580,w:120,h:420,direction:"west",targetMap:"westlake",targetX:3480,targetY:1780,label:"← 西湖東岸"}
  ]
};

MAPS.westlake = {
  id:"westlake", chapter:"MAP 04", name:"西湖東岸", englishName:"WEST LAKE · EAST SHORE",
  district:"杭州 · 湖滨", weather:"雨上がり", time:"01:02", width:3600,height:3500, ambience:"westlake",
  playerSpawn:{x:3400,y:1780},
  roads:[
    {x:2820,y:0,w:600,h:3500,type:"main"},
    {x:1200,y:1450,w:2400,h:560,type:"oldmain"},
    {x:2250,y:400,w:340,h:2700,type:"alley"},
    {x:0,y:2650,w:3300,h:400,type:"backstreet"}
  ],
  plazas:[
    {x:2550,y:650,w:250,h:650,type:"modern"},{x:2550,y:2150,w:250,h:650,type:"modern"},
    {x:1450,y:2050,w:700,h:500,type:"old"}
  ],
  buildings:[
    {id:"hubinMall",x:2820,y:120,w:650,h:1150,floors:15,sign:"湖滨银泰",neon:"#57e8ff",visualType:"glassOffice"},
    {id:"hubinNorth",x:2700,y:2100,w:780,h:1150,floors:10,sign:"湖滨步行街",neon:"#d75cff",visualType:"oldMixed"},
    {id:"teaWest",x:1450,y:2200,w:650,h:380,floors:4,sign:"西湖茶馆",neon:"#82d889",visualType:"teaShop",enter:"tea",entrance:{x:1770,y:2595,side:"south"}},
    {id:"lakeFood",x:1450,y:700,w:650,h:400,floors:5,sign:"湖畔小馆",neon:"#ffad5c",visualType:"dinerBuilding"}
  ],
  trees:[
    {x:1150,y:450},{x:1000,y:800},{x:900,y:1200},{x:950,y:2200},{x:1100,y:2500},{x:1250,y:3100},
    {x:2180,y:600},{x:2180,y:1200},{x:2180,y:2200},{x:2180,y:2900}
  ],
  streetLights:[{x:2300,y:650},{x:2300,y:1100},{x:2300,y:1600},{x:2300,y:2200},{x:2300,y:2800},{x:2800,y:1400},{x:2800,y:2050}],
  streetSigns:[{x:2600,y:1750,text:"西湖 ←　武林夜市 →",color:"#65ddff"},{x:2300,y:2600,text:"湖滨步行街",color:"#ffbf6a"}],
  npcs:[
    NPC(2400,1600,"street","cream","umbrella",120,80), NPC(2600,1850,"student","purple","phone",100,80),
    NPC(1900,2050,"elder","gray","wander",80,70), NPC(2100,2700,"street","green","wander",120,100),
    NPC(3000,1650,"office","navy","phone",80,80), NPC(1700,2650,"shopkeeper","brown","shop",40,30)
  ],
  props:[
    {type:"bench",x:1250,y:1400},{type:"bench",x:1250,y:2100},{type:"bench",x:1250,y:2800},
    {type:"bike",x:2600,y:1350},{type:"vending",x:2700,y:2250},{type:"trash",x:2300,y:2500},
    {type:"plant",x:2200,y:2000},{type:"drain",x:2850,y:1850}
  ],
  stalls:[{x:2500,y:2700,name:"藕粉",color:"#ffc5a3"},{x:2500,y:2860,name:"定胜糕",color:"#ff8d9e"}],
  wires:[], clothesLines:[],
  exits:[{id:"toWulin",x:3480,y:1450,w:120,h:560,direction:"east",targetMap:"wulin",targetX:180,targetY:1780,label:"武林夜市 →"}]
};

// Existing return target correction: never spawn inside westMiddle.
const backToQianjiang = (MAPS.oldtown.exits || []).find(e => e.targetMap === "qianjiang");
if (backToQianjiang) { backToQianjiang.targetX = 520; backToQianjiang.targetY = 2530; }
