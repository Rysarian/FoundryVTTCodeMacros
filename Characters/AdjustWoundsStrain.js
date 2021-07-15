let dialogEditor = new Dialog(
    {
        title: `Adjust Wounds/Strain`,
        content: `Adjust health`,
        buttons: {
            addWounds: {
                icon: '<i class="fas fa-plus"></i>',
                label: `Wounds`,
                callback: () => {
                    for (let token of canvas.tokens.controlled) {
                        let wounds = token.actor.data.data.stats.wounds.value + 1;
                    token.actor.update({ "data.stats.wounds.value": wounds });
                    };
                    dialogEditor.render(true);
                }
            },
            subWounds: {
                icon: '<i class="fas fa-minus"></i>',
                label: `Wounds`,
                callback: () => {
                    for (let token of canvas.tokens.controlled) {
                        let wounds = token.actor.data.data.stats.wounds.value - 1;
                    token.actor.update({ "data.stats.wounds.value": wounds });
                    };
                    dialogEditor.render(true);
                }
            },
            addStrain: {
                icon: '<i class="fas fa-plus"></i>',
                label: `Strain`,
                callback: () => {
                    for (let token of canvas.tokens.controlled) {
                        let strain = token.actor.data.data.stats.strain.value + 1;
                    token.actor.update({ "data.stats.strain.value": strain });
                    };
                    dialogEditor.render(true);
                }
            },
            subStrain: {
                icon: '<i class="fas fa-minus"></i>',
                label: `Strain`,
                callback: () => {
                    for (let token of canvas.tokens.controlled) {
                        let strain = token.actor.data.data.stats.strain.value - 1;
                    token.actor.update({ "data.stats.strain.value": strain });
                    };
                    dialogEditor.render(true);
                }
            },
            close: {
                icon: "<i class='fas fa-tick'></i>",
                label: `Close`
            },
        },

        default: "close",
        close: () => { },
    }, {
    // options
    width: 310,
    height: 160,
}

);

dialogEditor.render(true)