/* ==========================================================
   RAIN
========================================================== */

const rain = [];

function resetRain() {
  rain.length = 0;

  for (let i = 0; i < 150; i++) {
    rain.push({
      x: Math.random() * W,
      y: Math.random() * H,
      len: rand(8, 20),
      speed: rand(520, 920),
      alpha: rand(.08, .26)
    });
  }
}

resetRain();

window.addEventListener(
  "resize",
  resetRain
);

function updateRain(dt) {
  for (const drop of rain) {
    drop.y +=
      drop.speed * dt;

    drop.x -=
      drop.speed *
      .16 *
      dt;

    if (
      drop.y > H + 30 ||
      drop.x < -30
    ) {
      drop.x =
        Math.random() *
        W +
        80;

      drop.y = -20;
    }
  }
}

function drawRain() {
  if (scene !== "city") return;

  ctx.save();

  ctx.lineWidth = 1;

  for (const drop of rain) {
    ctx.strokeStyle =
      `rgba(170,200,215,${drop.alpha})`;

    ctx.beginPath();

    ctx.moveTo(
      drop.x,
      drop.y
    );

    ctx.lineTo(
      drop.x -
      drop.len * .18,
      drop.y +
      drop.len
    );

    ctx.stroke();
  }

  ctx.restore();
}


/* ==========================================================
   NIGHT ATMOSPHERE
========================================================== */

function drawAtmosphere() {
  if (scene !== "city") return;

  const g =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );

  g.addColorStop(
    0,
    "rgba(12,24,34,.08)"
  );

  g.addColorStop(
    .55,
    "rgba(8,13,18,.01)"
  );

  g.addColorStop(
    1,
    "rgba(0,0,0,.18)"
  );

  ctx.fillStyle = g;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  /* distant haze */

  const haze =
    ctx.createLinearGradient(
      0,
      H * .15,
      0,
      H * .55
    );

  haze.addColorStop(
    0,
    "rgba(95,130,150,.04)"
  );

  haze.addColorStop(
    1,
    "rgba(95,130,150,0)"
  );

  ctx.fillStyle = haze;

  ctx.fillRect(
    0,
    H * .1,
    W,
    H * .5
  );
}


/* ==========================================================
   FOREGROUND LEAVES
========================================================== */

function drawForegroundLeaves() {
  if (
    scene !== "city" ||
    currentMapId !== "oldtown"
  ) {
    return;
  }

  ctx.save();

  ctx.globalAlpha = .20;

  ctx.fillStyle =
    "#0e2018";

  for (let i = 0; i < 8; i++) {
    const x =
      i % 2 === 0
        ? 15 + i * 5
        : W - 30 - i * 6;

    const y =
      80 +
      i * 75;

    ctx.beginPath();

    ctx.ellipse(
      x,
      y,
      24,
      10,
      i * .7,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();
}


