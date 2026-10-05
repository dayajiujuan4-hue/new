/* ==========================================================
   STREET SIGNS
========================================================== */

function drawStreetSign(sign) {
  const p =
    project(
      sign.x,
      sign.y,
      105
    );

  const s = p.scale;

  const color =
    sign.color ||
    "#4beaff";

  ctx.save();

  glow(color, 9);

  ctx.fillStyle =
    "rgba(8,13,17,.93)";

  ctx.strokeStyle = color;

  ctx.lineWidth =
    Math.max(
      1,
      1.5 * s
    );

  const w =
    160 * s;

  const h =
    30 * s;

  ctx.fillRect(
    p.x - w / 2,
    p.y - h,
    w,
    h
  );

  ctx.strokeRect(
    p.x - w / 2,
    p.y - h,
    w,
    h
  );

  ctx.fillStyle = color;

  ctx.textAlign = "center";

  ctx.font =
    `${Math.max(
      9,
      11 * s
    )}px sans-serif`;

  ctx.fillText(
    sign.text,
    p.x,
    p.y - 10 * s
  );

  ctx.restore();
}


/* ==========================================================
   PROPS
========================================================== */

function drawProp(prop) {
  const p =
    project(
      prop.x,
      prop.y
    );

  const s = p.scale;

  ctx.save();

  switch (prop.type) {
    case "bike":
      ctx.strokeStyle =
        "#8b969a";

      ctx.lineWidth =
        Math.max(
          1,
          2 * s
        );

      ctx.beginPath();

      ctx.arc(
        p.x - 10 * s,
        p.y - 6 * s,
        7 * s,
        0,
        Math.PI * 2
      );

      ctx.arc(
        p.x + 11 * s,
        p.y - 6 * s,
        7 * s,
        0,
        Math.PI * 2
      );

      ctx.stroke();

      ctx.beginPath();

      ctx.moveTo(
        p.x - 10 * s,
        p.y - 6 * s
      );

      ctx.lineTo(
        p.x,
        p.y - 18 * s
      );

      ctx.lineTo(
        p.x + 11 * s,
        p.y - 6 * s
      );

      ctx.lineTo(
        p.x - 3 * s,
        p.y - 6 * s
      );

      ctx.lineTo(
        p.x - 10 * s,
        p.y - 6 * s
      );

      ctx.stroke();

      break;


    case "scooter":
      ctx.fillStyle =
        "#252c31";

      ctx.fillRect(
        p.x - 16 * s,
        p.y - 11 * s,
        31 * s,
        10 * s
      );

      ctx.fillStyle =
        "#7c878c";

      ctx.fillRect(
        p.x + 6 * s,
        p.y - 31 * s,
        3 * s,
        23 * s
      );

      ctx.fillStyle =
        "#d5b52f";

      ctx.fillRect(
        p.x - 13 * s,
        p.y - 23 * s,
        15 * s,
        12 * s
      );

      break;


    case "vending":
      ctx.fillStyle =
        "#d4d7d6";

      ctx.fillRect(
        p.x - 15 * s,
        p.y - 48 * s,
        30 * s,
        48 * s
      );

      ctx.save();

      glow(
        "#69dfff",
        9
      );

      ctx.fillStyle =
        "#6edaf2";

      ctx.fillRect(
        p.x - 10 * s,
        p.y - 40 * s,
        20 * s,
        22 * s
      );

      ctx.restore();

      ctx.fillStyle =
        "#43494a";

      for (let i = 0; i < 3; i++) {
        ctx.fillRect(
          p.x - 7 * s,
          p.y -
          36 * s +
          i * 6 * s,
          14 * s,
          2 * s
        );
      }

      break;


    case "trash":
      ctx.fillStyle =
        "#41494b";

      ctx.fillRect(
        p.x - 10 * s,
        p.y - 20 * s,
        20 * s,
        20 * s
      );

      ctx.fillStyle =
        "#262d2e";

      ctx.fillRect(
        p.x - 11 * s,
        p.y - 22 * s,
        22 * s,
        4 * s
      );

      break;


    case "boxes":
      ctx.fillStyle =
        "#8b6742";

      ctx.fillRect(
        p.x - 14 * s,
        p.y - 13 * s,
        24 * s,
        13 * s
      );

      ctx.fillStyle =
        "#705136";

      ctx.fillRect(
        p.x - 4 * s,
        p.y - 25 * s,
        20 * s,
        13 * s
      );

      ctx.strokeStyle =
        "rgba(50,35,25,.4)";

      ctx.strokeRect(
        p.x - 4 * s,
        p.y - 25 * s,
        20 * s,
        13 * s
      );

      break;


    case "plant":
      ctx.fillStyle =
        "#57463a";

      ctx.fillRect(
        p.x - 7 * s,
        p.y - 10 * s,
        14 * s,
        10 * s
      );

      ctx.fillStyle =
        "#3f6d4c";

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();

        ctx.ellipse(
          p.x +
          (i - 1.5) * 4 * s,
          p.y -
          18 * s -
          (i % 2) * 5 * s,
          5 * s,
          10 * s,
          (i - 1.5) * .3,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      break;


    case "bench":
      ctx.fillStyle =
        "#665343";

      ctx.fillRect(
        p.x - 29 * s,
        p.y - 14 * s,
        58 * s,
        8 * s
      );

      ctx.fillRect(
        p.x - 29 * s,
        p.y - 25 * s,
        58 * s,
        7 * s
      );

      ctx.fillStyle =
        "#3d4244";

      ctx.fillRect(
        p.x - 23 * s,
        p.y - 7 * s,
        4 * s,
        9 * s
      );

      ctx.fillRect(
        p.x + 19 * s,
        p.y - 7 * s,
        4 * s,
        9 * s
      );

      break;


    case "barrier":
      ctx.strokeStyle =
        "#ff8b52";

      ctx.lineWidth =
        4 * s;

      ctx.beginPath();

      ctx.moveTo(
        p.x - 27 * s,
        p.y - 18 * s
      );

      ctx.lineTo(
        p.x + 27 * s,
        p.y - 18 * s
      );

      ctx.stroke();

      ctx.strokeStyle =
        "#ddd4bd";

      ctx.lineWidth =
        2 * s;

      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();

        ctx.moveTo(
          p.x +
          i * 11 * s -
          4 * s,
          p.y - 22 * s
        );

        ctx.lineTo(
          p.x +
          i * 11 * s +
          4 * s,
          p.y - 14 * s
        );

        ctx.stroke();
      }

      break;


    case "cone":
      ctx.fillStyle =
        "#ff7648";

      ctx.beginPath();

      ctx.moveTo(
        p.x,
        p.y - 24 * s
      );

      ctx.lineTo(
        p.x - 9 * s,
        p.y
      );

      ctx.lineTo(
        p.x + 9 * s,
        p.y
      );

      ctx.closePath();
      ctx.fill();

      ctx.fillStyle =
        "#ddd8c9";

      ctx.fillRect(
        p.x - 6 * s,
        p.y - 11 * s,
        12 * s,
        3 * s
      );

      break;


    case "utility":
      ctx.fillStyle =
        "#515e62";

      ctx.fillRect(
        p.x - 13 * s,
        p.y - 35 * s,
        26 * s,
        35 * s
      );

      ctx.strokeStyle =
        "rgba(200,210,210,.25)";

      ctx.strokeRect(
        p.x - 13 * s,
        p.y - 35 * s,
        26 * s,
        35 * s
      );

      ctx.fillStyle =
        "#262e31";

      ctx.fillRect(
        p.x + 5 * s,
        p.y - 19 * s,
        3 * s,
        5 * s
      );

      break;


    case "umbrella":
      ctx.strokeStyle =
        "#6f797e";

      ctx.lineWidth =
        1.5 * s;

      ctx.beginPath();

      ctx.moveTo(
        p.x,
        p.y
      );

      ctx.lineTo(
        p.x,
        p.y - 27 * s
      );

      ctx.stroke();

      ctx.fillStyle =
        "rgba(76,90,100,.78)";

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y - 29 * s,
        18 * s,
        Math.PI,
        Math.PI * 2
      );

      ctx.fill();

      break;


    case "drain":
      ctx.strokeStyle =
        "rgba(130,145,150,.45)";

      ctx.strokeRect(
        p.x - 15 * s,
        p.y - 4 * s,
        30 * s,
        7 * s
      );

      for (let i = -10; i <= 10; i += 5) {
        ctx.beginPath();

        ctx.moveTo(
          p.x + i * s,
          p.y - 4 * s
        );

        ctx.lineTo(
          p.x + i * s,
          p.y + 3 * s
        );

        ctx.stroke();
      }

      break;


    case "metro": {
      const st = (typeof METRO_STATIONS !== "undefined") ? METRO_STATIONS[prop.station] : null;
      if (!st) break;
      const primary = st.color || "#62e8ff";
      const theme = st.style || "future";
      const w = (theme === "commercial" ? 94 : 86) * s;
      const h = (theme === "future" ? 78 : 70) * s;

      // wet pavement light pool
      const rg=ctx.createRadialGradient(p.x,p.y,2,p.x,p.y,80*s);
      rg.addColorStop(0,rgba(primary,.18)); rg.addColorStop(1,rgba(primary,0));
      ctx.fillStyle=rg; ctx.beginPath(); ctx.ellipse(p.x,p.y+3*s,80*s,20*s,0,0,Math.PI*2);ctx.fill();

      // entrance canopy / architecture
      ctx.fillStyle = theme==="oldtown" ? "#28302e" : theme==="westlake" ? "#172b2c" : "#14252d";
      ctx.beginPath();
      ctx.moveTo(p.x-w*.52,p.y-h*.08);ctx.lineTo(p.x-w*.43,p.y-h);ctx.lineTo(p.x+w*.43,p.y-h);ctx.lineTo(p.x+w*.52,p.y-h*.08);ctx.closePath();ctx.fill();
      ctx.strokeStyle=rgba(primary,.78);ctx.lineWidth=Math.max(1,1.7*s);ctx.stroke();

      // glass face
      const g=ctx.createLinearGradient(p.x,p.y-h,p.x,p.y);
      g.addColorStop(0,"rgba(111,188,202,.25)");g.addColorStop(1,"rgba(12,29,35,.72)");
      ctx.fillStyle=g;ctx.fillRect(p.x-w*.38,p.y-h*.82,w*.76,h*.60);
      ctx.strokeStyle="rgba(155,225,235,.20)";ctx.strokeRect(p.x-w*.38,p.y-h*.82,w*.76,h*.60);
      for(let i=-2;i<=2;i++){ctx.strokeStyle="rgba(170,230,240,.12)";ctx.beginPath();ctx.moveTo(p.x+i*w*.13,p.y-h*.82);ctx.lineTo(p.x+i*w*.13,p.y-h*.22);ctx.stroke();}

      // descending stairwell
      ctx.fillStyle="#071015";ctx.beginPath();ctx.moveTo(p.x-w*.30,p.y-h*.18);ctx.lineTo(p.x+w*.30,p.y-h*.18);ctx.lineTo(p.x+w*.22,p.y);ctx.lineTo(p.x-w*.22,p.y);ctx.closePath();ctx.fill();
      for(let i=0;i<6;i++){const yy=p.y-h*.15+i*h*.026;ctx.strokeStyle=`rgba(180,220,225,${.25-i*.025})`;ctx.beginPath();ctx.moveTo(p.x-w*(.27-i*.008),yy);ctx.lineTo(p.x+w*(.27-i*.008),yy);ctx.stroke();}
      ctx.strokeStyle="rgba(195,235,240,.65)";ctx.beginPath();ctx.moveTo(p.x-w*.34,p.y-h*.20);ctx.lineTo(p.x-w*.26,p.y-h*.02);ctx.moveTo(p.x+w*.34,p.y-h*.20);ctx.lineTo(p.x+w*.26,p.y-h*.02);ctx.stroke();

      // official-looking metro totem
      ctx.fillStyle="#dce9ea";ctx.fillRect(p.x-w*.58,p.y-h*.74,4*s,h*.72);
      ctx.fillStyle="#edf7f7";ctx.beginPath();ctx.arc(p.x-w*.56,p.y-h*.82,13*s,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=primary;ctx.lineWidth=Math.max(2,3*s);glow(primary,10);ctx.beginPath();ctx.arc(p.x-w*.56,p.y-h*.82,8*s,0,Math.PI*2);ctx.stroke();noGlow();
      ctx.fillStyle=primary;ctx.font=`bold ${Math.max(7,8*s)}px sans-serif`;ctx.textAlign="center";ctx.fillText("M",p.x-w*.56,p.y-h*.79);

      // station name fascia
      ctx.fillStyle="rgba(3,10,14,.92)";ctx.fillRect(p.x-w*.38,p.y-h*.78,w*.76,18*s);
      ctx.fillStyle="#f1fbfc";ctx.font=`bold ${Math.max(7,9*s)}px sans-serif`;ctx.textAlign="center";ctx.fillText(st.name,p.x,p.y-h*.61);
      ctx.fillStyle=primary;ctx.fillRect(p.x-w*.38,p.y-h*.78,w*.76,2.5*s);

      // line badges + exit
      let bx=p.x-w*.30;
      for(const lid of st.lines){const ln=METRO_LINES[lid];ctx.fillStyle=ln.color;ctx.beginPath();ctx.arc(bx,p.y-h*.38,7*s,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.font=`bold ${Math.max(6,7*s)}px sans-serif`;ctx.fillText(ln.short,bx,p.y-h*.35);bx+=18*s;}
      ctx.fillStyle="rgba(230,244,246,.72)";ctx.font=`${Math.max(6,7*s)}px sans-serif`;ctx.textAlign="right";ctx.fillText(`${st.exit}口`,p.x+w*.31,p.y-h*.35);

      // small unique details
      if(theme==="oldtown"){ctx.fillStyle="#8b5b35";ctx.fillRect(p.x-w*.46,p.y-h*.05,9*s,8*s);ctx.fillRect(p.x+w*.36,p.y-h*.05,9*s,8*s);}
      if(theme==="westlake"){ctx.strokeStyle="rgba(92,190,150,.45)";for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(p.x+w*(.42+i*.06),p.y-h*.05,8*s,Math.PI,Math.PI*2);ctx.stroke();}}
      break;
    }

    case "acstack":
      drawAC(
        prop.x,
        prop.y,
        18
      );
      break;
  }

  ctx.restore();
}


