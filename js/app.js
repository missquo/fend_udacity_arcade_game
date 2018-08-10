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
	if (this.x < 500) {
		this.x = this.x + (this.speed * dt);
	} else {
		this.x = -200;
	}
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
	this.xmovement = 101;
	this.ymovement = 83;
	this.xmin = 1;
	this.xmax = 405;
	this.ytop = -20;
	this.ybottom = 395;
	this.sprite = 'images/purpl.png';
	this.gameover = false;
	this.handleInput = keypress => {
		console.log(this.gameover);
		if (!this.gameover) {
			switch (true) {
			case (keypress == 'left' && this.x > this.xmin):
				this.x = this.x - this.xmovement;
				break;
			case (keypress == 'right' && this.x < this.xmax):
				this.x = this.x + this.xmovement;
				break;
			case (keypress == 'up' && this.y > this.ytop):
				this.y = this.y - this.ymovement;
				break;
			case (keypress == 'down' && this.y < this.ybottom):
				this.y = this.y + this.ymovement;
				break;
			}
		}
	};

	this.update = () => {
		// Set range for collision 
		this.xrange = enemylocation => {
			let range = 55;
			return enemylocation <= (this.x + range) && enemylocation >= (this.x - range);
		};
		// Detect collision detection
		allEnemies.forEach(ladybug => {
			if (this.y == ladybug.y && this.xrange(ladybug.x)) {
				this.sprite = 'images/squash.png';
				// End of game display
				this.endGame('lose');
			}
		});
		// End of game display
		if (this.y == this.ytop) {
			this.endGame('win');
		}
	};

	this.render = () => {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyone = new Enemy(145, 1, 63);
var enemytwo = new Enemy(145, 250, 63);
var enemythree = new Enemy(170, 50, 146);
var enemyfour = new Enemy(130, 450, 229);
var enemyfive = new Enemy(130, 110, 229);

let allEnemies = [enemyone, enemytwo, enemythree, enemyfour, enemyfive];
let player = new Player(203, 395);



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
