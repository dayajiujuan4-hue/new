/* ==========================================================
   ROAD REFLECTIONS
========================================================== */

function drawRoadReflections() {
  for (
    let i = 0;
    i < STREET_SIGNS.length;
    i++
  ) {
    const sign =
      STREET_SIGNS[i];

    const p =
      project(
        sign.x,
        sign.y + 35
      );

    const color =
      sign.color ||
      "#4beaff";

    const g =
      ctx.createLinearGradient(
        p.x,
        p.y,
        p.x,
        p.y + 80 * p.scale
      );

    g.addColorStop(
      0,
      rgba(color, .15)
    );

    g.addColorStop(
      1,
      rgba(color, 0)
    );

    ctx.fillStyle = g;

    ctx.beginPath();

    ctx.moveTo(
      p.x - 8 * p.scale,
      p.y
    );

    ctx.lineTo(
      p.x + 8 * p.scale,
      p.y
    );

    ctx.lineTo(
      p.x + 25 * p.scale,
      p.y + 90 * p.scale
    );

    ctx.lineTo(
      p.x - 22 * p.scale,
      p.y + 90 * p.scale
    );

    ctx.closePath();
    ctx.fill();
  }

  for (
    let i = 0;
    i < STALLS.length;
    i++
  ) {
    const stall =
      STALLS[i];

    const p =
      project(
        stall.x,
        stall.y + 20
      );

    ctx.fillStyle =
      rgba(
        stall.color,
        .09
      );

    ctx.beginPath();

    ctx.ellipse(
      p.x,
      p.y + 16 * p.scale,
      45 * p.scale,
      8 * p.scale,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}


/* ==========================================================
   PUDDLES
========================================================== */

function drawPuddles() {
  const count =
    currentMapId ===
    "oldtown"
      ? 25
      : 19;

  for (let i = 0; i < count; i++) {
    const x =
      250 +
      hash(i * 91 + currentMapId.length) *
      (WORLD.width - 500);

    const y =
      300 +
      hash(i * 137 + 7) *
      (WORLD.height - 600);

    const p =
      project(x, y);

    if (
      p.x < -80 ||
      p.x > W + 80 ||
      p.y < -80 ||
      p.y > H + 80
    ) {
      continue;
    }

    const color =
      i % 4 === 0
        ? "#48e7ff"
        : i % 4 === 1
          ? "#d55cff"
          : i % 4 === 2
            ? "#ff5d7f"
            : "#ffc46b";

    ctx.fillStyle =
      rgba(color, .09);

    ctx.beginPath();

    ctx.ellipse(
      p.x,
      p.y,
      (18 + hash(i) * 32) * p.scale,
      (2.5 + hash(i + 20) * 3) * p.scale,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle =
      "rgba(190,210,215,.06)";

    ctx.lineWidth = 1;

    ctx.stroke();
  }
}


/* ==========================================================
   BUILDING STYLE
========================================================== */

function getBuildingStyle(building) {
  switch (building.visualType) {
    case "glassOffice":
      return {
        front: "#101b26",
        side: "#091119",
        roof: "#182631",
        frame: "#293b49",
        window: "#4e899e",
        warm: false
      };

    case "megaTower":
      return {
        front: "#141827",
        side: "#0b0e18",
        roof: "#20273a",
        frame: "#353952",
        window: "#6a73a5",
        warm: false
      };

    case "dataCenter":
      return {
        front: "#181923",
        side: "#0d0e15",
        roof: "#252630",
        frame: "#34343e",
        window: "#8a597d",
        warm: false
      };

    case "techOffice":
    case "futureLab":
      return {
        front: "#111d26",
        side: "#0b131a",
        roof: "#1c2a33",
        frame: "#29414e",
        window: "#4c92a8",
        warm: false
      };

    case "oldResidentialDense":
      return {
        front: "#39332e",
        side: "#211e1b",
        roof: "#433c35",
        frame: "#62574d",
        window: "#d0925d",
        warm: true
      };

    case "oldMixed":
      return {
        front: "#312d2b",
        side: "#1d1a19",
        roof: "#3d3733",
        frame: "#5c5048",
        window: "#c58c63",
        warm: true
      };

    case "oldShop":
    case "fruitShop":
    case "noodleShop":
    case "teaShop":
      return {
        front: "#3a312a",
        side: "#211b18",
        roof: "#493d33",
        frame: "#665345",
        window: "#d9a069",
        warm: true
      };

    case "residential":
    case "apartmentStore":
      return {
        front: "#28282b",
        side: "#18191d",
        roof: "#333439",
        frame: "#48494e",
        window: "#c69d71",
        warm: true
      };

    case "dinerBuilding":
      return {
        front: "#302724",
        side: "#1d1716",
        roof: "#40332e",
        frame: "#64473b",
        window: "#e0a066",
        warm: true
      };

    default:
      return {
        front: "#19212a",
        side: "#10161d",
        roof: "#27313b",
        frame: "#374651",
        window: "#628a99",
        warm: false
      };
  }
}

function getBuildingHeight(building) {
  return Math.min(
    185 +
    building.floors * 21,
    650
  );
}


