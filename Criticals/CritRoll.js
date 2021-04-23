//Make sure the critical tables are set up first: https://github.com/StarWarsFoundryVTT/StarWarsFFG/wiki/Creating-Critical-Tables
const tables = game.tables.map(table => {
    if (table.data.name.includes("Critical")) {
        if (actor != null && ((token.actor.data.type === "vehicle" && table.data.name === "Critical Damage") || (token.actor.data.type === "character" && table.data.name === "Critical Injuries"))) {
            return `<option value="${table.data._id}" selected>${table.data.name}</option>`;
        } else {
            return `<option value="${table.data._id}">${table.data.name}</option>`;
        }
    }
})

var modifier = 0;
var durableRank = 0;

//See if an actor is selected
if (actor) {
    if (token.actor.data.token.actorLink) {
        //Make sure we reference the real actor and not a copy of it
        var realActor = game.actors.get(actor.id);
        //Count the number of injuries the character already has
        modifier = realActor.items.filter(item => item.data.type === "criticalinjury" || item.data.type === "criticaldamage").length * 10;
        //check to see if the character has the Durable talent
        var durableTalent = realActor.items.filter(item => item.data.name.toLowerCase() === "durable");
        //If the talent is found multiply it by 10 for the roll
        if(durableTalent.length > 0) {
            durableRank = durableTalent[0].data.data.ranks.current * 10;
        }
        
    } else {
        var realActor = token.actor;
        //Count the number of injuries the token already has
        modifier = token.actor.items.filter(item => item.data.type === "criticalinjury" || item.data.type === "criticaldamage").length * 10;
        //check to see if the token has the Durable talent
        var durableTalent = token.actor.items.filter(item => item.data.name.toLowerCase() === "durable");
        //If the talent is found multiply it by 10 for the roll
        if(durableTalent.length > 0) {
        durableRank = durableTalent[0].data.data.ranks.current * 10;
        }
    }
}

let d = new Dialog({
    title: "Critical Roll",
    content: `<p>Select table and modifier</p>
    <div class="grid grid-3col">
      <div>Modifier: 
        <input name="modifier" class="modifier" style="width:50%" type="text" placeholder="` + modifier + `" value="` + modifier + `" data-dtype="String" />
      </div>
      <div>Durable: ` + durableRank + `
      </div>
      <div>
        Table: <select class="crittable">${tables.join("")}</select>
      </div>
    </div>`,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Roll Critical",
            callback: (html) => {
                let modifier;
                modifier = parseInt(html.find(".modifier").val(), 10);
                if (isNaN(modifier)) {
                    modifier = 0;
                }
                const table = html.find(".crittable :selected").val();
                //Added in the Durable modifications as well as making sure it doesn't roll below 1
                const critRoll = new Roll(`max(1d100 + ${modifier} - ${durableRank}, 1)`);
                const tableResult = game.tables.get(table).draw({
                    roll: critRoll,
                    displayChat: true
                });
                //If we have an actor selected try to add the injury
                if (realActor) {
                    //Table roles are async so wait for it to return
                    tableResult.then(function (value) {
                        //Ignore if we didn't draw a result
                        if (value.results.length <= 0) {
                            return;
                        }
                            
                        var firstResult = value.results[0];
                        var item = game.items.get(firstResult.resultId);
                        if (item != null) {
                            //Add injury to the selected chracter
                        realActor.createOwnedItem(item);
                        }
                    });
                }
            }
        },
        two: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => console.log("Chose Two")
        }
    },
    default: "two",
    close: () => console.log("This always is logged no matter which option is chosen")
});
d.render(true);
