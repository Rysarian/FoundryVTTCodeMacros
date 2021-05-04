if (canvas.tokens.objects.children.length === 0) {
    ui.notifications.error("There are no tokens on this scene");
} else {
    let adversaryList = "";
    for (let token of canvas.tokens.objects.children) {
        if (token.actor != null) {
            if (token.visible) {
                let _adversaryType = "";
                let _adversaryValue = 0, _defencemelee = 0, _defenceranged = 0, _soak = 0;
                for (let talents of token.actor.data.items) {
                    if (talents.name == "Adversary") {
                        _adversaryValue = talents.data.ranks.current;
                    };
                };

                _adversaryType = token.actor.data.type.charAt(0).toUpperCase() + token.actor.data.type.substr(1).toLowerCase();

                if (_adversaryType === "Character" || _adversaryType === "Minion") {
                    _defencemelee = token.actor.data.data.stats.defence.melee;
                    _defenceranged = token.actor.data.data.stats.defence.ranged;
                    _soak = parseInt(token.actor.data.data.stats.soak.value);
                } else if (_adversaryType === "Vehicle") {
                    //This needs to be adjusted if all four parts of the shield are going to be used.
                    _defencemelee = _defenceranged = token.actor.data.data.stats.shields.fore;
                }
                adversaryList += "<tr><td><strong>" + token.actor.name + "</strong></td><td>";
                adversaryList += _adversaryType;
                adversaryList += "</td><td>";
                if (_adversaryValue != 0) { adversaryList += +_adversaryValue };
                adversaryList += "</td><td>";
                if (_defencemelee != 0) { adversaryList += _defencemelee; };
                adversaryList += "</td><td>";
                if (_defenceranged != 0) { adversaryList += _defenceranged; };
                adversaryList += "</td><td>";
                if (_soak != 0) { adversaryList += _soak; };
                adversaryList += "</td></tr>";
            }
        }
    };


    new Dialog({
        title: `Adversary levels`,
        content: `
        <style>
    td {
        text-align: center;
        border: 1px black solid;
    }
    th {
        text-align: center;
        border: 1px black solid;
        font-size: 18px;
    }
</style>
<form>
    <div class="form-group">
        <label>Those have Adversary talent:</label>
    </div>
    <div class="form-group">
        <table>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Adv.</th>
                <th>Def-M</th>
                <th>Def-R</th>
                <th>Soak</th>
            </tr>
            ` + adversaryList + `
        </table>
    </div>
</form>
        `,
        buttons: {
            Cancel: {
                icon: "<i class='fas fa-times'></i>",
                label: `Close`
            },
        },
        default: "Cancel",
        close: html => {

        }
    }).render(true);
}
