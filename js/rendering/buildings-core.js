/* ==========================================================
   BUILDING SHELL
========================================================== */

function drawBuilding(building) {
  const height =
    getBuildingHeight(building);

  const style =
    getBuildingStyle(building);

  const a =
    project(
      building.x,
      building.y
    );

  const b =
    project(
      building.x + building.w,
      building.y
    );

  const c =
    project(
      building.x + building.w,
      building.y + building.h
    );

  const d =
    project(
      building.x,
      building.y + building.h
    );

  const at =
    project(
      building.x,
      building.y,
      height
    );

  const bt =
    project(
      building.x + building.w,
      building.y,
      height
    );

  const ct =
    project(
      building.x + building.w,
      building.y + building.h,
      height
    );

  const dt =
    project(
      building.x,
      building.y + building.h,
      height
    );


  /* shadow */

  ctx.fillStyle =
    "rgba(0,0,0,.22)";

  ctx.beginPath();

  ctx.moveTo(
    d.x + 8,
    d.y + 8
  );

  ctx.lineTo(
    c.x + 15,
    c.y + 8
  );

  ctx.lineTo(
    c.x + 50,
    c.y + 30
  );

  ctx.lineTo(
    d.x + 25,
    d.y + 30
  );

  ctx.closePath();
  ctx.fill();


  /* right side */

  ctx.fillStyle =
    style.side;

  ctx.beginPath();

  ctx.moveTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(ct.x, ct.y);
  ctx.lineTo(bt.x, bt.y);

  ctx.closePath();
  ctx.fill();


  /* front */

  ctx.fillStyle =
    style.front;

  ctx.beginPath();

  ctx.moveTo(d.x, d.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(ct.x, ct.y);
  ctx.lineTo(dt.x, dt.y);

  ctx.closePath();
  ctx.fill();


  /* roof */

  ctx.fillStyle =
    style.roof;

  ctx.beginPath();

  ctx.moveTo(at.x, at.y);
  ctx.lineTo(bt.x, bt.y);
  ctx.lineTo(ct.x, ct.y);
  ctx.lineTo(dt.x, dt.y);

  ctx.closePath();
  ctx.fill();


  /* edge lines */

  ctx.strokeStyle =
    "rgba(200,215,220,.09)";

  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.moveTo(dt.x, dt.y);
  ctx.lineTo(ct.x, ct.y);
  ctx.lineTo(c.x, c.y);

  ctx.stroke();


  drawFacadeGrid(
    building,
    height,
    style
  );

  drawSideWindows(
    building,
    height,
    style
  );

  drawACRows(
    building,
    height
  );

  drawFacadePipes(
    building,
    height
  );

  drawFireEscape(
    building,
    height
  );

  drawGroundFloorFacade(
    building,
    style
  );

  drawRoofEquipment(
    building,
    height
  );

  drawBuildingSign(
    building,
    height
  );
}


/* ==========================================================
   WINDOWS + IMPLIED INTERIORS
========================================================== */

function drawFacadeGrid(
  building,
  height,
  style
) {
  const cols =
    clamp(
      Math.floor(
        building.w / 115
      ),
      3,
      10
    );

  const rows =
    clamp(
      Math.floor(
        building.floors * .65
      ),
      3,
      13
    );

  const usableHeight =
    height - 95;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x =
        building.x +
        45 +
        (
          building.w - 90
        ) *
        (
          (col + .5) /
          cols
        );

      const z =
        70 +
        usableHeight *
        (
          (row + .35) /
          rows
        );

      const p =
        project(
          x,
          building.y +
          building.h +
          3,
          z
        );

      if (
        p.x < -100 ||
        p.x > W + 100 ||
        p.y < -100 ||
        p.y > H + 100
      ) {
        continue;
      }

      const seed =
        building.id.length * 31 +
        row * 19 +
        col * 43;

      const lit =
        hash(seed) > .22;

      drawWindowRoom(
        p,
        style,
        lit,
        seed,
        building.visualType
      );
    }
  }
}

