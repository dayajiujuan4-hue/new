/* ==========================================================
   GAME LOOP
========================================================== */

let lastTime =
  performance.now();

function loop(time) {
  let dt =
    (
      time -
      lastTime
    ) /
    1000;

  lastTime = time;

  dt =
    Math.min(
      dt,
      .05
    );

  update(dt);

  draw();

  requestAnimationFrame(loop);
}


