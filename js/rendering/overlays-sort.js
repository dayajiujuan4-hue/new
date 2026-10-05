/* ==========================================================
   OVERHEAD WIRES
========================================================== */

function drawWires() {
  for (
    const wire
    of currentMap.wires || []
  ) {
    const a =
      project(
        wire.x1,
        wire.y1,
        wire.z
      );

    const b =
      project(
        wire.x2,
        wire.y2,
        wire.z
      );

    ctx.strokeStyle =
      "rgba(12,14,16,.82)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(a.x, a.y);

    ctx.quadraticCurveTo(
      (a.x + b.x) / 2,
      Math.max(a.y, b.y) + 18,
      b.x,
      b.y
    );

    ctx.stroke();


    /* cable highlight */

    ctx.strokeStyle =
      "rgba(100,110,110,.12)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
      a.x,
      a.y - 1
    );

    ctx.quadraticCurveTo(
      (a.x + b.x) / 2,
      Math.max(a.y, b.y) + 17,
      b.x,
      b.y - 1
    );

    ctx.stroke();
  }
}


/* ==========================================================
   CLOTHES LINES
========================================================== */

function drawClothesLines() {
  for (
    const line
    of currentMap.clothesLines || []
  ) {
    const a =
      project(
        line.x1,
        line.y1,
        line.z
      );

    const b =
      project(
        line.x2,
        line.y2,
        line.z
      );

    ctx.strokeStyle =
      "rgba(130,125,115,.72)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(a.x, a.y);

    ctx.quadraticCurveTo(
      (a.x + b.x) / 2,
      Math.max(a.y, b.y) + 6,
      b.x,
      b.y
    );

    ctx.stroke();

    const colors = [
      "#a25d52",
      "#667989",
      "#b49b72",
      "#65775f",
      "#a07d92"
    ];

    for (let i = 1; i <= 5; i++) {
      const t =
        i / 6;

      const x =
        lerp(
          a.x,
          b.x,
          t
        );

      const y =
        lerp(
          a.y,
          b.y,
          t
        ) +
        Math.sin(
          t * Math.PI
        ) * 5;

      ctx.fillStyle =
        colors[i - 1];

      if (i % 2 === 0) {
        ctx.fillRect(
          x - 6,
          y,
          12,
          12
        );
      } else {
        ctx.beginPath();

        ctx.moveTo(
          x - 6,
          y
        );

        ctx.lineTo(
          x + 6,
          y
        );

        ctx.lineTo(
          x + 4,
          y + 14
        );

        ctx.lineTo(
          x - 4,
          y + 14
        );

        ctx.closePath();
        ctx.fill();
      }
    }
  }
}


/* ==========================================================
   SORTED CITY OBJECTS
========================================================== */

function drawCityObjects() {
  const objects = [];

  for (const b of BUILDINGS) {
    objects.push({
      y:
        b.y + b.h,
      draw:
        () => drawBuilding(b)
    });
  }

  for (const tree of TREES) {
    objects.push({
      y: tree.y,
      draw:
        () => drawTree(tree)
    });
  }

  for (const light of STREET_LIGHTS) {
    objects.push({
      y: light.y,
      draw:
        () => drawStreetLight(light)
    });
  }

  for (const sign of STREET_SIGNS) {
    objects.push({
      y: sign.y,
      draw:
        () => drawStreetSign(sign)
    });
  }

  for (const prop of PROPS) {
    objects.push({
      y: prop.y,
      draw:
        () => drawProp(prop)
    });
  }

  for (const stall of STALLS) {
    objects.push({
      y: stall.y,
      draw:
        () => drawStall(stall)
    });
  }

  if (typeof TRAFFIC !== "undefined" && typeof drawTrafficVehicle === "function") {
    for (const vehicle of TRAFFIC) {
      objects.push({ y: vehicle.y, draw: () => drawTrafficVehicle(vehicle) });
    }
  }

  for (const npc of NPCS) {
    objects.push({
      y: npc.y,
      draw:
        () =>
          drawCharacter(
            npc,
            false
          )
    });
  }

  objects.push({
    y: player.y,
    draw:
      () =>
        drawCharacter(
          player,
          true
        )
  });

  objects.sort(
    (a, b) =>
      a.y - b.y
  );

  for (const obj of objects) {
    obj.draw();
  }
}


