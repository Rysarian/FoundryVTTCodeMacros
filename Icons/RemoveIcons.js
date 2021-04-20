//Adjusted from aaclayton (Atropos)

(async () => {
  for ( let token of canvas.tokens.controlled ){
await actor.update({"effects": []});
  }
})();
(async () => {
  for ( let token of canvas.tokens.controlled ){
    await token.update({"effects": []});
  }
})();
