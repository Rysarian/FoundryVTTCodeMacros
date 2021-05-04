async function main() {
    if (canvas.tokens.controlled.length === 1) {
        let attacker = token.actor;
        let result = game.messages.filter(m => m.data.speaker.actor === attacker._id);
        let messageNum = result.length - 1;
        let message = result[messageNum];
        let weapon = message._roll.data;

        if (message._roll.ffg.success > 0) {
            let targets = message.user.targets;
            if (targets.size > 0) {
                let targetToken = await canvas.tokens.get(targets.ids[0]);
                let soak = parseInt(targetToken.actor.data.data.stats.soak.value);
                let oldWounds = parseInt(targetToken.actor.data.data.stats.wounds.value);
                let pierce = 0, breach = 0;

                let pierceList = await weapon.data.itemmodifier.filter(w => w.name.toLowerCase() === "pierce");
                let breachList = await weapon.data.itemmodifier.filter(w => w.name.toLowerCase() === "breach");

                if (pierceList.length > 0) {
                    pierce = pierceList[0].data.rank;
                }
                if (breachList.length > 0) {
                    breach = breachList[0].data.rank * 10;
                }

                let leftoverSoak = (soak - (pierce + breach));
                leftoverSoak = (leftoverSoak < 0) ? 0 : leftoverSoak;
                let baseDamage = (weapon.data?.damage?.adjusted) ? weapon.data.damage.adjusted : weapon.data.damage.value;
                let extraDamage = parseInt(message._roll.ffg.success);
                let totalDamage = parseInt(baseDamage + extraDamage);
                let wounds = (oldWounds + (totalDamage - leftoverSoak));
                await targetToken.actor.update({"data.stats.wounds.value": parseInt(wounds)});

            } else {
                ui.notifications.info("No tokens targeted.");
            }
        } else {
            ui.notifications.info("Attacker missed.");
        }
    } else {
        ui.notifications.info("Please select a single token.");
    }
}

main();