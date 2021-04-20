let dialogEditor = new Dialog({
  title: `Dice Mods`,
  content: `Pick the dice mod.`,
  buttons: {
    boostAdd: {
      label: `Add Boost`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
          token.toggleEffect("Assets/Icons/SW_add_boost.png", true);
        }
        dialogEditor.render(true);
      }
    },
    boostSub: {
      label: `Remove Boost`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_sub_boost.png");
        }
        dialogEditor.render(true);
      }
    },
    abilityAdd: {
      label: `Add Ability`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_add_ability.png");
        }
        dialogEditor.render(true);
      }
    },
    abilitySub: {
      label: `Remove Ability`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_sub_ability.png");
        }
        dialogEditor.render(true);
      }
    },
    challengeAdd: {
      label: `Add Challenge`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_add_challenge.png");
        }
        dialogEditor.render(true);
      }
    },
    challengeSub: {
      label: `Remove Challenge`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_sub_challenge.png");
        }
        dialogEditor.render(true);
      }
    },
    difficultyAdd: {
      label: `Add Difficulty`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_add_difficulty.png");
        }
        dialogEditor.render(true);
      }
    },
    difficultySub: {
      label: `Remove Difficulty`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_sub_difficulty.png");
        }
        dialogEditor.render(true);
      }
    },
    proficiencyAdd: {
      label: `Add Proficiency`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_add_proficiency.png");
        }
        dialogEditor.render(true);
      }
    },
    proficiencySub: {
      label: `Remove Proficiency`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_sub_proficiency.png");
        }
        dialogEditor.render(true);
      }
    },
    setbackAdd: {
      label: `Add Setback`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_add_setback.png");
        }
        dialogEditor.render(true);
      }
    },
    setbackSub: {
      label: `Remove Setback`,
      callback: () => {
        for(const token of canvas.tokens.controlled) {
        token.toggleEffect("Assets/Icons/SW_sub_setback.png");
        }
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
