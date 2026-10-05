/* ==========================================================
   UI
========================================================== */

function updateLocationUI() {
  locationTitle.textContent =
    currentMap.name;

  locationSub.textContent =
    `${currentMap.englishName} · ${currentMap.time} · ${currentMap.weather}`;
}

function showDistrictCard() {
  districtCard.timer = 3;
  districtCard.alpha = 1;
}

function updateDistrictCard(dt) {
  if (districtCard.timer <= 0) {
    districtCard.alpha = 0;
    return;
  }

  districtCard.timer -= dt;

  if (districtCard.timer < .8) {
    districtCard.alpha =
      clamp(
        districtCard.timer / .8,
        0,
        1
      );
  }
}

function drawDistrictCard() {
  if (districtCard.alpha <= 0) return;

  ctx.save();

  ctx.globalAlpha =
    districtCard.alpha;

  ctx.textAlign = "center";

  const x = W / 2;
  const y = H * .37;

  ctx.fillStyle =
    "rgba(235,243,246,.94)";

  ctx.font =
    "500 12px sans-serif";

  ctx.fillText(
    currentMap.chapter,
    x,
    y - 58
  );

  ctx.font =
    "700 31px sans-serif";

  ctx.fillText(
    currentMap.name,
    x,
    y - 15
  );

  ctx.fillStyle =
    "rgba(205,218,225,.75)";

  ctx.font =
    "400 12px sans-serif";

  ctx.fillText(
    `${currentMap.district}　${currentMap.time}　${currentMap.weather}`,
    x,
    y + 18
  );

  ctx.restore();
}


