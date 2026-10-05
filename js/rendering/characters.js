/* ==========================================================
   STALLS
========================================================== */

function drawStall(stall) {
  const p =
    project(
      stall.x,
      stall.y
    );

  const s = p.scale;

  ctx.save();

  const light =
    ctx.createRadialGradient(
      p.x,
      p.y - 25 * s,
      0,
      p.x,
      p.y - 10 * s,
      70 * s
    );

  light.addColorStop(
    0,
    rgba(
      stall.color,
      .18
    )
  );

  light.addColorStop(
    1,
    rgba(
      stall.color,
      0
    )
  );

  ctx.fillStyle = light;

  ctx.beginPath();

  ctx.ellipse(
    p.x,
    p.y,
    70 * s,
    22 * s,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* legs */

  ctx.strokeStyle =
    "#4e4035";

  ctx.lineWidth =
    3 * s;

  ctx.beginPath();

  ctx.moveTo(
    p.x - 28 * s,
    p.y - 38 * s
  );

  ctx.lineTo(
    p.x - 28 * s,
    p.y
  );

  ctx.moveTo(
    p.x + 28 * s,
    p.y - 38 * s
  );

  ctx.lineTo(
    p.x + 28 * s,
    p.y
  );

  ctx.stroke();


  /* counter */

  ctx.fillStyle =
    "#322722";

  ctx.fillRect(
    p.x - 31 * s,
    p.y - 37 * s,
    62 * s,
    37 * s
  );

  ctx.fillStyle =
    "#71523a";

  ctx.fillRect(
    p.x - 33 * s,
    p.y - 39 * s,
    66 * s,
    5 * s
  );


  /* food trays */

  for (let i = 0; i < 3; i++) {
    ctx.fillStyle =
      i % 2
        ? "#c27b45"
        : "#9f5540";

    ctx.fillRect(
      p.x -
      19 * s +
      i * 19 * s,
      p.y - 32 * s,
      13 * s,
      5 * s
    );
  }


  /* canopy */

  ctx.save();

  glow(
    stall.color,
    12
  );

  ctx.fillStyle =
    stall.color;

  ctx.fillRect(
    p.x - 38 * s,
    p.y - 53 * s,
    76 * s,
    13 * s
  );

  ctx.restore();


  /* sign */

  ctx.fillStyle =
    "#fff2da";

  ctx.textAlign =
    "center";

  ctx.font =
    `${Math.max(
      8,
      10 * s
    )}px sans-serif`;

  ctx.fillText(
    stall.name,
    p.x,
    p.y - 44 * s
  );


  /* steam */

  const t =
    performance.now() *
    .001;

  ctx.strokeStyle =
    "rgba(235,240,240,.22)";

  ctx.lineWidth =
    1.5 * s;

  for (let i = 0; i < 3; i++) {
    const sx =
      p.x +
      (
        i - 1
      ) *
      13 * s;

    ctx.beginPath();

    ctx.moveTo(
      sx,
      p.y - 54 * s
    );

    ctx.bezierCurveTo(
      sx +
      Math.sin(
        t * 2 +
        i
      ) *
      5,
      p.y - 65 * s,

      sx - 4,
      p.y - 72 * s,

      sx +
      Math.sin(
        t * 1.5 +
        i
      ) *
      4,
      p.y - 82 * s
    );

    ctx.stroke();
  }

  ctx.restore();
}


/* ==========================================================
   CHARACTER PALETTES
========================================================== */

function getCharacterPalette(name) {
  const palettes = {
    player: {
      hair: "#17232d",
      skin: "#dfb58e",
      body: "#182b37",
      body2: "#203d49",
      accent: "#49e4ff",
      legs: "#182027",
      shoes: "#dce5e8"
    },

    navy: {
      hair: "#27282a",
      skin: "#d8aa83",
      body: "#293947",
      body2: "#344d5e",
      accent: "#779aab",
      legs: "#252b31",
      shoes: "#adb4b8"
    },

    charcoal: {
      hair: "#292526",
      skin: "#deb08b",
      body: "#404247",
      body2: "#55575c",
      accent: "#8e9298",
      legs: "#292c30",
      shoes: "#aaadaf"
    },

    purple: {
      hair: "#302630",
      skin: "#deb08b",
      body: "#574161",
      body2: "#6a5077",
      accent: "#b58aca",
      legs: "#303039",
      shoes: "#b9b7c0"
    },

    yellow: {
      hair: "#292827",
      skin: "#d7aa85",
      body: "#d4a62c",
      body2: "#efc743",
      accent: "#fff09b",
      legs: "#30363a",
      shoes: "#c6c9c9"
    },

    blue: {
      hair: "#20272d",
      skin: "#d9ad89",
      body: "#315d78",
      body2: "#3e7698",
      accent: "#76cbed",
      legs: "#27323b",
      shoes: "#b8c2c6"
    },

    green: {
      hair: "#292722",
      skin: "#d6aa84",
      body: "#425d4b",
      body2: "#55735f",
      accent: "#8cb296",
      legs: "#2c332f",
      shoes: "#aaa99f"
    },

    gray: {
      hair: "#34312f",
      skin: "#d9ad88",
      body: "#53575a",
      body2: "#676c70",
      accent: "#9ca4a8",
      legs: "#303337",
      shoes: "#b8b9b6"
    },

    red: {
      hair: "#312724",
      skin: "#dbad86",
      body: "#71433e",
      body2: "#8d5149",
      accent: "#dc8274",
      legs: "#332e2e",
      shoes: "#b6aca8"
    },

    brown: {
      hair: "#302823",
      skin: "#d5a680",
      body: "#624c3d",
      body2: "#79604d",
      accent: "#ae896b",
      legs: "#37312d",
      shoes: "#b5aa9d"
    },

    cream: {
      hair: "#342c28",
      skin: "#e1b48e",
      body: "#b5a78f",
      body2: "#c9baa1",
      accent: "#e6d5b6",
      legs: "#45413e",
      shoes: "#d6d0c6"
    },

    black: {
      hair: "#1f2022",
      skin: "#d7aa86",
      body: "#292b31",
      body2: "#353840",
      accent: "#737983",
      legs: "#202226",
      shoes: "#a8acb0"
    },

    cyan: {
      hair: "#20272c",
      skin: "#ddb08a",
      body: "#2e5c66",
      body2: "#397581",
      accent: "#5be4eb",
      legs: "#27353a",
      shoes: "#c4d2d4"
    }
  };

  return (
    palettes[name] ||
    palettes.gray
  );
}


/* ==========================================================
   DEFORMED GAME CHARACTER

   街は高密度。
   人物は意図的にシンプル。
========================================================== */

function drawCharacter(
  char,
  isPlayer = false
) {
  const p =
    project(
      char.x,
      char.y
    );

  const s = p.scale;

  const palette =
    getCharacterPalette(
      isPlayer
        ? "player"
        : char.palette
    );

  const moving =
    isPlayer
      ? player.moving
      : (
        char.action === "walk" ||
        char.action === "umbrellaWalk"
      );

  const phase =
    isPlayer
      ? player.step
      : (
        char.walkPhase || 0
      );

  const bob =
    moving
      ? Math.abs(
          Math.sin(phase)
        ) * 2 * s
      : 0;

  const step =
    moving
      ? Math.sin(phase) * 4 * s
      : 0;

  ctx.save();


  /* shadow */

  ctx.fillStyle =
    "rgba(0,0,0,.34)";

  ctx.beginPath();

  ctx.ellipse(
    p.x,
    p.y + 1,
    16 * s,
    5 * s,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* tiny reflection */

  ctx.fillStyle =
    isPlayer
      ? "rgba(70,225,255,.055)"
      : "rgba(220,225,225,.035)";

  ctx.beginPath();

  ctx.ellipse(
    p.x,
    p.y + 11 * s,
    10 * s,
    17 * s,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.translate(
    p.x,
    p.y - bob
  );


  /* backpack */

  if (
    char.type === "student"
  ) {
    ctx.fillStyle =
      "#303841";

    roundedRect(
      -14 * s,
      -40 * s,
      28 * s,
      28 * s,
      6 * s
    );

    ctx.fill();
  }


  /* delivery box */

  if (
    char.type === "delivery"
  ) {
    ctx.fillStyle =
      char.palette === "blue"
        ? "#397a9a"
        : "#d4ac2c";

    roundedRect(
      -17 * s,
      -44 * s,
      34 * s,
      31 * s,
      4 * s
    );

    ctx.fill();
  }


  /* legs */

  ctx.fillStyle =
    palette.legs;

  roundedRect(
    -11 * s,
    -19 * s,
    8 * s,
    20 * s + step,
    3 * s
  );

  ctx.fill();

  roundedRect(
    3 * s,
    -19 * s,
    8 * s,
    20 * s - step,
    3 * s
  );

  ctx.fill();


  /* shoes */

  ctx.fillStyle =
    palette.shoes;

  roundedRect(
    -13 * s,
    -2 * s + step,
    11 * s,
    5 * s,
    2 * s
  );

  ctx.fill();

  roundedRect(
    2 * s,
    -2 * s - step,
    11 * s,
    5 * s,
    2 * s
  );

  ctx.fill();


  /* torso */

  ctx.fillStyle =
    palette.body;

  roundedRect(
    -17 * s,
    -36 * s,
    34 * s,
    27 * s,
    8 * s
  );

  ctx.fill();

  ctx.fillStyle =
    palette.body2;

  ctx.fillRect(
    -14 * s,
    -24 * s,
    28 * s,
    13 * s
  );


  /* player stripe */

  if (isPlayer) {
    ctx.save();

    glow(
      palette.accent,
      5
    );

    ctx.fillStyle =
      palette.accent;

    ctx.fillRect(
      -2 * s,
      -34 * s,
      4 * s,
      21 * s
    );

    ctx.restore();
  }


  /* arms */

  const arm =
    moving
      ? Math.sin(phase) * 3 * s
      : 0;

  ctx.fillStyle =
    palette.body2;

  roundedRect(
    -21 * s,
    -32 * s + arm,
    7 * s,
    21 * s,
    3 * s
  );

  ctx.fill();

  roundedRect(
    14 * s,
    -32 * s - arm,
    7 * s,
    21 * s,
    3 * s
  );

  ctx.fill();


  /* head */

  ctx.fillStyle =
    palette.skin;

  roundedRect(
    -16 * s,
    -68 * s,
    32 * s,
    30 * s,
    10 * s
  );

  ctx.fill();


  /* hair */

  ctx.fillStyle =
    palette.hair;

  ctx.beginPath();

  ctx.moveTo(
    -16 * s,
    -56 * s
  );

  ctx.quadraticCurveTo(
    -16 * s,
    -73 * s,
    0,
    -74 * s
  );

  ctx.quadraticCurveTo(
    17 * s,
    -73 * s,
    16 * s,
    -56 * s
  );

  ctx.lineTo(
    11 * s,
    -61 * s
  );

  ctx.lineTo(
    6 * s,
    -57 * s
  );

  ctx.lineTo(
    1 * s,
    -62 * s
  );

  ctx.lineTo(
    -4 * s,
    -57 * s
  );

  ctx.lineTo(
    -9 * s,
    -62 * s
  );

  ctx.closePath();

  ctx.fill();


  /* face = almost nothing */

  if (
    char.direction !== "up"
  ) {
    ctx.fillStyle =
      "rgba(75,52,44,.20)";

    ctx.fillRect(
      -5 * s,
      -47 * s,
      10 * s,
      2 * s
    );
  }


  /* office */

  if (
    char.type === "office"
  ) {
    ctx.fillStyle =
      "#b6c0c5";

    ctx.fillRect(
      -2 * s,
      -34 * s,
      4 * s,
      10 * s
    );

    ctx.fillStyle =
      "#262b30";

    roundedRect(
      15 * s,
      -19 * s,
      12 * s,
      15 * s,
      2 * s
    );

    ctx.fill();
  }


  /* shopkeeper apron */

  if (
    char.type === "shopkeeper"
  ) {
    ctx.fillStyle =
      "#c4b298";

    ctx.beginPath();

    ctx.moveTo(
      -10 * s,
      -29 * s
    );

    ctx.lineTo(
      10 * s,
      -29 * s
    );

    ctx.lineTo(
      12 * s,
      -10 * s
    );

    ctx.lineTo(
      -12 * s,
      -10 * s
    );

    ctx.closePath();

    ctx.fill();
  }


  /* elder */

  if (
    char.type === "elder"
  ) {
    ctx.fillStyle =
      "#92918b";

    ctx.fillRect(
      -12 * s,
      -70 * s,
      24 * s,
      6 * s
    );

    ctx.strokeStyle =
      "#7d6e59";

    ctx.lineWidth =
      2 * s;

    ctx.beginPath();

    ctx.moveTo(
      20 * s,
      -20 * s
    );

    ctx.lineTo(
      23 * s,
      1 * s
    );

    ctx.stroke();
  }


  /* security */

  if (
    char.type === "security"
  ) {
    ctx.fillStyle =
      "#7695a4";

    ctx.fillRect(
      -10 * s,
      -31 * s,
      20 * s,
      4 * s
    );

    ctx.fillStyle =
      "#1f2c34";

    ctx.fillRect(
      -14 * s,
      -72 * s,
      28 * s,
      5 * s
    );
  }


  /* phone */

  if (
    char.action === "phone"
  ) {
    ctx.save();

    glow(
      "#78ddff",
      7
    );

    ctx.fillStyle =
      "#8ce5ff";

    roundedRect(
      12 * s,
      -41 * s,
      7 * s,
      12 * s,
      1 * s
    );

    ctx.fill();

    ctx.restore();
  }


  /* food bowl */

  if (
    char.action === "eat"
  ) {
    ctx.fillStyle =
      "#d8d1bc";

    ctx.beginPath();

    ctx.ellipse(
      15 * s,
      -27 * s,
      8 * s,
      4 * s,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }


  /* umbrella */

  if (
    char.action === "umbrella" ||
    char.action === "umbrellaWalk"
  ) {
    ctx.strokeStyle =
      "#89949b";

    ctx.lineWidth =
      2 * s;

    ctx.beginPath();

    ctx.moveTo(
      14 * s,
      -25 * s
    );

    ctx.lineTo(
      13 * s,
      -75 * s
    );

    ctx.stroke();

    ctx.fillStyle =
      "rgba(55,74,86,.82)";

    ctx.beginPath();

    ctx.moveTo(
      -24 * s,
      -70 * s
    );

    ctx.quadraticCurveTo(
      13 * s,
      -102 * s,
      50 * s,
      -70 * s
    );

    ctx.quadraticCurveTo(
      37 * s,
      -75 * s,
      25 * s,
      -70 * s
    );

    ctx.quadraticCurveTo(
      13 * s,
      -76 * s,
      1 * s,
      -70 * s
    );

    ctx.quadraticCurveTo(
      -11 * s,
      -76 * s,
      -24 * s,
      -70 * s
    );

    ctx.fill();
  }


  /* delivery helmet */

  if (
    char.type === "delivery"
  ) {
    const helmet =
      char.palette === "blue"
        ? "#59bce6"
        : "#f0c733";

    ctx.fillStyle =
      helmet;

    ctx.beginPath();

    ctx.arc(
      0,
      -63 * s,
      17 * s,
      Math.PI,
      Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
      -17 * s,
      -63 * s,
      34 * s,
      4 * s
    );
  }


  /* subtle rim */

  ctx.globalAlpha = .24;

  ctx.strokeStyle =
    isPlayer
      ? "#50eaff"
      : (
        currentMapId === "oldtown"
          ? "#ffb56b"
          : "#5bdcf4"
      );

  ctx.lineWidth =
    1.2 * s;

  ctx.beginPath();

  ctx.moveTo(
    -17 * s,
    -35 * s
  );

  ctx.lineTo(
    -18 * s,
    -13 * s
  );

  ctx.stroke();

  ctx.restore();
}


