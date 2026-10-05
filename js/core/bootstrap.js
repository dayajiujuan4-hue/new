/* ==========================================================
   杭州探索録3｜夜行杭州
   GAME Ver.0.9.1

   WORLD : Ver.0.9

   ★ VISUAL RESTORATION BUILD

   ・Ver.0.8系の高密度都市描画へ復帰
   ・デフォルメ人物はVer.0.9を維持
   ・NPC生活行動
   ・钱江新城 / 杭州旧城区
   ・建物入室
   ・雨
   ・濡れた路面
   ・ネオン反射
   ・室内が見える窓
   ・室外機
   ・配管
   ・非常階段
   ・屋上設備
   ・店舗ファサード
   ・旧城区の生活感
========================================================== */


/* ==========================================================
   CANVAS / UI
========================================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const locationTitle = document.getElementById("locationTitle");
const locationSub = document.getElementById("locationSub");

const interactionBox = document.getElementById("interaction");
const interactionText = document.getElementById("interactionText");

let W = 0;
let H = 0;
let DPR = 1;

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);

  W = window.innerWidth;
  H = window.innerHeight;

  canvas.width = Math.floor(W * DPR);
  canvas.height = Math.floor(H * DPR);

  canvas.style.width = W + "px";
  canvas.style.height = H + "px";

  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

window.addEventListener("resize", resize);
resize();


/* ==========================================================
   HELPERS
========================================================== */

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function hash(n) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function rgba(hex, alpha) {
  let h = hex.replace("#", "");

  if (h.length === 3) {
    h = h.split("").map(v => v + v).join("");
  }

  const n = parseInt(h, 16);

  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;

  return `rgba(${r},${g},${b},${alpha})`;
}

function glow(color, blur = 12) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
}

function noGlow() {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
}

function roundedRect(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);

  ctx.beginPath();
  ctx.moveTo(x + rr, y);

  ctx.arcTo(
    x + w, y,
    x + w, y + h,
    rr
  );

  ctx.arcTo(
    x + w, y + h,
    x, y + h,
    rr
  );

  ctx.arcTo(
    x, y + h,
    x, y,
    rr
  );

  ctx.arcTo(
    x, y,
    x + w, y,
    rr
  );

  ctx.closePath();
}

function pointInRect(x, y, r) {
  return (
    x >= r.x &&
    x <= r.x + r.w &&
    y >= r.y &&
    y <= r.y + r.h
  );
}


/* ==========================================================
   MAP / SCENE
========================================================== */

let currentMapId = START_MAP;
let currentMap = MAPS[currentMapId];

applyMapGlobals(currentMapId);

let scene = "city";
let currentInterior = null;
let returnData = null;
let interactionTarget = null;
let transitionLock = 0;


/* ==========================================================
   PLAYER
========================================================== */

const player = {
  x: currentMap.playerSpawn.x,
  y: currentMap.playerSpawn.y,

  radius: 17,
  speed: 255,

  direction: "down",
  moving: false,
  step: 0,

  type: "player",
  palette: "player"
};


/* ==========================================================
   CAMERA / PROJECTION
========================================================== */

const camera = {
  x: player.x,
  y: player.y
};

const VIEW = {
  playerScreenY: 0.70,
  depthScale: 0.51,
  perspective: 0.00029
};

function project(x, y, z = 0) {
  const dy = y - camera.y;

  let scale =
    1 +
    dy * VIEW.perspective;

  scale = clamp(scale, 0.46, 1.54);

  return {
    x:
      W / 2 +
      (x - camera.x) * scale,

    y:
      H * VIEW.playerScreenY +
      dy * VIEW.depthScale -
      z * scale,

    scale
  };
}


/* ==========================================================
   INPUT
========================================================== */

const keys = {};

window.addEventListener("keydown", e => {
  const k = e.key.toLowerCase();

  keys[k] = true;

  if (
    [
      "arrowup",
      "arrowdown",
      "arrowleft",
      "arrowright"
    ].includes(k)
  ) {
    e.preventDefault();
  }

  if (k === "e" && !e.repeat) {
    interact();
  }
});

window.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});


