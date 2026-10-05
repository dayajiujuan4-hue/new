/* ==========================================================
   FADE
========================================================== */

function drawFade() {
  if (fade.alpha <= 0) return;

  ctx.fillStyle =
    `rgba(3,5,8,${fade.alpha})`;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );
}


/* ==========================================================
   UPDATE
========================================================== */

function update(dt) {
  updatePlayer(dt);

  if (scene === "city") {
    updateNPCs(dt);

    if (typeof updateTraffic === "function") updateTraffic(dt);

    checkMapExits(dt);

    updateRain(dt);
  }

  updateCamera(dt);

  updateInteraction();

  updateFade(dt);

  updateDistrictCard(dt);
}


/* ==========================================================
   DRAW
========================================================== */

function draw() {
  ctx.clearRect(
    0,
    0,
    W,
    H
  );

  drawBackground();

  if (scene === "city") {
    drawPlazas();

    drawRoads();

    drawRoadReflections();

    drawPuddles();

    drawCityObjects();

    /*
       空中にあるものはY-sort後。
       キャラの頭上を横切る。
    */

    drawWires();
    drawClothesLines();

    drawAtmosphere();

    drawRain();

    drawForegroundLeaves();
  } else {
    drawInterior();
  }

  drawDistrictCard();

  drawFade();
}


