<p>Changes need to happen on 3 files.</p>
<ul>
    <li>modules/polyglot/polyglot.js</li>
    <li>systems/starwarsffg/templates/actors/ffg-adversary-sheet.html</li>
    <li>systems/starwarsffg/templates/actors/ffg-character-sheet.html</li>
</ul>
<p>In the Polyglot file, in the switch statement inside the updateUserLanguages function, the default case needs to be
    changed.</p>
    
```
    default:
        // Don't duplicate the value in case it's a not an array
        for (let lang of actor.data.data.description.languages.split(/[,;]/)) {
            this.known_languages.add(lang);
        }

        // This condition is needed so an empty language is not loaded
        console.log(actor.data.data.description.languages.custom);
        if (actor.data.data.description.languages.custom != "") {
            for (let lang of actor.data.data.description.languages.custom.split(/[,;]/)) {
                this.known_languages.add(lang.trim().toLowerCase());
            }

        }
        break;
```

<p>This will pick up the languages from the sections we will add to the character sheets.</p>
<p>In both of the character and adversary sheets, I added the language input to the biography tab but may be added
    elsewhere on the sheet. I added these two lines:</p>

  ```
  <label>Languages</label>
  <input name="data.description.languages" type="text" value="{{data.description.languages}}" />
  ```

<p>This should add an input on the character sheets. Use a comma separated list for it to work. I would recommend no spaces in between the comma and next language. 
    Haven't tested that too much so not too sure if spaces keep it from working.</p>
<p>
    After you have added the languages to a character, click on the token and in the chat box there should be a language dropdown with a list of that character's languages.
    If that is populated with the correct values, you should be good to go.
</p>
