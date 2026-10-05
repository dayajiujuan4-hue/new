/* ==========================================================
   INTERIORS
========================================================== */

function drawInteriorBase(
  data,
  floorColor,
  wallColor
) {
  ctx.fillStyle =
    "#0b0d10";

  ctx.fillRect(
    0,
    0,
    W,
    H
  );

  const a =
    project(
      40,
      40
    );

  const b =
    project(
      data.width - 40,
      data.height - 40
    );

  ctx.fillStyle =
    floorColor;

  ctx.fillRect(
    a.x,
    a.y,
    b.x - a.x,
    b.y - a.y
  );


  /* back wall */

  const w1 =
    project(
      70,
      90,
      110
    );

  const w2 =
    project(
      data.width - 70,
      90,
      110
    );

  const w3 =
    project(
      data.width - 70,
      90,
      0
    );

  const w4 =
    project(
      70,
      90,
      0
    );

  ctx.fillStyle =
    wallColor;

  ctx.beginPath();

  ctx.moveTo(
    w1.x,
    w1.y
  );

  ctx.lineTo(
    w2.x,
    w2.y
  );

  ctx.lineTo(
    w3.x,
    w3.y
  );

  ctx.lineTo(
    w4.x,
    w4.y
  );

  ctx.closePath();
  ctx.fill();
}

function drawInteriorBox(
  x,
  y,
  w,
  h,
  color
) {
  const p =
    project(x, y);

  const s = p.scale;

  ctx.fillStyle =
    color;

  ctx.fillRect(
    p.x -
    w * s / 2,
    p.y -
    h * s,
    w * s,
    h * s
  );
}

function drawConvenienceInterior() {
  const data =
    INTERIORS.convenience;

  drawInteriorBase(
    data,
    "#2a2d2e",
    "#d6d8d4"
  );

  drawInteriorBox(
    185,
    310,
    160,
    330,
    "#c8cbc7"
  );

  drawInteriorBox(
    865,
    310,
    160,
    330,
    "#c8cbc7"
  );

  drawInteriorBox(
    525,
    210,
    310,
    65,
    "#999f9b"
  );

  drawInteriorBox(
    525,
    380,
    310,
    65,
    "#999f9b"
  );

  for (let i = 0; i < 5; i++) {
    const p =
      project(
        525 +
        (i - 2) * 45,
        210,
        30
      );

    ctx.fillStyle =
      i % 2
        ? "#d86c5a"
        : "#5d8c72";

    ctx.fillRect(
      p.x - 4,
      p.y - 8,
      8,
      8
    );
  }

  drawCharacter(
    player,
    true
  );
}

function drawRestaurantInterior() {
  const data =
    INTERIORS.restaurant;

  drawInteriorBase(
    data,
    "#302721",
    "#5a3c2e"
  );

  drawInteriorBox(
    525,
    130,
    850,
    100,
    "#604332"
  );

  drawInteriorBox(
    250,
    350,
    220,
    70,
    "#6f4c35"
  );

  drawInteriorBox(
    800,
    350,
    220,
    70,
    "#6f4c35"
  );

  drawCharacter(
    player,
    true
  );
}

function drawOfficeInterior() {
  const data =
    INTERIORS.office;

  drawInteriorBase(
    data,
    "#22282e",
    "#303a43"
  );

  drawInteriorBox(
    550,
    150,
    820,
    80,
    "#3b4650"
  );

  drawInteriorBox(
    280,
    350,
    280,
    80,
    "#303b43"
  );

  drawInteriorBox(
    820,
    350,
    280,
    80,
    "#303b43"
  );

  drawCharacter(
    player,
    true
  );
}

function drawNoodleInterior() {
  const data =
    INTERIORS.noodle;

  drawInteriorBase(
    data,
    "#302722",
    "#63422f"
  );

  drawInteriorBox(
    500,
    130,
    800,
    95,
    "#684733"
  );

  drawInteriorBox(
    250,
    350,
    200,
    70,
    "#795239"
  );

  drawInteriorBox(
    750,
    350,
    200,
    70,
    "#795239"
  );

  drawCharacter(
    player,
    true
  );
}

function drawTeaInterior() {
  const data =
    INTERIORS.tea;

  drawInteriorBase(
    data,
    "#252b25",
    "#42503e"
  );

  drawInteriorBox(
    500,
    125,
    790,
    85,
    "#4e5a45"
  );

  drawInteriorBox(
    270,
    370,
    180,
    85,
    "#5d4936"
  );

  drawInteriorBox(
    730,
    370,
    180,
    85,
    "#5d4936"
  );

  drawCharacter(
    player,
    true
  );
}

function drawInterior() {
  switch (currentInterior) {
    case "convenience":
      drawConvenienceInterior();
      break;

    case "restaurant":
      drawRestaurantInterior();
      break;

    case "office":
      drawOfficeInterior();
      break;

    case "noodle":
      drawNoodleInterior();
      break;

    case "tea":
      drawTeaInterior();
      break;
  }
}


