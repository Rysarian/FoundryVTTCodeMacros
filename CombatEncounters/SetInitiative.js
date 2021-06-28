const cmbt = game.combat;
function hasPlayer(c) {
  if (c._token?.data?.disposition === 1) {
    return { _id: c.id, img: "systems/starwarsffg/images/dice/genesys/lightside.png", name: "Friendly" };
  }
  else if (c._token?.data?.disposition === 0) {
    return { _id: c.id, img: "systems/starwarsffg/images/mod-all.png", name: "Neutral" };
  }
  else {
    return { _id: c.id, img: "systems/starwarsffg/images/dice/genesys/darkside.png", name: "Hostile" };
  }

}
let updates = {};
updates = cmbt.data.combatants.map(c => { return hasPlayer(c) });
cmbt.updateEmbeddedDocuments("Combatant", updates);