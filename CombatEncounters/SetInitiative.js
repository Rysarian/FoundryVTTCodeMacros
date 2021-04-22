//img source can be changed to pick a different icon.
const cmbt = game.combat;
function hasPlayer(c) {
console.log("Token Disposition: " + c.actor?.token?.data?.disposition + " " + c.token?.disposition);
  if (c.actor?.token?.data?.disposition === 1 || c.token?.disposition === 1) {
    return { _id: c._id, img: "systems/starwarsffg/images/dice/genesys/lightside.png", name: "Friendly" };
  }
  else if (c.actor?.token?.data?.disposition === 0 || c.token?.disposition === 0) {
    return { _id: c._id, img: "systems/starwarsffg/images/mod-all.png", name: "Neutral" };
  }
  else {
    return { _id: c._id, img: "systems/starwarsffg/images/dice/genesys/darkside.png", name: "Hostile" };
  }
  
}
let updates = {};
updates = cmbt.data.combatants.map(c => { return hasPlayer(c) });
cmbt.updateEmbeddedEntity("Combatant", updates);
