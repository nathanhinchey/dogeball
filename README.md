#Asteroids
[Live Version!](https://nathanhinchey.github.io/asteroids)

This is an asteroids game implemented with JavaScript and HTML canvas.

I used [JQuery](https://github.com/jquery/jquery) and  [keymaster](https://github.com/madrobby/keymaster).

##Window scaling
I made a [how-to guide](../how-to-guides/blob/master/canvas_size.md#making-an-html-canvas-fill-window) on making an HTML canvas fill the window.

##Drawing the ship
I used some basic trigonometric functions and context#draw to draw the ship. The ship is constructed of a circle circumscribing a triangle drawn between three points. The locations for the points are calculated by:
* Adding the facing to an angle determining where on the circle I want a point
* Converting the facing to a unit vector with a custom vector function
* Multiplying that unit vector by the radius

##Movement
I used the `key::isPressed` function from the keymaster library to listen to when an arrow key is held down, and increment a value every frame during that time
###Turning
When left-arrow or right-arrow are held, a small radian value is passed to the `Ship#turn` function every frame. Ship#turn modifies facing accordingly.
###Acceleration
When up-arrow is held, `Ship#thrust` is called. `Ship#thrust` checks whether acceleration in the direction that the ship is facing will exceed the maximum speed, and if not it increased adds the current `facing` as a unit vector, multiplied by the acceleration constant, to the current velocity.

##Firing bullets
Bullets take the unit vector version of the ship's current facing and position in their initialization. Bullets set their initial position to be `their radius + (the ship's radius + the ship's position) * ship facing`. Bullet initial velocity is the ship's facing's unit vector multiplied by their velocity constant.

Bullets are destroyed after 600ms by splicing themselves out of the game's bullets array. They can also be destroyed when the make contact with an asteroid.

#Next steps
There are several pieces I want to add.
##Collisions
Currently, the ship is drawn inside a visible circle, because taht shows where the hit box actually is. Removing the visible circle would be trivial, but I want to make collisions respond to the actual position of the triangle before doing that.
##Extra lives
An easy feature to implement will be incrementing lives every *n* points.
##Continual game play
Currently, the game ends when you destroy all the initial asteroids. I'll add a check to find if the game's `asteroids` array is empty, and if so spawn new asteroids.
##Initial invincibility
In classic *Asteroids*, the ship has a brief grace period upon spawn. I like that design feature, and it could be implemented with a simple setTimeout and a `indestructible` boolean.
