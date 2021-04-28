async function addItem(count, type, search) {
    let realActor, location, itemList, lookup;
    //Check if linked token
    if (token.actor.data.token.actorLink) {
        realActor = game.actors.get(actor.id);
    } else {
        realActor = token.actor;
    }

    //Select location of compendiums
    switch (type) {
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

    //Get list of items to be selected
    if (search === "directory") {
        itemList = await game.items.filter(gear => gear.data.type === type);
    } else {
        if (location != "None") {
            lookup = game.packs.get(location);
            itemList = await lookup.getIndex();
        }
    }

    //As long as list length is greater than 0
    if (itemList.length > 0) {
        //Loop through list to pick random item to add to character
        for (let index = 0; index < count; index++) {
            let rolled_item;
            let num = Math.floor(Math.random() * (itemList.length + 1));
            if (search === "directory") {
                rolled_item = itemList[num];
            } else {
                rolled_item = await lookup.getEntry(itemList[num]._id);
            }
            await realActor.createOwnedItem(rolled_item);
        }
    } else {
        ui.notifications.warn('No items found of type: ' + type);
    }
}


let d = new Dialog({
    title: "Create Merchant",
    content: `<p>Select Equipment Types and Amounts</p>
    <div class="grid grid-2col">
        <div class="flexbox">Location of Items
        </div>
        <select name="item-location" class="item-location-select">
            <option value="directory">Item Directory</option>
            <option value="compendium">Compendiums</option>
        </select>
        <div class="flexbox">Weapon
            <input name="weaponCheck" class="weaponCheck" type="checkbox" />
            <input name="weaponCount" class="weaponCount" style="width:20%" type="number" placeholder="0" value="0"
                data-dtype="String" />
        </div>
        <div class="flex">Armour
            <input name="armourCheck" class="armourCheck" type="checkbox" />
            <input name="armourCount" class="armourCount" style="width:20%" type="number" placeholder="0" value="0"
                data-dtype="String" />
        </div>
        <div class="flex">Gear
            <input name="gearCheck" class="gearCheck" type="checkbox" />
            <input name="gearCount" class="gearCount" style="width:20%" type="number" placeholder="0" value="0"
                data-dtype="String" />
        </div>
        <div class="flex">Item Attachment
            <input name="itemAttCheck" class="itemAttCheck" type="checkbox" />
            <input name="itemAttCount" class="itemAttCount" style="width:20%" type="number" placeholder="0" value="0"
                data-dtype="String" />
        </div>
        <div class="flex">Ship Attachment
            <input name="shipAttCheck" class="shipAttCheck" type="checkbox" />
            <input name="shipAttCount" class="shipAttCount" style="width:20%" type="number" placeholder="0" value="0"
                data-dtype="String" />
        </div>
        <div class="flex">Ship Weapon
            <input name="shipWeaponCheck" class="shipWeaponCheck" type="checkbox" />
            <input name="shipWeaponCount" class="shipWeaponCount" style="width:20%" type="number" placeholder="0" value="0"
                data-dtype="String" />
        </div>
    </div>`,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Create Merchant",
            callback: async (html) => {
                if (canvas.tokens.controlled.length === 1) {
                    //Initialize all variables
                    let weaponCheck, weaponCount, armourCheck, armourCount, gearCheck, gearCount, location;
                    let itemAttCheck, itemAttCount, shipAttCheck, shipAttCount, shipWeaponCheck, shipWeaponCount;
                    //Get all values before the dialog disappears
                    location = html.find(".item-location-select").val();
                    weaponCheck = document.querySelector("input.weaponCheck").checked;
                    weaponCount = parseInt(html.find(".weaponCount").val(), 10);
                    armourCheck = document.querySelector("input.armourCheck").checked;
                    armourCount = parseInt(html.find(".armourCount").val(), 10);
                    gearCheck = document.querySelector("input.gearCheck").checked;
                    gearCount = parseInt(html.find(".gearCount").val(), 10);
                    itemAttCheck = document.querySelector("input.itemAttCheck").checked;
                    itemAttCount = parseInt(html.find(".itemAttCount").val(), 10);
                    shipAttCheck = document.querySelector("input.shipAttCheck").checked;
                    shipAttCount = parseInt(html.find(".shipAttCount").val(), 10);
                    shipWeaponCheck = document.querySelector("input.shipWeaponCheck").checked;
                    shipWeaponCount = parseInt(html.find(".shipWeaponCount").val(), 10);

                    //Reapeated for each type

                    //Make sure count is a number
                    if (isNaN(weaponCount)) {
                        weaponCount = 0;
                    }
                    //If the box for the type was checked and the count is more than 0, get random items of the type
                    if (weaponCheck && weaponCount > 0) {
                        await addItem(weaponCount, "weapon", location);
                    }

                    if (isNaN(armourCount)) {
                        armourCount = 0;
                    }
                    if (armourCheck && armourCount > 0) {
                        await addItem(armourCount, "armour", location);
                    }

                    if (isNaN(gearCount)) {
                        gearCount = 0;
                    }
                    if (gearCheck && gearCount > 0) {
                        await addItem(gearCount, "gear", location);
                    }

                    if (isNaN(itemAttCount)) {
                        itemAttCount = 0;
                    }
                    if (itemAttCheck && itemAttCount > 0) {
                        await addItem(itemAttCount, "itemattachment", location);
                    }

                    if (isNaN(shipAttCount)) {
                        shipAttCount = 0;
                    }
                    if (shipAttCheck && shipAttCount > 0) {
                        await addItem(shipAttCount, "shipattachment", location);
                    }

                    if (isNaN(shipWeaponCount)) {
                        shipWeaponCount = 0;
                    }
                    if (shipWeaponCheck && shipWeaponCount > 0) {
                        await addItem(shipWeaponCount, "shipweapon", location);
                    }
                } else {
                    ui.notifications.warn('Please select a token.');
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