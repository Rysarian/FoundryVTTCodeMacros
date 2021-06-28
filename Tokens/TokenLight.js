let color = "#000000";
let alpha = 1.0;
let tokens = canvas.tokens.controlled;
if (tokens.length === 1) {
    color = tokens[0].data.lightColor;
    alpha = tokens[0].data.lightAlpha;
}

const torchAnimation = { type: "torch", speed: 1, intensity: 1 };
const energyShield = { type: "energy", speed: 1, intensity: 1 };
const lights = {
    none: {
        label: "None",
        data: { dimLight: 0, brightLight: 0, lightAngle: 360, lightAnimation: { type: "none" }  }
    },
    low: {
        label: "Low",
        data: { dimLight: 5, brightLight: 0, lightAngle: 360, lightAnimation: { type: "none" } }
    },
    illuminator: {
        label: "Illuminator",
        data: { dimLight: 30, brightLight: 15, lightAngle: 360, lightAnimation: { type: "none" } }
    },
    candle: {
        label: "Candle",
        data: { dimLight: 10, brightLight: 5, lightAngle: 360, lightAnimation: torchAnimation }
    },
    shield: {
        label: "Shield",
        data: { dimLight: 1, brightLight: 0, lightAngle: 360, lightAnimation: energyShield }
    },
    spotlight: {
        label: "Spotlight",
        data: { dimLight: 50, brightLight: 25, lightAngle: 45, lightAnimation: { type: "none" } }
    }
};

function getLights() {
    let lightButtons = {};
    Object.entries(lights).forEach(([key, light]) => {
        lightButtons[key] = {
            label: light.label,
            callback: (html) => {
                const newColor = html.find("#color").val();
                const newAlpha = parseFloat(html.find("#alpha").val()).toFixed(1);
                var data = light.data;
                tokens.forEach(t => {
                    canvas.scene.updateEmbeddedDocuments("Token", [{_id: t.id, lightColor: newColor, lightAlpha: 1, 
                        dimLight: data.dimLight, brightLight: data.brightLight, lightAngle: data.lightAngle, 
                        lightAnimation: data.lightAnimation}]);
                });
                
                dialogEditor.render(true);
            }
        }
    });

    lightButtons = Object.assign(lightButtons);

    return lightButtons;
}

let dialogEditor = new Dialog({
    title: `Token Light Picker`,
    content: `
        <form>
            <div style="display: flex; align-content: center;">
            <label for="color" style="line-height: 25px;">Color:</label>
            <input type="color" value="${color}" id="color" style="margin-left: 10px;">
            <label for="alpha" style="line-height: 25px;">Intensity:</label>
            <input type="range" value="${alpha}" id="alpha" style="margin-left: 10px;" min="0.0" max="1.0" step="0.05">
            </div>
        </form>`,
    buttons: getLights(),
    default: "close",
    close: () => { }
}).render(true);