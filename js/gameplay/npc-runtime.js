/* ==========================================================
   NPC RUNTIME
========================================================== */

function initNPCs() {
  for (const npc of NPCS) {
    if (npc.runtimeReady) continue;

    npc.runtimeReady = true;

    npc.targetX = npc.x;
    npc.targetY = npc.y;

    npc.wait = rand(0.5, 3);
    npc.walkPhase = rand(0, Math.PI * 2);
  }
}

initNPCs();

function chooseNPCTarget(npc) {
  npc.targetX =
    clamp(
      npc.homeX +
      rand(-npc.roamX, npc.roamX),
      25,
      WORLD.width - 25
    );

  npc.targetY =
    clamp(
      npc.homeY +
      rand(-npc.roamY, npc.roamY),
      25,
      WORLD.height - 25
    );
}

function moveNPCTo(npc, tx, ty, dt) {
  const dx = tx - npc.x;
  const dy = ty - npc.y;

  const len =
    Math.hypot(dx, dy);

  if (len < 1) return;

  const vx = dx / len;
  const vy = dy / len;

  if (Math.abs(vx) > Math.abs(vy)) {
    npc.direction =
      vx < 0 ? "left" : "right";
  } else {
    npc.direction =
      vy < 0 ? "up" : "down";
  }

  const speed =
    npc.speed * dt;

  const nx =
    npc.x + vx * speed;

  const ny =
    npc.y + vy * speed;

  if (!cityBlocked(nx, npc.y, 10)) {
    npc.x = nx;
  }

  if (!cityBlocked(npc.x, ny, 10)) {
    npc.y = ny;
  }

  npc.walkPhase += dt * 8;
}

function updateNPCs(dt) {
  if (scene !== "city") return;

  for (const npc of NPCS) {
    if (!npc.runtimeReady) {
      npc.runtimeReady = true;
      npc.targetX = npc.x;
      npc.targetY = npc.y;
      npc.wait = rand(0.5, 2);
      npc.walkPhase = rand(0, 6);
    }

    if (npc.behavior === "idle") {
      npc.action = "idle";
      continue;
    }

    if (npc.behavior === "eat") {
      npc.action = "eat";
      continue;
    }

    if (npc.behavior === "shop") {
      const d =
        dist(
          npc.x,
          npc.y,
          npc.homeX,
          npc.homeY
        );

      if (d > 40) {
        npc.action = "walk";

        moveNPCTo(
          npc,
          npc.homeX,
          npc.homeY,
          dt
        );
      } else {
        npc.action = "shop";

        npc.wait -= dt;

        if (npc.wait <= 0) {
          npc.direction =
            Math.random() < .5
              ? "left"
              : "right";

          npc.wait = rand(2, 5);
        }
      }

      continue;
    }

    if (npc.wait > 0) {
      npc.wait -= dt;

      if (npc.behavior === "phone") {
        npc.action = "phone";
      } else if (npc.behavior === "umbrella") {
        npc.action = "umbrella";
      } else if (npc.behavior === "delivery") {
        npc.action = "deliveryIdle";
      } else {
        npc.action = "idle";
      }

      continue;
    }

    const d =
      dist(
        npc.x,
        npc.y,
        npc.targetX,
        npc.targetY
      );

    if (d < 12) {
      npc.wait = rand(1.2, 4);

      chooseNPCTarget(npc);

      continue;
    }

    npc.action =
      npc.behavior === "umbrella"
        ? "umbrellaWalk"
        : "walk";

    moveNPCTo(
      npc,
      npc.targetX,
      npc.targetY,
      dt
    );
  }
}