function drawWindowRoom(
  p,
  style,
  lit,
  seed,
  visualType
) {
  const s = p.scale;

  const w =
    42 * s;

  const h =
    28 * s;

  ctx.fillStyle =
    "rgba(4,7,9,.88)";

  ctx.fillRect(
    p.x - w / 2 - 2 * s,
    p.y - h - 2 * s,
    w + 4 * s,
    h + 4 * s
  );

  if (!lit) {
    ctx.fillStyle =
      "rgba(8,12,15,.95)";

    ctx.fillRect(
      p.x - w / 2,
      p.y - h,
      w,
      h
    );

    if (hash(seed + 4) > .72) {
      ctx.fillStyle =
        "rgba(45,65,75,.18)";

      ctx.fillRect(
        p.x - w / 2 + 2 * s,
        p.y - h + 2 * s,
        w - 4 * s,
        3 * s
      );
    }

    return;
  }

  const warm =
    style.warm ||
    hash(seed + 9) > .55;

  const roomColor =
    warm
      ? "rgba(241,177,105,.56)"
      : "rgba(102,194,225,.38)";

  ctx.fillStyle = roomColor;

  ctx.fillRect(
    p.x - w / 2,
    p.y - h,
    w,
    h
  );


  /* back wall gradient-ish panel */

  ctx.fillStyle =
    warm
      ? "rgba(255,221,170,.08)"
      : "rgba(180,235,255,.07)";

  ctx.fillRect(
    p.x - w / 2 + 2 * s,
    p.y - h + 2 * s,
    w - 4 * s,
    h * .4
  );


  /* desk */

  if (hash(seed + 2) > .32) {
    ctx.fillStyle =
      "rgba(35,28,24,.65)";

    ctx.fillRect(
      p.x - 14 * s,
      p.y - 8 * s,
      28 * s,
      3 * s
    );

    ctx.fillRect(
      p.x - 11 * s,
      p.y - 6 * s,
      2 * s,
      6 * s
    );

    ctx.fillRect(
      p.x + 9 * s,
      p.y - 6 * s,
      2 * s,
      6 * s
    );
  }


  /* monitor */

  if (hash(seed + 7) > .40) {
    ctx.save();

    const monitorColor =
      hash(seed + 11) > .5
        ? "#72dfff"
        : "#b58cff";

    glow(
      monitorColor,
      4
    );

    ctx.fillStyle =
      rgba(
        monitorColor,
        .75
      );

    ctx.fillRect(
      p.x - 7 * s,
      p.y - 17 * s,
      12 * s,
      7 * s
    );

    ctx.restore();
  }


  /* chair */

  if (hash(seed + 13) > .55) {
    ctx.fillStyle =
      "rgba(24,26,28,.55)";

    ctx.fillRect(
      p.x + 8 * s,
      p.y - 12 * s,
      5 * s,
      9 * s
    );
  }


  /* plant */

  if (hash(seed + 20) > .78) {
    ctx.fillStyle =
      "rgba(38,72,48,.7)";

    ctx.beginPath();

    ctx.arc(
      p.x - 13 * s,
      p.y - 12 * s,
      4 * s,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
      "rgba(80,55,38,.7)";

    ctx.fillRect(
      p.x - 15 * s,
      p.y - 7 * s,
      4 * s,
      5 * s
    );
  }


  /* silhouette */

  if (hash(seed + 30) > .82) {
    ctx.fillStyle =
      "rgba(17,17,19,.58)";

    ctx.beginPath();

    ctx.arc(
      p.x + 8 * s,
      p.y - 17 * s,
      3 * s,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
      p.x + 5 * s,
      p.y - 14 * s,
      6 * s,
      10 * s
    );
  }


  /* curtains */

  if (
    visualType ===
      "residential" ||
    visualType ===
      "oldResidentialDense" ||
    visualType ===
      "apartmentStore"
  ) {
    if (hash(seed + 45) > .48) {
      ctx.fillStyle =
        "rgba(70,56,50,.25)";

      ctx.fillRect(
        p.x - w / 2,
        p.y - h,
        5 * s,
        h
      );

      ctx.fillRect(
        p.x + w / 2 - 5 * s,
        p.y - h,
        5 * s,
        h
      );
    }
  }


  /* mullions */

  ctx.strokeStyle =
    "rgba(20,28,31,.55)";

  ctx.lineWidth =
    Math.max(
      1,
      1.2 * s
    );

  ctx.beginPath();

  ctx.moveTo(
    p.x,
    p.y - h
  );

  ctx.lineTo(
    p.x,
    p.y
  );

  ctx.stroke();


  /* glass reflection */

  ctx.strokeStyle =
    "rgba(220,245,255,.12)";

  ctx.beginPath();

  ctx.moveTo(
    p.x - w * .35,
    p.y - h * .85
  );

  ctx.lineTo(
    p.x + w * .1,
    p.y - h * .65
  );

  ctx.stroke();
}


