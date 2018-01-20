"use strict";

import Game from 'javascripts/game.js';

const App = {

  init: function() {
    return new Game(800, 600);
  }

};

module.exports = App;
