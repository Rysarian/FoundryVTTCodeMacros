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
    if (linked_item.length > 0) {
        optionsText += `<tr><td>${linked_item[0].link}</td><td>${item.data.data.price.value}</td></tr>`;
    } else {
        optionsText += `<tr><td>${item.name}</td><td>${item.data.data.price.value}</td></tr>`;
    }    
}
//Send chat message
ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: `<table><tr><th>Item</th><th>Cost</th></tr>${optionsText}</table>`
});
