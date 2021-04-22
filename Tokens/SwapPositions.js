//This was almost entirely taken from someone else. I don't remember who.
if (canvas.tokens.controlled.length === 2) {
  let A = canvas.tokens.controlled[0];
  let B = canvas.tokens.controlled[1];

  let xA = A.data.x;
  let yA = A.data.y;
  let xB = B.data.x;
  let yB = B.data.y;

  A.update({ x: xB, y: yB }, { animate: false });
  B.update({ x: xA, y: yA }, { animate: false });
}
