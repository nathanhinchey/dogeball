(function() {

  var BULLET_SPEED = -10;

  var DEFAULTS = {
    radius: 3,
    color: "#FF0",
    lineWidth: 4,
  }

  var Bullet = window.Asteroids.Bullet = function(game) {
    var vector = game.ship.facingVector();
    DEFAULTS.vel = [
      vector[0] * BULLET_SPEED + game.ship.velocity[0],
      vector[1] * BULLET_SPEED + game.ship.velocity[1]
    ];
    setTimeout(function(){
      var index = this.game.bullets.indexOf(this);
      if (index > -1){
        this.game.bullets.splice(index, 1)
      }
    }.bind(this), 600);
    DEFAULTS.pos = Bullet.startingBulletPos(game);
    DEFAULTS.game = game;

    window.Asteroids.MovingObject.call(this, DEFAULTS);
  }

  Bullet.startingBulletPos = function(game) {
    var ship = game.ship;
    return [
      ship.pos[0] + ship.facingVector()[0] * (-ship.radius - DEFAULTS.radius),
      ship.pos[1] + ship.facingVector()[1] * (-ship.radius - DEFAULTS.radius)
    ];
  }

  Bullet.normalize = function(vector) {
    var dX = vector[0]
    var dY = vector[1]
    var magnitude = Math.sqrt( (dX * dX) + (dY * dY) );

    return [vector[0]/magnitude, vector[1]/magnitude]
  }

  window.Asteroids.Util.inherits(Bullet, window.Asteroids.MovingObject);

})();
