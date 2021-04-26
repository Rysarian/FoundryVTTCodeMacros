async function addItem(count, type) {
    let realActor;
    //Check if linked token
    if (token.actor.data.token.actorLink) {
        realActor = game.actors.get(actor.id);
    } else {
        realActor = token.actor;
    }
    //Get list of items to be selected
    let itemList = await game.items.filter(gear => gear.data.type === type);
    //As long as list length is greater than 0
    if (itemList.length > 0) {
        //Loop through list to pick random item to add to character
        for (let index = 0; index < count; index++) {
            let num = Math.floor(Math.random() * (itemList.length + 1));
            console.log(itemList[num]);
            await realActor.createOwnedItem(itemList[num]);

        }
    } else {
        ui.notifications.warn('No items found of type: ' + type);
    }

}


let d = new Dialog({
    title: "Create Merchant",
    content: `<p>Select Equipment Types and Amounts</p>
    <div class="grid grid-2col">
        <div class="flexbox">Weapon
            <input name="weaponCheck" class="weaponCheck" type="checkbox" />
            <input name="weaponCount" class="weaponCount" style="width:20%" type="number" placeholder="0" value="0" data-dtype="String" />
        </div>
        <div class="flex">Armour
            <input name="armourCheck" class="armourCheck" type="checkbox" />
            <input name="armourCount" class="armourCount" style="width:20%" type="number" placeholder="0" value="0" data-dtype="String" />
        </div>
        <div class="flex">Gear
            <input name="gearCheck" class="gearCheck" type="checkbox" />
            <input name="gearCount" class="gearCount" style="width:20%" type="number" placeholder="0" value="0" data-dtype="String" />
        </div>
        <div class="flex">Item Attachment
            <input name="itemAttCheck" class="itemAttCheck" type="checkbox" />
            <input name="itemAttCount" class="itemAttCount" style="width:20%" type="number" placeholder="0" value="0" data-dtype="String" />
        </div>
        <div class="flex">Ship Attachment
            <input name="shipAttCheck" class="shipAttCheck" type="checkbox" />
            <input name="shipAttCount" class="shipAttCount" style="width:20%" type="number" placeholder="0" value="0" data-dtype="String" />
        </div>
        <div class="flex">Ship Weapon
            <input name="shipWeaponCheck" class="shipWeaponCheck" type="checkbox" />
            <input name="shipWeaponCount" class="shipWeaponCount" style="width:20%" type="number" placeholder="0" value="0" data-dtype="String" />
        </div>
    </div>`,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Create Merchant",
            callback: async (html) => {
                if (canvas.tokens.controlled.length === 1) {
                    //Initialize all variables
                    let weaponCheck, weaponCount, armourCheck, armourCount, gearCheck, gearCount;
                    let itemAttCheck, itemAttCount, shipAttCheck, shipAttCount, shipWeaponCheck, shipWeaponCount;
                    //Get all values before the dialog disappears
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
                        await addItem(weaponCount, "weapon");
                    }


                    if (isNaN(armourCount)) {
                        armourCount = 0;
                    }
                    if (armourCheck && armourCount > 0) {
                        await addItem(armourCount, "armour");
                    }


                    if (isNaN(gearCount)) {
                        gearCount = 0;
                    }
                    if (gearCheck && gearCount > 0) {
                        await addItem(gearCount, "gear");
                    }


                    if (isNaN(itemAttCount)) {
                        itemAttCount = 0;
                    }
                    if (itemAttCheck && itemAttCount > 0) {
                        await addItem(itemAttCount, "itemattachment");
                    }


                    if (isNaN(shipAttCount)) {
                        shipAttCount = 0;
                    }
                    if (shipAttCheck && shipAttCount > 0) {
                        await addItem(shipAttCount, "shipattachment");
                    }


                    if (isNaN(shipWeaponCount)) {
                        shipWeaponCount = 0;
                    }
                    if (shipWeaponCheck && shipWeaponCount > 0) {
                        await addItem(shipWeaponCount, "shipweapon");
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
