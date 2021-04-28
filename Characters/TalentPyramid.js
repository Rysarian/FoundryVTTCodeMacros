
/* 
When using this macro:
** DO NOT drag multiple copies of talents on one character sheet
** DO NOT change the Tier on the character's talent when increasing the rank
** DO change the rank accordingly to how many ranks have been purchased
** This assumes the pyramid structure is being followed and will loop through based
** on how many Tier 1s the character has.
*/
let t1List = [], t2List = [], t3List = [], t4List = [], t5List = [];

//Adds the talent to the list according to tier
async function addToList(tier, talent) {
    if(tier > 5) {
        tier = 5;
    }
    switch (tier) {
        case 1:
            t1List.push(talent);
            break;
        case 2:
            t2List.push(talent);
            break;
        case 3:
            t3List.push(talent);
            break;
        case 4:
            t4List.push(talent);
            break;
        case 5:
            t5List.push(talent);
            break;

        default:
            break;
    }
}

async function main() {
    //Get all character talents
    let tList = token.actor.data.data.talentList;

    //Go through talent list to sort them into respective lists.
    for (let i = 0; i < tList.length; i++) {
        await addToList(parseInt(tList[i].tier), tList[i]);
        if (tList[i].isRanked) {
            for (let j = 1; j < tList[i].rank; j++) {
                await addToList(parseInt(tList[i].tier) + j, tList[i]);

            }
        }
    }


    let talentPyramid = "";

    //Add html text for dialog display
    for (let a = 0; a < t1List.length; a++) {
        let One, Two, Three, Four, Five;

        //Set any nulls to blank text
        if (t1List[a] != null) {
            One = await t1List[a].name;
        } else {
            One = "";
        }
        if (t2List[a - 1] != null && a > 0) {
            Two = await t2List[a - 1].name;
        } else {
            Two = "";
        }
        if (t3List[a - 2] != null) {
            Three = await t3List[a - 2].name;
        } else {
            Three = "";
        }
        if (t4List[a - 3] != null) {
            Four = await t4List[a - 3].name;
        } else {
            Four = "";
        }
        if (t5List[a - 4] != null) {
            Five = await t5List[a - 4].name;
        } else {
            Five = "";
        }

        //Format the pyramid
        switch (a) {
            case 0:
                talentPyramid += `<tr>
                <td>${One}</td>
                <td class="Empty"> </td>
                <td class="Empty"> </td>
                <td class="Empty"> </td>
                <td class="Empty"> </td>
                </tr>`
                break;
            case 1:
                talentPyramid += `<tr>
                <td>${One}</td>
                <td>${Two} </td>
                <td class="Empty"> </td>
                <td class="Empty"> </td>
                <td class="Empty"> </td>
                </tr>`
                break;
            case 2:
                talentPyramid += `<tr>
                <td>${One}</td>
                <td>${Two} </td>
                <td>${Three} </td>
                <td class="Empty"> </td>
                <td class="Empty"> </td>
                </tr>`
                break;
            case 3:
                talentPyramid += `<tr>
                <td>${One}</td>
                <td>${Two} </td>
                <td>${Three} </td>
                <td>${Four} </td>
                <td class="Empty"> </td>
                </tr>`
                break;
            default:
                talentPyramid += `<tr>
                <td>${One}</td>
                <td>${Two} </td>
                <td>${Three} </td>
                <td>${Four} </td>
                <td>${Five} </td>
                </tr>`
                break;
        }

    }

    let d = new Dialog({
        title: "Talent Pyramid",
        content: `<style type="text/css">
        .Empty {
            background-color: black;
            border: 1px solid black;
            color: white;
        }
    
        td {
            text-align: center;
        }
    </style>
        <table border="1">
        <tr>
            <th>Tier 1</th>
            <th>Tier 2</th>
            <th>Tier 3</th>
            <th>Tier 4</th>
            <th>Tier 5</th>
        </tr>
        ${talentPyramid}
    </table>`,
        buttons: {
            close: {
                icon: '<i class="fas fa-times"></i>',
                label: "Close",
                callback: () => console.log("Chose Two")
            }
        },
        default: "two",
        close: () => console.log("This always is logged no matter which option is chosen")
    });
    d.render(true);
}

if(canvas.tokens.controlled.length != 1 ) {
    ui.notifications.warn("Please select a single token.");
} else {
    main();
}