async function updateTokensHealth(range, math, type) {
    for (let token of canvas.tokens.controlled) {
        let strain = token.actor.data.data.stats.strain.value;
        let wounds = token.actor.data.data.stats.wounds.value;
        switch (range) {
            case "max":
                let strainMax = token.actor.data.data.stats.strain.max;
                let woundsMax = token.actor.data.data.stats.wounds.max;
                if (type === "wounds") {
                    wounds = woundsMax;
                } else {
                    strain = strainMax;
                }
                await token.actor.update({ "data.stats.wounds.value": wounds, "data.stats.strain.value": strain });
                break;
            case "min":
                if (type === "wounds") {
                    wounds = 0;
                } else {
                    strain = 0;
                }
                await token.actor.update({ "data.stats.wounds.value": wounds, "data.stats.strain.value": strain });
                break;

            default:
                let num = (math === "Add") ? 1 : -1;
                if (type === "wounds") {
                    wounds += num;
                } else {
                    strain += num;
                }
                await token.actor.update({ "data.stats.wounds.value": wounds, "data.stats.strain.value": strain });
                break;
        }

    };
}


let dialogEditor = new Dialog(
    {
        title: `Adjust Wounds/Strain`,
        content: `Adjust health`,
        buttons: {
            maxWounds: {
                icon: '<i class="fas fa-angle-double-up"></i>',
                label: `Wounds`,
                callback: () => {
                    updateTokensHealth("max", "none", "wounds");
                    dialogEditor.render(true);
                }
            },
            resetWounds: {
                icon: '<i class="fas fa-angle-double-down"></i>',
                label: `Wounds`,
                callback: () => {
                    updateTokensHealth("min", "none", "wounds");
                    dialogEditor.render(true);
                }
            },
            addWounds: {
                icon: '<i class="fas fa-plus"></i>',
                label: `Wounds`,
                callback: () => {
                    updateTokensHealth("none", "Add", "wounds");
                    dialogEditor.render(true);
                }
            },
            subWounds: {
                icon: '<i class="fas fa-minus"></i>',
                label: `Wounds`,
                callback: () => {
                    updateTokensHealth("none", "Sub", "wounds");
                    dialogEditor.render(true);
                }
            },
            maxStrain: {
                icon: '<i class="fas fa-angle-double-up"></i>',
                label: `Strain`,
                callback: () => {
                    updateTokensHealth("max", "none", "strain");
                    dialogEditor.render(true);
                }
            },
            resetStrain: {
                icon: '<i class="fas fa-angle-double-down"></i>',
                label: `Strain`,
                callback: () => {
                    updateTokensHealth("min", "none", "strain");
                    dialogEditor.render(true);
                }
            },
            addStrain: {
                icon: '<i class="fas fa-plus"></i>',
                label: `Strain`,
                callback: () => {
                    updateTokensHealth("none", "Add", "strain");
                    dialogEditor.render(true);
                }
            },
            subStrain: {
                icon: '<i class="fas fa-minus"></i>',
                label: `Strain`,
                callback: () => {
                    updateTokensHealth("none", "Sub", "strain");
                    dialogEditor.render(true);
                }
            },
        },

        default: "close",
        close: () => { },
    }, {
    // options
    width: 310,
    height: 220,
}

);

dialogEditor.render(true)