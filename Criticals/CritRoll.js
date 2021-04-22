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

//See if an actor is selected
if (actor) {
    if (token.actor.data.token.actorLink) {
        //Make sure we reference the real actor and not a copy of it
        var realActor = game.actors.get(actor.id);
        //Count the number of injuries the character already has
        modifier = realActor.items.filter(item => item.data.type === "criticalinjury" || item.data.type === "criticaldamage").length * 10;
    } else {
        var realActor = token.actor;
        //Count the number of injuries the token already has
        modifier = token.actor.items.filter(item => item.data.type === "criticalinjury" || item.data.type === "criticaldamage").length * 10;
    }
}

let d = new Dialog({
    title: "Critical Roll",
    content: `<p>Select table and modifier</p>
    <div class="grid grid-2col">
      <div>Modifier: 
        <input name="modifier" class="modifier" style="width:50%" type="text" placeholder="` + modifier + `" value="` + modifier + `" data-dtype="String" />
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
                const critRoll = new Roll(`1d100 + ${modifier}`);
                const tableResult = game.tables.get(table).draw({
                    roll: critRoll,
                    displayChat: true
                });
                //If we have an actor selected try to add the injury
                if (realActor) {
                    //Table roles are async so wait for it to return
                    tableResult.then(function (value) {
                        //Ignore if we didn't draw a result
                        if (value.results.length <= 0)
                            return;

                        var firstResult = value.results[0];
                        var item = game.items.get(firstResult.resultId);
                        //Add injury to the selected chracter
                        realActor.createOwnedItem(item);
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
