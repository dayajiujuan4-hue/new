/* ==========================================================
   WORLD RECT
========================================================== */

function drawWorldRect(x, y, w, h, color) {
  const a = project(x, y);
  const b = project(x + w, y);
  const c = project(x + w, y + h);
  const d = project(x, y + h);

  ctx.fillStyle = color;

  ctx.beginPath();

  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(d.x, d.y);

  ctx.closePath();
  ctx.fill();
}


/* ==========================================================
   BACKGROUND
========================================================== */

function drawBackground() {
  const g =
    ctx.createLinearGradient(
      0, 0,
      0, H
    );

  if (
    currentMapId ===
    "oldtown"
  ) {
    g.addColorStop(
      0,
      "#111318"
    );

    g.addColorStop(
      .55,
      "#15171a"
    );

    g.addColorStop(
      1,
      "#080a0d"
    );
  } else {
    g.addColorStop(
      0,
      "#07101a"
    );

    g.addColorStop(
      .55,
      "#0a111a"
    );

    g.addColorStop(
      1,
      "#05080d"
    );
  }

  ctx.fillStyle = g;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );
}


/* ==========================================================
   PLAZAS
========================================================== */

function drawPlazas() {
  for (const plaza of PLAZAS) {
    let color = "#20262c";

    if (plaza.type === "old") {
      color = "#282522";
    }

    if (plaza.type === "commercial") {
      color = "#20242a";
    }

    drawWorldRect(
      plaza.x,
      plaza.y,
      plaza.w,
      plaza.h,
      color
    );

    for (
      let x = plaza.x + 35;
      x < plaza.x + plaza.w;
      x += 75
    ) {
      const a =
        project(
          x,
          plaza.y
        );

      const b =
        project(
          x,
          plaza.y + plaza.h
        );

      ctx.strokeStyle =
        "rgba(255,255,255,.035)";

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);

      ctx.stroke();
    }

    for (
      let y = plaza.y + 35;
      y < plaza.y + plaza.h;
      y += 75
    ) {
      const a =
        project(
          plaza.x,
          y
        );

      const b =
        project(
          plaza.x + plaza.w,
          y
        );

      ctx.strokeStyle =
        "rgba(255,255,255,.025)";

      ctx.beginPath();

      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);

      ctx.stroke();
    }
  }
}


/* ==========================================================
   ROADS
========================================================== */

function roadColor(type) {
  if (currentMapId === "oldtown") {
    if (
      type === "alley" ||
      type === "tiny"
    ) {
      return "#24211f";
    }

    if (type === "backstreet") {
      return "#211f1e";
    }

    return "#1b1b1c";
  }

  if (type === "alley") {
    return "#181d21";
  }

  if (type === "backstreet") {
    return "#171c21";
  }

  return "#131a21";
}

function drawRoads() {
  for (const road of ROADS) {
    drawWorldRect(
      road.x,
      road.y,
      road.w,
      road.h,
      roadColor(road.type)
    );

    drawRoadTexture(road);

    if (
      road.type === "main" ||
      road.type === "oldmain"
    ) {
      drawRoadMarkings(road);
    }
  }
}

function drawRoadTexture(road) {
  for (let i = 0; i < 18; i++) {
    const rx =
      road.x +
      hash(
        road.x * .02 +
        road.y * .01 +
        i * 9
      ) *
      road.w;

    const ry =
      road.y +
      hash(
        road.x * .01 +
        road.y * .03 +
        i * 17
      ) *
      road.h;

    const p =
      project(rx, ry);

    ctx.fillStyle =
      "rgba(255,255,255,.025)";

    ctx.beginPath();

    ctx.ellipse(
      p.x,
      p.y,
      5 * p.scale,
      1.2 * p.scale,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}

function drawRoadMarkings(road) {
  const horizontal =
    road.w > road.h;

  ctx.strokeStyle =
    "rgba(225,230,225,.13)";

  ctx.lineWidth = 2;

  ctx.setLineDash([18, 20]);

  if (horizontal) {
    const y =
      road.y +
      road.h / 2;

    const a =
      project(
        road.x + 30,
        y
      );

    const b =
      project(
        road.x +
        road.w -
        30,
        y
      );

    ctx.beginPath();

    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);

    ctx.stroke();
  } else {
    const x =
      road.x +
      road.w / 2;

    const a =
      project(
        x,
        road.y + 30
      );

    const b =
      project(
        x,
        road.y +
        road.h -
        30
      );

    ctx.beginPath();

    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);

    ctx.stroke();
  }

  ctx.setLineDash([]);
}


