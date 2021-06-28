// Flips the selected token image along the Y axis.
// Change mirrorY to mirrorX to flip across the X axis
for (let token of canvas.tokens.controlled) {
    let flip = !token.data.mirrorX || false;
    token.data.update({ mirrorX: flip });
};