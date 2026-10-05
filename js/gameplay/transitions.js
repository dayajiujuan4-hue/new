/* ==========================================================
   MAP SWITCH
========================================================== */

let fade = {
  active: false,
  alpha: 0,
  phase: "none",
  target: null
};

let districtCard = {
  timer: 0,
  alpha: 0
};

function switchMapData(mapId) {
  currentMapId = mapId;
  currentMap = MAPS[mapId];

  applyMapGlobals(mapId);

  initNPCs();
}

function checkMapExits(dt) {
  if (scene !== "city") return;

  if (transitionLock > 0) {
    transitionLock -= dt;
    return;
  }

  if (fade.active) return;

  for (const exit of currentMap.exits || []) {
    if (
      pointInRect(
        player.x,
        player.y,
        exit
      )
    ) {
      fade.active = true;
      fade.phase = "out";
      fade.alpha = 0;
      fade.target = exit;

      return;
    }
  }
}

function performMapChange() {
  const exit = fade.target;

  switchMapData(exit.targetMap);

  player.x = exit.targetX;
  player.y = exit.targetY;

  camera.x = player.x;
  camera.y = player.y;

  transitionLock = 1.3;

  updateLocationUI();
  showDistrictCard();
}

function updateFade(dt) {
  if (!fade.active) return;

  if (fade.phase === "out") {
    fade.alpha += dt * 2.8;

    if (fade.alpha >= 1) {
      fade.alpha = 1;

      performMapChange();

      fade.phase = "in";
    }
  } else {
    fade.alpha -= dt * 1.7;

    if (fade.alpha <= 0) {
      fade.alpha = 0;
      fade.active = false;
      fade.phase = "none";
      fade.target = null;
    }
  }
}


