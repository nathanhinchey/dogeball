(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function(pos, game, size){
    var defaults = {};

    defaults.radius = size;
    defaults.game = game;
    defaults.color = "red";
    defaults.lineWidth = 2;
    defaults.pos = pos;
    defaults.vel = function(){
      var negX = Math.random() > .5 ? -1 : 1;
      var negY = Math.random() > .5 ? -1 : 1;

      return [Math.random() * 5 * negX, Math.random() * 5 * negY];
    }();

    window.Asteroids.MovingObject.call(this, defaults);
  }

  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.prototype.explode = function() {
    if (this.game.lives > 0){
      this.game.score++;
    }
    var index = this.game.asteroids.indexOf(this);
    this.game.asteroids.splice(index, 1);
    if (this.radius > 10){
      for (var i = 0; i < 3; i++){
        var babyPos = [
          this.pos[0] + (this.radius/2) * i,
          this.pos[1] + (this.radius/2) * i
        ]
        var baby = new window.Asteroids.Asteroid(
          babyPos,
          game,
          this.radius/2
        );
        this.game.asteroids.push(baby);
      }
    } else if (this.game.asteroids.length === 0) {
      this.game.seedAsteroids();
    }
  };

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof window.Asteroids.Ship) {
      otherObject.die();
    } else if (otherObject instanceof window.Asteroids.Bullet) {
      console.log("bullet collision");
      this.explode();
      var bulletIndex = this.game.bullets.indexOf(otherObject);
      this.game.bullets.splice(bulletIndex, 1);
    }else {
      // console.log("asteroid collision");
    }
  }

})();
