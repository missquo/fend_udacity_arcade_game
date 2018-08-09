// Enemies our player must avoid
var Enemy = function(speed, x, y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.speed = speed;
	this.x = x;
	this.y = y;

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/purpl.png';
	this.update = function (dt) {};
	this.render = function () {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}

}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyone = new Enemy(45, 1, 63);
var enemytwo = new Enemy(90, 150, 146);
var enemythree = new Enemy(135, 350, 229);

var allEnemies = [enemyone, enemytwo, enemythree];
var player = new Player(203, 405);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
