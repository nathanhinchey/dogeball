(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  if (typeof Asteroids.Util === "undefined"){
    window.Asteroids.Util = {};
  }

  window.Asteroids.Util.inherits = function(ChildClass, ParentClass){
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  window.Asteroids.normalize = function(vector) {
    var magnitude = Asteroids.magnitude(vector);

    return [vector[0]/magnitude, vector[1]/magnitude]
  };

  window.Asteroids.magnitude = function(vector) {
    var dX = vector[0]
    var dY = vector[1]
    return Math.sqrt( (dX * dX) + (dY * dY) );

    return [vector[0]/magnitude, vector[1]/magnitude]
  }

})();
