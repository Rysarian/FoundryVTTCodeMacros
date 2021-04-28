async function main() {
    //Filter to "Shop" items
    let selected_items = token.actor.items.filter(i => (
        i.data.type === "weapon" || i.data.type === "armour" ||
        i.data.type === "itemattachment" || i.data.type === "gear" ||
        i.data.type === "shipattachment" || i.data.type === "shipweapon")
    );
    let all_items = game.items.filter(i => (
        i.data.type === "weapon" || i.data.type === "armour" ||
        i.data.type === "itemattachment" || i.data.type === "gear" ||
        i.data.type === "shipattachment" || i.data.type === "shipweapon")
    )
    let optionsText = "";
    //Loop through selected items and add them to table
    for (let i = 0; i < selected_items.length; i++) {
        let item = selected_items[i];
        let linked_item = all_items.filter(i => i.name === item.name);

        /* For Ease of Use Just In Case
        world.oggdudeskilldescriptions
        world.oggdudeitemqualities
        world.oggdudecareers
        world.oggdudeforcepowers
        world.oggdudesignatureabilities
        world.oggdudespecies
        world.oggdudetalents 
        */

        if (linked_item.length > 0) {
            optionsText += `<tr><td>${linked_item[0].link}</td><td>${linked_item[0].data.data.price.value}</td></tr>`;
        } else {
            let found_item, lookup, index, entry, location;
            switch (item.type) {
                case "weapon":
                    location = "world.oggdudeweapons";
                    break;
                case "armour":
                    location = "world.oggdudearmor";
                    break;
                case "gear":
                    location = "world.oggdudegear";
                    break;
                case "shipweapon":
                    location = "world.oggdudevehicleweapons";
                    break;
                case "itemattachment":
                    location = "world.oggdudeitemattachments";
                    break;
                default:
                    location = "None";
                    break;
            }
            if (location != "None") {
                lookup = game.packs.get(location);
                if (lookup != null) {
                    index = await lookup.getIndex();
                    entry = index.find(i => i.name === item.name);
                    if (entry != null) {
                        found_item = await lookup.getEntry(entry._id);
                        optionsText += `<tr><td>@Compendium[${location}.${found_item._id}]{${found_item.name}}</td><td>${found_item.data.price.value}</td></tr>`;
                    }
                } else {
                    optionsText += `<tr><td>${item.name}</td><td>${item.data.data.price.value}</td></tr>`;
                }
            }
        }
    }
    //Send chat message
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: `<table><tr><th>Item</th><th>Cost</th></tr>${optionsText}</table>`
    });
}

main();