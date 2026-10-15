// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'quizspin',            // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Quizspin',            // the name players will see
  team: 'Group 7 (3-1)',            // your group's name and section, for example Bookworms (3-1)
  developer: 'revangealone-eng',       // YOUR GitHub username: this build is yours
  description: 'Players spin a wheel to get a question category, answer the question correctly, and earn points to win.',     // one sentence about how the game is played
  min_players: 1,               // change to the limits your game is designed for
  max_players: 30,
  version: pkg.version,         // read from package.json, do not edit here
};
