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
	this.gameOver;
	// Handles player movement
	this.handleInput = keypress => {
		if (!this.gameOver) {
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

	// Watches player to detect collision or game win
	this.update = () => {
		// Set range for collision 
		this.xrange = enemyLocation => {
			let range = 75;
			return enemyLocation <= (this.x + range) && enemyLocation >= (this.x - range);
		};
		// Detect collision
		allEnemies.forEach(ladybug => {
			if (this.y == ladybug.y && this.xrange(ladybug.x)) {
				this.sprite = 'images/squash.png';
				// Lost game modal
				this.gameOver = 'lose';
				setTimeout(() => {gameEnd(this.gameOver);}, 500);
			}
		});
		// Won game modal
		if (this.y == this.ytop) {
			this.gameOver = 'win';
			setTimeout(() => {gameEnd(this.gameOver);}, 500);
		}
	};

	// Renders player
	this.render = () => {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	// Resets player after win
	this.reset = () => {
		this.x = 203;
		this.y = 395;
	};
};

// Loads game end modal
var gameEnd = (status) => {
	let modal = document.querySelector('#modal');
	modal.classList.add('modal');
	let text = '';
	if (status == 'win') {
		text = 'Congratulations!<br>You win!';
		player.reset();
	} else {
		text = 'Sorry!<br>You\'ve lost!';
	}
	let headline = document.querySelector('#gameMessage');
	headline.innerHTML = text;
	let button = document.querySelector('span');
	button.classList.add('button');
	button.textContent = 'Play again?';
	button.addEventListener('click', () => {
		location.reload();
	});
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyone = new Enemy(145, 1, 63);
var enemytwo = new Enemy(145, 250, 63);
var enemythree = new Enemy(230, 50, 146);
var enemyfour = new Enemy(180, 450, 229);
var enemyfive = new Enemy(180, 110, 229);
var allEnemies = [enemyone, enemytwo, enemythree, enemyfour, enemyfive];
var player = new Player(203, 395);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});