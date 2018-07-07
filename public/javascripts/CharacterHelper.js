const characterTemplate = {
    avatar: `<img class="avatar" src="%%IMAGE%%" />`,
    race: `<div class="char-row char-race">%%RACE%%</div>`,
    name: `<div class="char-row char-name"><a href="${baseLinkUrl}/character/%%CHARACTER_ID%%">%%FIRST_NAME%% <span class="char-name-second">%%LAST_NAME%% (%%LEVEL%%)</span></a></div>`,
    dynamicBar: `<div class="char-row char-dynamic-bar char-%%TYPE%%">
  <div class="char-bar-stat">%%CURRENT%% / %%MAX%%</div>
  <div class="char-bar" style="width: %%PERCENTAGE%%%;"></div>
  </div>`,
    stat: `<div class="char-stat">
  <dt>%%STAT%%</dt>
  <dd>%%VALUE%%</dd>
  </div>`,
    other: `<div class="char-info"><dt>%%KEY%%</dt><dd>%%VALUE%%</dd></div>`
}

const CharacterHelper = {
  template: characterTemplate,

  generateCharacterHTML: (character, edit=false) => {
    let output = `<div class="character" data-fs-id="${character.id}">
      <div class="edit-btn" data-fs-id="${character.id}">Edit</div>`;
    // Generate
    if (character.picture) {
        output += characterTemplate.avatar.replace('%%IMAGE%%', character.picture);
    }

    // Generate name
    const fullName = character.Name;
    const spaceIndex = fullName.indexOf(' ');
    let firstName = fullName;
    let lastName = '';

    if (spaceIndex > -1) {
        firstName = fullName.slice(0, spaceIndex);
        lastName = fullName.slice(spaceIndex);
    }

    output += characterTemplate.name
        .replace('%%CHARACTER_ID%%', character.id)
        .replace('%%LEVEL%%', (character.Level) ? character.Level : 1)
        .replace('%%FIRST_NAME%%', firstName)
        .replace('%%LAST_NAME%%', lastName);

    if (typeof character.Picture !== 'undefined' && character.Picture) {
        output += characterTemplate.avatar.replace('%%IMAGE%%', character.Picture);
    }

    // Generate race
    output += characterTemplate.race
        .replace('%%RACE%%', character.Race);

    // Generate HP
    const hpPercentage = ((character.HP / character.MaxHP) * 100).toFixed(2);
    output += characterTemplate.dynamicBar
        .replace('%%TYPE%%', 'hp')
        .replace('%%CURRENT%%', character.HP)
        .replace('%%MAX%%', character.MaxHP)
        .replace('%%PERCENTAGE%%', hpPercentage);

    // Generate Mana
    const manaPercentage = ((character.Mana / character.MaxMana) * 100).toFixed(2);
    output += characterTemplate.dynamicBar
        .replace('%%TYPE%%', 'mana')
        .replace('%%CURRENT%%', character.Mana)
        .replace('%%MAX%%', character.MaxMana)
        .replace('%%PERCENTAGE%%', manaPercentage);

    // Generate stats
    output += `<div class="char-stats">`;
    for (const stat in character.stats) {
        output += characterTemplate.stat
            .replace('%%STAT%%', stat)
            .replace('%%VALUE%%', character.stats[stat])
    }
    output += `</div>`;

    output += '</div>';

    return output;
  }
}