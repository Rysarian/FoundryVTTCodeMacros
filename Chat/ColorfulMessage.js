let color = "#000000";
let text = "";
let dialogEditor = new Dialog({
    title: `Color`,
    content: `
        <form>
            <div style="display: flex; align-content: center;">
                <label for="color" style="line-height: 25px;">Color:</label>
                <input type="color" value="${color}" id="color" style="margin-left: 10px;">
                <label for="color" style="line-height: 25px;">Message:</label>
                <textarea id="text" name="text" rows="4" cols="50" style="margin-left: 10px;">${text}</textarea>
            <div>
        </form>`,
    buttons: {
        close: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: (html) => {
                const newColor = html.find("#color").val();
                const newText = html.find("#text").val();
                ChatMessage.create({
                    content:
                        `<p style='color:${newColor}'>${newText}</p>`
                })
            }
        }
    },
    default: "close",
    close: () => { }
}).render(true);