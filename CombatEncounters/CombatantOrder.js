sync function main() {
    //Make sure there are selected tokens
    if (canvas.tokens.controlled.length === 0) {
        ui.notifications.error("Choose tokens in combat");
    }

    else {
        //Go through each selected token and add them to the combat tracker
        await canvas.tokens.toggleCombat();
        //Auto update the initiatives of certain combatants. Adjust names and initiative as needed.
        for (let combatant of game.combat.combatants) {
            switch (combatant.name) {
                case "Name1":
                    game.combat.updateCombatant({ _id: combatant._id, initiative: 3 })
                    break;
                case "Name2":
                    game.combat.updateCombatant({ _id: combatant._id, initiative: 2 })
                    break;
                case "Name3":
                    game.combat.updateCombatant({ _id: combatant._id, initiative: 1 })
                    break;
                default:
                    break;
            }
        }
    }
}
main();
