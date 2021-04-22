//Add as many buttons as needed for the player's soundboard
let dialogEditor = new Dialog({
  title: `Soundboard`,
  content: `Pick the sound effect.`,
  buttons: {
    guitar1: {
      label: `GUITAR 1`,
      callback: () => {
        AudioHelper.play({ src: "Assets/Music/Guitar-01.wav", volume: 1, autoplay: true, loop: false }, true);
        dialogEditor.render(true);
      }
    },
    guitar2: {
      label: `GUITAR 2`,
      callback: () => {
        AudioHelper.play({ src: "Assets/Music/Guitar-02.wav", volume: 1, autoplay: true, loop: false }, true);
        dialogEditor.render(true);
      }
    },
    close: {
      icon: "<i class='fas fa-tick'></i>",
      label: `Close`
    },
  },
  default: "close",
  close: () => {}
});

dialogEditor.render(true)
