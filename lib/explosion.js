;(function() {
  'use strict';

  function randomElement(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  };

  var COLORS = [
    "#FF0",
    "#F03",
    "#0F0",
    "#0FF",

  ];
  var FONTSIZES = [
    "16px",
    "20px",
    "24px",
    "28px"
  ];
  var TEXTS = [
    "such space",
    "wow.",
    "wow.",
    "very asteroids",
    "many laser",
    "much dogeball",
    "so game"
  ];
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Explosion = window.Asteroids.Explosion = function(pos, game){
    var defaults = {};

    defaults.radius = 40;
    defaults.game = game;
    defaults.color = "#F11";
    defaults.lineWidth = 3;
    var x = parseInt(pos[0], 10);
    var y = parseInt(pos[1], 10);
    defaults.pos = [x,y];
    defaults.vel = 0;

    window.Asteroids.MovingObject.call(this, defaults);

    this.text = randomElement(TEXTS);
    this.fontSize = randomElement(FONTSIZES);
    this.color = randomElement(COLORS);

    setTimeout(function(){
      var index = this.game.explosions.indexOf(this);
      if (index > -1){
        this.game.explosions.splice(index, 1)
      }
    }.bind(this), 1000);
  };

  window.Asteroids.Util.inherits(Explosion, window.Asteroids.MovingObject);
}());
