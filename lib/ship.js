(function() {

  var DEFAULTS = {
    color: "white",
    lineWidth: 1.5,
    radius: 20,
    vel: [0,0],
    maxVel: 8,
    acc: -1,
    dragCoefficient: 0.008
  }

  var Ship = window.Asteroids.Ship = function(pos,game) {
    DEFAULTS.pos = pos;
    DEFAULTS.game = game;
    window.Asteroids.MovingObject.call(this, DEFAULTS);
  };

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.prototype.die = function(){
    if (this.game.lives > 0){
      this.game.lives--;
      this.relocate();
    } else {
      this.game.gameOver();
    }
  }

  Ship.prototype.relocate = function () {
    this.pos = game.randomPosition();
    this.velocity = [0,0];
  };

  Ship.prototype.triangle = true;

  Ship.prototype.facing = 0.0;

  Ship.prototype.thrust = function () {
    var direction = this.facingVector();
    var newVel = [
      this.velocity[0] + DEFAULTS.acc * direction[0],
      this.velocity[1] + DEFAULTS.acc * direction[1]
    ]
    if (Asteroids.magnitude(newVel) <= DEFAULTS.maxVel){
      this.velocity = newVel;
    }
  };

  Ship.prototype.turn = function (radians) {
    this.facing = (this.facing + radians) % (2 * Math.PI);
  };

  Ship.prototype.drag = function () {
    this.velocity[0] *= (1 - DEFAULTS.dragCoefficient);
    this.velocity[1] *= (1 - DEFAULTS.dragCoefficient);
  };


  Ship.prototype.facingVector = function () {
    return [Math.sin(this.facing), Math.cos(this.facing)]
  };

  Ship.prototype.fireBullet = function() {
    this.game.bullets.concat(new Bullet(this.game));

  };

})();
