/* ==========================================================
   COLLISION
========================================================== */

function circleRectCollision(x, y, radius, rect) {
  const cx =
    clamp(
      x,
      rect.x,
      rect.x + rect.w
    );

  const cy =
    clamp(
      y,
      rect.y,
      rect.y + rect.h
    );

  const dx = x - cx;
  const dy = y - cy;

  return dx * dx + dy * dy < radius * radius;
}

function cityBlocked(x, y, radius = player.radius) {
  for (const b of BUILDINGS) {
    if (
      circleRectCollision(
        x,
        y,
        radius,
        {
          x: b.x - 7,
          y: b.y - 7,
          w: b.w + 14,
          h: b.h + 14
        }
      )
    ) {
      return true;
    }
  }

  return false;
}


/* ==========================================================
   INTERIOR COLLISION
========================================================== */

function getInteriorBlocks() {
  if (!currentInterior) return [];

  switch (currentInterior) {
    case "convenience":
      return [
        { x: 100, y: 100, w: 170, h: 420 },
        { x: 780, y: 100, w: 170, h: 420 },
        { x: 360, y: 170, w: 330, h: 80 },
        { x: 360, y: 340, w: 330, h: 80 }
      ];

    case "restaurant":
      return [
        { x: 90, y: 90, w: 870, h: 130 },
        { x: 130, y: 300, w: 240, h: 100 },
        { x: 680, y: 300, w: 240, h: 100 }
      ];

    case "office":
      return [
        { x: 120, y: 100, w: 860, h: 110 },
        { x: 130, y: 310, w: 300, h: 100 },
        { x: 670, y: 310, w: 300, h: 100 }
      ];

    case "noodle":
      return [
        { x: 90, y: 80, w: 820, h: 120 },
        { x: 140, y: 310, w: 220, h: 90 },
        { x: 640, y: 310, w: 220, h: 90 }
      ];

    case "tea":
      return [
        { x: 100, y: 80, w: 800, h: 110 },
        { x: 170, y: 320, w: 200, h: 100 },
        { x: 630, y: 320, w: 200, h: 100 }
      ];
  }

  return [];
}

function interiorBlocked(x, y) {
  if (!currentInterior) return false;

  const data = INTERIORS[currentInterior];

  if (
    x < 45 ||
    y < 45 ||
    x > data.width - 45 ||
    y > data.height - 45
  ) {
    return true;
  }

  for (const block of getInteriorBlocks()) {
    if (
      circleRectCollision(
        x,
        y,
        player.radius,
        block
      )
    ) {
      return true;
    }
  }

  return false;
}


/* ==========================================================
   PLAYER UPDATE
========================================================== */

function updatePlayer(dt) {
  let dx = 0;
  let dy = 0;

  if (keys["w"] || keys["arrowup"]) dy -= 1;
  if (keys["s"] || keys["arrowdown"]) dy += 1;
  if (keys["a"] || keys["arrowleft"]) dx -= 1;
  if (keys["d"] || keys["arrowright"]) dx += 1;

  const len = Math.hypot(dx, dy);

  player.moving = len > 0;

  if (len > 0) {
    dx /= len;
    dy /= len;

    if (Math.abs(dx) > Math.abs(dy)) {
      player.direction =
        dx < 0 ? "left" : "right";
    } else {
      player.direction =
        dy < 0 ? "up" : "down";
    }

    player.step += dt * 9;
  }

  const amount =
    player.speed * dt;

  if (scene === "city") {
    const nx =
      player.x + dx * amount;

    if (!cityBlocked(nx, player.y)) {
      player.x =
        clamp(
          nx,
          22,
          WORLD.width - 22
        );
    }

    const ny =
      player.y + dy * amount;

    if (!cityBlocked(player.x, ny)) {
      player.y =
        clamp(
          ny,
          22,
          WORLD.height - 22
        );
    }
  } else {
    const nx =
      player.x + dx * amount;

    if (!interiorBlocked(nx, player.y)) {
      player.x = nx;
    }

    const ny =
      player.y + dy * amount;

    if (!interiorBlocked(player.x, ny)) {
      player.y = ny;
    }
  }
}


