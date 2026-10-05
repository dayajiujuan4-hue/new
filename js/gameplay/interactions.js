/* ==========================================================
   BUILDING ENTRY
========================================================== */

function updateInteraction() {
  interactionTarget = null;

  if (scene === "city") {
    let nearest = Infinity;

    for (const building of BUILDINGS) {
      if (
        !building.enter ||
        !building.entrance
      ) {
        continue;
      }

      const e =
        building.entrance;

      const d =
        dist(
          player.x,
          player.y,
          e.x,
          e.y
        );

      if (
        d < 100 &&
        d < nearest
      ) {
        nearest = d;

        interactionTarget = {
          type: "building",
          building
        };
      }
    }
  } else {
    const interior =
      INTERIORS[currentInterior];

    if (interior) {
      if (
        dist(
          player.x,
          player.y,
          interior.exit.x,
          interior.exit.y
        ) < 100
      ) {
        interactionTarget = {
          type: "exit"
        };
      }
    }
  }

  if (interactionTarget) {
    interactionBox.classList.remove("hidden");

    if (
      interactionTarget.type ===
      "building"
    ) {
      interactionText.textContent =
        interactionTarget.building.sign ||
        "入る";
    } else {
      interactionText.textContent =
        "外へ出る";
    }
  } else {
    interactionBox.classList.add("hidden");
  }
}

function interact() {
  if (!interactionTarget) return;

  if (
    interactionTarget.type ===
    "building"
  ) {
    enterBuilding(
      interactionTarget.building
    );
  } else if (
    interactionTarget.type ===
    "exit"
  ) {
    leaveBuilding();
  }
}

function enterBuilding(building) {
  if (
    !building.enter ||
    !INTERIORS[building.enter]
  ) {
    return;
  }

  returnData = {
    mapId: currentMapId,
    buildingId: building.id,
    side:
      building.entrance.side ||
      "south"
  };

  currentInterior =
    building.enter;

  scene = "interior";

  const interior =
    INTERIORS[currentInterior];

  player.x =
    interior.spawn.x;

  player.y =
    interior.spawn.y;

  camera.x = player.x;
  camera.y = player.y;

  locationTitle.textContent =
    interior.title;

  locationSub.textContent =
    interior.sub;
}

function leaveBuilding() {
  if (!returnData) return;

  const mapId =
    returnData.mapId;

  const building =
    getBuilding(
      mapId,
      returnData.buildingId
    );

  scene = "city";
  currentInterior = null;

  switchMapData(mapId);

  if (building) {
    const e =
      building.entrance;

    let x = e.x;
    let y = e.y;

    const gap = 60;

    switch (e.side) {
      case "north":
        y = building.y - gap;
        break;

      case "south":
        y =
          building.y +
          building.h +
          gap;
        break;

      case "west":
        x =
          building.x -
          gap;
        break;

      case "east":
        x =
          building.x +
          building.w +
          gap;
        break;
    }

    player.x = x;
    player.y = y;
  }

  camera.x = player.x;
  camera.y = player.y;

  returnData = null;

  updateLocationUI();
}


