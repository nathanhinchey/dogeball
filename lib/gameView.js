;(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  $(window).resize(function() {
    window.Asteroids.Game.DIM_X = $(window).width();
    window.Asteroids.Game.DIM_Y = $(window).height();
    $("canvas").attr("width", window.Asteroids.Game.DIM_X);
    $("canvas").attr("height", window.Asteroids.Game.DIM_Y);
  });

  var GameView = window.Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    $("#toggle-rainbows").click(function(){
      $("body").toggleClass("bgRainbow");
      if ($("body").hasClass("bgRainbow")){
        $("#toggle-rainbows").html("rainbow off");
      } else {
        $("#toggle-rainbows").html("rainbow on ");
      }
      $("#toggle-rainbows").blur();
    });
  }

  GameView.prototype.start = function() {
    window.setInterval(this.game.step.bind(this.game), 20);
    window.setInterval(function(){
      this.game.draw(this.ctx)
    }.bind(this), 20);

    window.Asteroids.leftPressed = function(){
      return key.isPressed(37)
    };
    window.Asteroids.rightPressed = function(){
      return key.isPressed(39)
    };
    window.Asteroids.upPressed = function(){
      return key.isPressed(38)
    };

    key('space', function(){
      if (game.bullets.length < Asteroids.Game.MAX_BULLETS){
        bullet = new Asteroids.Bullet(this.game);
        this.game.bullets.push(bullet);
      }
    }.bind(this));

    key('1', function() { console.log(this.game.ship.pos) }.bind(this));
    key('2', function() { console.log(this.game.ship.facing) }.bind(this));
  }

})();
