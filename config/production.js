module.exports = {
  routes: [
    { uri: '/dm', file: 'dm' },
    { uri: '/room', file: 'room' },
    { uri: '/', file: 'index' }
  ],
  navigation: {
    dashboard: [
      // { uri: '/', name: 'Dashboard', icon: 'ra-tower' },
      { uri: '/characters', name: 'Characters', icon: 'ra-double-team' },
      { uri: '/characters/template', name: 'Character Template', icon: 'ra-player-shot' },
    ]
  },
  characters: {
    template: [
      { name: 'Name', type: 'string', default: 'John Doe' },
      { name: 'Picture', type: 'picture' },
      { name: 'Level', type: 'number', default: 1 },
      { name: 'Race', type: 'options', values: ['Elf', 'Human', 'Dwarf', 'Dragonite', 'Pewpew'] },
      { name: 'HP', type: 'number', default: 20 },
      { name: 'MaxHP', type: 'number', default: 20 },
      { name: 'Mana', type: 'number', default: 10 },
      { name: 'MaxMana', type: 'number', default: 10 },
      { name: 'stats',
        type: 'stats',
        values: [
          { name: 'Strength', type: 'number', default: 4 },
          { name: 'Dexterity', type: 'number', default: 4 },
          { name: 'Wisdom', type: 'number', default: 4 },
          { name: 'Intelligence', type: 'number', default: 4 },
          { name: 'Stamina', type: 'number', default: 4 },
        ]
      }
    ]
  }
}