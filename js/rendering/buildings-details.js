/* ==========================================================
   SIDE WINDOWS
========================================================== */

function drawSideWindows(
  building,
  height,
  style
) {
  if (building.h < 250) return;

  const rows =
    clamp(
      Math.floor(
        building.floors / 2
      ),
      2,
      8
    );

  const cols =
    clamp(
      Math.floor(
        building.h / 170
      ),
      2,
      5
    );

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const y =
        building.y +
        45 +
        (
          building.h - 90
        ) *
        (
          (col + .5) /
          cols
        );

      const z =
        80 +
        (
          height - 120
        ) *
        (
          (row + .5) /
          rows
        );

      const p =
        project(
          building.x +
          building.w +
          3,
          y,
          z
        );

      const seed =
        row * 53 +
        col * 29 +
        building.id.length;

      ctx.fillStyle =
        hash(seed) > .35
          ? (
            style.warm
              ? "rgba(224,160,95,.30)"
              : "rgba(80,150,175,.25)"
          )
          : "rgba(5,8,10,.75)";

      ctx.fillRect(
        p.x - 12 * p.scale,
        p.y - 17 * p.scale,
        22 * p.scale,
        14 * p.scale
      );
    }
  }
}


/* ==========================================================
   AC UNITS
========================================================== */

function drawACRows(
  building,
  height
) {
  const old =
    currentMapId === "oldtown" ||
    building.visualType === "oldMixed" ||
    building.visualType === "oldResidentialDense";

  const count =
    old
      ? clamp(
          Math.floor(
            building.w / 150
          ),
          2,
          8
        )
      : clamp(
          Math.floor(
            building.w / 320
          ),
          1,
          4
        );

  for (let i = 0; i < count; i++) {
    const x =
      building.x +
      55 +
      (
        building.w - 110
      ) *
      (
        (i + .5) /
        count
      );

    const z =
      70 +
      (
        i % 3
      ) *
      65;

    drawAC(
      x,
      building.y +
      building.h +
      6,
      z
    );
  }

  if (
    old &&
    height > 320
  ) {
    for (
      let i = 0;
      i < Math.min(4, count);
      i++
    ) {
      const x =
        building.x +
        80 +
        i *
        Math.max(
          90,
          (
            building.w - 160
          ) /
          Math.max(
            count - 1,
            1
          )
        );

      drawAC(
        x,
        building.y +
        building.h +
        6,
        250 +
        (i % 2) * 60
      );
    }
  }
}

