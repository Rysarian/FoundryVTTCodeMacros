if (token.actor) {
    let cargo = token.actor.items;
    let vehicleName = token.actor.name;
    let maxEnc = token.actor.data.data.stats.encumbrance.max;
    let enc = 0;

    cargo.forEach(item => {
        if (item?.data?.data?.encumbrance?.value) {
            enc += item.data.data.encumbrance.value;
        }
    });

    let d = new Dialog({
        title: "Vehicle Encumbrance",
        content: `<h3>${vehicleName} Encumbrance</h3>
        <p>Threshold: ${maxEnc}</p>
        <p>Current: ${enc}</p>`,
        buttons: {
            one: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",
                callback: () => console.log("Chose One")
            }
        },
        default: "one",
        close: () => console.log("This always is logged no matter which option is chosen")
    });
    d.render(true);
} else {
    ui.notifications.warn("Select a token first.");
}