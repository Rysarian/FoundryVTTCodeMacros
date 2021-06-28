//Modified from orcnog's code
//Adjust the src in each AudioHelper
let dialogEditor = new Dialog({
    title: `Door States`,
    content: `<p>Pick the state of the doors.</p>
    <form>
        <div class="group-form"><label for="doors">Select Door State:</label><select id="doors">
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Locked">Locked</option>
            </select>
        </div>  
    </form>`,
    buttons: {
        go: {
            label: `Change`,
            callback: async (html) => {
                let data = "";
                let door_state = html.find('#doors')[0].value;
                switch (door_state) {
                    case "Locked":
                        var doors = canvas.scene.walls.filter(wall => wall.data.door);
                        var updates = doors.map(door => { return { _id: door.id, ds: CONST.WALL_DOOR_STATES.LOCKED } });
                        await canvas.scene.updateEmbeddedDocuments("Wall", updates);
                        await AudioHelper.play({ src: "Assets/Audio/LockDoor.wav", volume: 0.7, autoplay: true, loop: false }, true);
                        break;
                    case "Closed":
                        var doors = canvas.scene.walls.filter(wall => wall.data.door);
                        var updates = doors.map(door => { return { _id: door.id, ds: CONST.WALL_DOOR_STATES.CLOSED } });
                        await canvas.scene.updateEmbeddedDocuments("Wall", updates);
                        await AudioHelper.play({ src: "Assets/Audio/CloseDoor.wav", volume: 0.7, autoplay: true, loop: false }, true);
                        break;
                    case "Open":
                        var doors = canvas.scene.walls.filter(wall => wall.data.door);
                        var updates = doors.map(door => { return { _id: door.id, ds: CONST.WALL_DOOR_STATES.OPEN } });
                        await canvas.scene.updateEmbeddedDocuments("Wall", updates);
                        await AudioHelper.play({ src: "Assets/Audio/OpenDoor.wav", volume: 0.7, autoplay: true, loop: false }, true);
                        break;
                    default:
                        break;
                }
            }
        }
    }
});
dialogEditor.render(true);