function drawAC(x, y, z) {
  const p =
    project(x, y, z);

  const s = p.scale;

  ctx.fillStyle =
    "#9ca19d";

  ctx.fillRect(
    p.x - 15 * s,
    p.y - 17 * s,
    30 * s,
    17 * s
  );

  ctx.fillStyle =
    "#535957";

  ctx.beginPath();

  ctx.arc(
    p.x,
    p.y - 8.5 * s,
    5 * s,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.strokeStyle =
    "rgba(30,35,35,.6)";

  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.arc(
    p.x,
    p.y - 8.5 * s,
    7 * s,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  ctx.strokeStyle =
    "rgba(150,150,140,.35)";

  ctx.beginPath();

  ctx.moveTo(
    p.x + 15 * s,
    p.y - 5 * s
  );

  ctx.lineTo(
    p.x + 22 * s,
    p.y + 2 * s
  );

  ctx.stroke();
}


/* ==========================================================
   PIPES
========================================================== */

function drawFacadePipes(
  building,
  height
) {
  const old =
    currentMapId === "oldtown" ||
    building.visualType === "oldMixed" ||
    building.visualType === "oldResidentialDense";

  if (!old) {
    if (
      building.visualType !==
      "residential"
    ) {
      return;
    }
  }

  const pipeCount =
    old ? 3 : 1;

  for (
    let i = 0;
    i < pipeCount;
    i++
  ) {
    const x =
      building.x +
      45 +
      (
        building.w - 90
      ) *
      (
        (i + .5) /
        pipeCount
      );

    const bottom =
      project(
        x,
        building.y +
        building.h +
        8,
        15
      );

    const top =
      project(
        x,
        building.y +
        building.h +
        8,
        Math.min(
          height - 25,
          340
        )
      );

    ctx.strokeStyle =
      i % 2 === 0
        ? "rgba(122,116,104,.55)"
        : "rgba(73,80,82,.52)";

    ctx.lineWidth =
      Math.max(
        1,
        3 * bottom.scale
      );

    ctx.beginPath();

    ctx.moveTo(
      bottom.x,
      bottom.y
    );

    ctx.lineTo(
      top.x,
      top.y
    );

    ctx.stroke();


    /* pipe joint */

    const mid =
      project(
        x,
        building.y +
        building.h +
        8,
        150
      );

    ctx.fillStyle =
      "rgba(130,125,112,.5)";

    ctx.fillRect(
      mid.x - 4 * mid.scale,
      mid.y - 2 * mid.scale,
      8 * mid.scale,
      4 * mid.scale
    );
  }
}


/* ==========================================================
   FIRE ESCAPE
========================================================== */

function drawFireEscape(
  building,
  height
) {
  const shouldDraw =
    (
      currentMapId === "oldtown" &&
      building.floors >= 6
    ) ||
    building.visualType === "oldMixed";

  if (!shouldDraw) return;

  const x =
    building.x +
    building.w * .82;

  const frontY =
    building.y +
    building.h +
    10;

  const levels =
    Math.min(
      4,
      Math.floor(
        building.floors / 2
      )
    );

  for (let i = 0; i < levels; i++) {
    const z =
      85 +
      i * 70;

    if (z > height - 30) break;

    const p =
      project(
        x,
        frontY,
        z
      );

    const s =
      p.scale;

    ctx.strokeStyle =
      "rgba(110,115,112,.58)";

    ctx.lineWidth =
      Math.max(
        1,
        2 * s
      );

    ctx.strokeRect(
      p.x - 28 * s,
      p.y - 4 * s,
      56 * s,
      8 * s
    );

    ctx.beginPath();

    ctx.moveTo(
      p.x - 23 * s,
      p.y + 4 * s
    );

    ctx.lineTo(
      p.x + 20 * s,
      p.y + 35 * s
    );

    ctx.stroke();
  }
}


/* ==========================================================
   GROUND FLOOR FACADE
========================================================== */

function drawGroundFloorFacade(
  building,
  style
) {
  const y =
    building.y +
    building.h +
    8;

  const p =
    project(
      building.x +
      building.w / 2,
      y,
      43
    );

  const s =
    p.scale;

  const storefront =
    [
      "oldShop",
      "fruitShop",
      "noodleShop",
      "teaShop",
      "dinerBuilding",
      "apartmentStore"
    ].includes(
      building.visualType
    );

  const width =
    Math.min(
      building.w * .72,
      330
    ) *
    s;

  const height =
    storefront
      ? 64 * s
      : 50 * s;


  /* frame */

  ctx.fillStyle =
    storefront
      ? "#191515"
      : "#10171d";

  ctx.fillRect(
    p.x - width / 2 - 4 * s,
    p.y - height - 4 * s,
    width + 8 * s,
    height + 4 * s
  );


  /* glass */

  ctx.fillStyle =
    style.warm
      ? "rgba(245,174,94,.50)"
      : "rgba(70,205,235,.22)";

  ctx.fillRect(
    p.x - width / 2,
    p.y - height,
    width,
    height
  );


  /* shop interior shelves */

  if (storefront) {
    ctx.fillStyle =
      "rgba(40,27,20,.48)";

    for (let i = 0; i < 3; i++) {
      ctx.fillRect(
        p.x -
        width * .4,
        p.y -
        height +
        12 * s +
        i * 14 * s,
        width * .8,
        3 * s
      );
    }


    /* bottles / goods */

    for (let i = 0; i < 8; i++) {
      ctx.fillStyle =
        i % 3 === 0
          ? "rgba(170,70,55,.65)"
          : i % 3 === 1
            ? "rgba(80,120,70,.65)"
            : "rgba(190,150,75,.65)";

      ctx.fillRect(
        p.x -
        width * .34 +
        i * width * .085,
        p.y -
        height +
        19 * s,
        4 * s,
        8 * s
      );
    }
  }


  /* window mullions */

  ctx.strokeStyle =
    "rgba(20,25,26,.65)";

  ctx.lineWidth =
    Math.max(
      1,
      2 * s
    );

  for (let i = 1; i < 4; i++) {
    const xx =
      p.x -
      width / 2 +
      width * i / 4;

    ctx.beginPath();

    ctx.moveTo(
      xx,
      p.y - height
    );

    ctx.lineTo(
      xx,
      p.y
    );

    ctx.stroke();
  }


  /* door */

  ctx.fillStyle =
    "rgba(8,12,14,.86)";

  ctx.fillRect(
    p.x - 14 * s,
    p.y - 48 * s,
    28 * s,
    48 * s
  );

  ctx.fillStyle =
    "rgba(190,225,230,.28)";

  ctx.fillRect(
    p.x - 10 * s,
    p.y - 43 * s,
    20 * s,
    22 * s
  );


  /* awning */

  if (storefront) {
    const color =
      building.neon ||
      "#e26750";

    ctx.fillStyle =
      rgba(color, .85);

    ctx.fillRect(
      p.x - width * .53,
      p.y - height - 12 * s,
      width * 1.06,
      11 * s
    );

    ctx.fillStyle =
      "rgba(245,230,210,.35)";

    for (let i = 0; i < 5; i++) {
      ctx.fillRect(
        p.x -
        width * .5 +
        i * width / 5,
        p.y -
        height -
        12 * s,
        width / 10,
        11 * s
      );
    }
  }


  /* fruit shop crates */

  if (
    building.visualType ===
    "fruitShop"
  ) {
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle =
        "#6e4930";

      ctx.fillRect(
        p.x -
        75 * s +
        i * 38 * s,
        p.y - 10 * s,
        30 * s,
        9 * s
      );

      ctx.fillStyle =
        i % 2 === 0
          ? "#c85b42"
          : "#d6a943";

      for (let k = 0; k < 4; k++) {
        ctx.beginPath();

        ctx.arc(
          p.x -
          67 * s +
          i * 38 * s +
          k * 5 * s,
          p.y - 12 * s,
          3 * s,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    }
  }
}


/* ==========================================================
   ROOFTOP DETAILS
========================================================== */

function drawRoofEquipment(
  building,
  height
) {
  const items =
    clamp(
      Math.floor(
        building.w / 450
      ),
      1,
      4
    );

  for (let i = 0; i < items; i++) {
    const x =
      building.x +
      building.w *
      (
        .25 +
        .5 *
        (
          i /
          Math.max(
            items - 1,
            1
          )
        )
      );

    const y =
      building.y +
      building.h *
      (
        .3 +
        hash(
          building.id.length +
          i
        ) *
        .35
      );

    const p =
      project(
        x,
        y,
        height + 20
      );

    const s = p.scale;

    ctx.fillStyle =
      "#161d21";

    ctx.fillRect(
      p.x - 22 * s,
      p.y - 20 * s,
      44 * s,
      20 * s
    );

    ctx.strokeStyle =
      "rgba(180,200,205,.14)";

    ctx.strokeRect(
      p.x - 22 * s,
      p.y - 20 * s,
      44 * s,
      20 * s
    );

    if (i === 0) {
      ctx.strokeStyle =
        "#515d62";

      ctx.lineWidth =
        2 * s;

      ctx.beginPath();

      ctx.moveTo(
        p.x,
        p.y - 20 * s
      );

      ctx.lineTo(
        p.x,
        p.y - 55 * s
      );

      ctx.stroke();

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y - 55 * s,
        6 * s,
        0,
        Math.PI * 2
      );

      ctx.stroke();
    }
  }


  /* water tank on old buildings */

  if (
    currentMapId === "oldtown" &&
    building.floors >= 6
  ) {
    const p =
      project(
        building.x +
        building.w * .72,
        building.y +
        building.h * .42,
        height + 38
      );

    ctx.fillStyle =
      "#3f4b4d";

    ctx.beginPath();

    ctx.ellipse(
      p.x,
      p.y - 20 * p.scale,
      15 * p.scale,
      5 * p.scale,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
      p.x - 15 * p.scale,
      p.y - 20 * p.scale,
      30 * p.scale,
      20 * p.scale
    );
  }
}


/* ==========================================================
   BUILDING SIGNAGE
========================================================== */

function drawBuildingSign(
  building,
  height
) {
  if (!building.sign) return;

  const color =
    building.neon ||
    "#48eaff";

  const front =
    project(
      building.x +
      building.w * .5,
      building.y +
      building.h +
      10,
      Math.min(
        height * .55,
        230
      )
    );

  ctx.save();

  glow(color, 12);

  ctx.fillStyle = color;

  ctx.textAlign = "center";

  ctx.font =
    `600 ${Math.max(
      10,
      15 * front.scale
    )}px sans-serif`;

  ctx.fillText(
    building.sign,
    front.x,
    front.y
  );

  ctx.restore();


  /* vertical side sign */

  const oldOrShop =
    currentMapId === "oldtown" ||
    [
      "oldMixed",
      "oldShop",
      "fruitShop",
      "noodleShop",
      "teaShop",
      "dinerBuilding"
    ].includes(
      building.visualType
    );

  if (oldOrShop) {
    const p =
      project(
        building.x +
        building.w -
        30,
        building.y +
        building.h +
        12,
        120
      );

    const s =
      p.scale;

    const chars =
      building.sign
        .replace(/\s/g, "")
        .slice(0, 5)
        .split("");

    ctx.save();

    glow(color, 9);

    ctx.fillStyle =
      "rgba(20,16,15,.90)";

    ctx.fillRect(
      p.x - 14 * s,
      p.y - 22 * s,
      28 * s,
      (chars.length * 17 + 12) * s
    );

    ctx.strokeStyle = color;

    ctx.lineWidth =
      1.5 * s;

    ctx.strokeRect(
      p.x - 14 * s,
      p.y - 22 * s,
      28 * s,
      (chars.length * 17 + 12) * s
    );

    ctx.fillStyle = color;

    ctx.textAlign = "center";

    ctx.font =
      `${Math.max(
        8,
        11 * s
      )}px sans-serif`;

    chars.forEach(
      (ch, i) => {
        ctx.fillText(
          ch,
          p.x,
          p.y +
          i * 17 * s
        );
      }
    );

    ctx.restore();
  }
}


/* ==========================================================
   TREES
========================================================== */

function drawTree(tree) {
  const p =
    project(
      tree.x,
      tree.y
    );

  const s = p.scale;

  ctx.strokeStyle =
    "#41392f";

  ctx.lineWidth =
    7 * s;

  ctx.beginPath();

  ctx.moveTo(
    p.x,
    p.y
  );

  ctx.lineTo(
    p.x,
    p.y - 65 * s
  );

  ctx.stroke();

  ctx.fillStyle =
    currentMapId === "oldtown"
      ? "#25382c"
      : "#17382f";

  const cy =
    p.y - 82 * s;

  ctx.beginPath();

  ctx.arc(
    p.x,
    cy,
    29 * s,
    0,
    Math.PI * 2
  );

  ctx.arc(
    p.x - 20 * s,
    cy + 7 * s,
    21 * s,
    0,
    Math.PI * 2
  );

  ctx.arc(
    p.x + 21 * s,
    cy + 6 * s,
    22 * s,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.fillStyle =
    "rgba(90,130,90,.10)";

  ctx.beginPath();

  ctx.arc(
    p.x - 8 * s,
    cy - 8 * s,
    15 * s,
    0,
    Math.PI * 2
  );

  ctx.fill();
}


/* ==========================================================
   STREET LIGHTS
========================================================== */

function drawStreetLight(light) {
  const base =
    project(
      light.x,
      light.y
    );

  const top =
    project(
      light.x,
      light.y,
      145
    );

  ctx.strokeStyle =
    "#4e575c";

  ctx.lineWidth =
    Math.max(
      1,
      4 * base.scale
    );

  ctx.beginPath();

  ctx.moveTo(
    base.x,
    base.y
  );

  ctx.lineTo(
    top.x,
    top.y
  );

  ctx.stroke();

  ctx.save();

  glow(
    "#ffd28a",
    20
  );

  ctx.fillStyle =
    "#ffd68e";

  ctx.beginPath();

  ctx.arc(
    top.x,
    top.y,
    5 * top.scale,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();


  /* ground pool */

  const g =
    ctx.createRadialGradient(
      base.x,
      base.y,
      0,
      base.x,
      base.y,
      65 * base.scale
    );

  g.addColorStop(
    0,
    "rgba(255,205,130,.09)"
  );

  g.addColorStop(
    1,
    "rgba(255,205,130,0)"
  );

  ctx.fillStyle = g;

  ctx.beginPath();

  ctx.ellipse(
    base.x,
    base.y,
    65 * base.scale,
    15 * base.scale,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();
}


