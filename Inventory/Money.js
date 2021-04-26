//Adjusted from saethone's macro
let d = new Dialog({
    title: "Random Credits",
    content: `<p>Enter a rough number of currency, and the total number of players</p>
    <div class="grid grid-2col">
        <div style="grid-column-start: 1; grid-column-end: 3;">
            <p>Name:</p> <input name="currency" class="currency" type="text" value="Credits" data-dtype="String" />
        </div>
        <div>
            <div>
                <p>Count:</p> <input name="credits" class="credits" type="number" value="25" data-dtype="String" />
            </div>
            <div>
                <p>Players:</p> <input name="players" class="players" type="number" value="4" data-dtype="String" />
            </div>
        </div>
        <div>
            <div>
                <p>Low Percent:</p> <input name="lowpercent" class="lowpercent" type="number" value="0.5"
                    data-dtype="String" />
            </div>
            <div>
                <p>High Percent:</p> <input name="highpercent" class="highpercent" type="number" value="1.25"
                    data-dtype="String" />
            </div>
        </div>
    </div>`,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Roll Credits",
            callback: (html) => {
                let credits = parseInt(html.find(".credits").val(), 10);
                if (isNaN(credits)) { credits = 0; }
                let players = parseInt(html.find(".players").val(), 10);
                if (isNaN(players)) { players = 1; }
                let lowpercent = html.find(".lowpercent").val();
                if (isNaN(lowpercent)) { lowpercent = 0; }
                let highpercent = html.find(".highpercent").val();
                if (isNaN(highpercent)) { highpercent = 1; }
                let currencyName = html.find(".currency").val();
                let lowcredits = Math.floor(credits * lowpercent);
                let highcredits = Math.floor(credits * highpercent);
                credits = Math.floor((Math.random() * (highcredits - lowcredits)) + lowcredits);
                let playerCredits = Math.floor(credits / players);
                let leftovers = credits % players;
                let extraMessage = "";
                if (leftovers > 0) {
                    extraMessage = ` with <span style="font-weight:bold; background:#FFFF99">` + leftovers + `</span> left over`;
                }

                let message = '<div>The players found <span style="font-weight:bold; background:#FFFF99">' + credits + '</span> ' + currencyName + '! Thats <span style="font-weight:bold; background:#FFFF99">' + playerCredits + '</span> for each of the <span style="font-weight:bold; background:#FFFF99">' + players + '</span> players' + extraMessage + '.</div>';
                let chatData = {
                    user: game.user.id,
                    speaker: game.user,
                    content: message
                };
                ChatMessage.create(chatData, {});
            }
        },
        two: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => console.log("Closed Credits")
        }
    },
    default: "two",
    close: () => console.log("This always is logged no matter which option is chosen")
});
d.render(true);
