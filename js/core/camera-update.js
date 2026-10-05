/* ==========================================================
   CAMERA
========================================================== */

function updateCamera(dt) {
  const t =
    1 -
    Math.pow(0.001, dt);

  camera.x =
    lerp(
      camera.x,
      player.x,
      t
    );

  camera.y =
    lerp(
      camera.y,
      player.y,
      t
    );
}


