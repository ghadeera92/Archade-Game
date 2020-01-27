// Enemy (cockroaches) class with properities: x axis, y axis, speed and enemy image
let Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x= x;
    this.y = y;
    this.speed= speed;
    // to determine the start and the end of the game bard..
    this.boardEnd= 510;
    this.boardStart= 0;
};

// Method to choose random speed for enemy.
function speed() {
  let speedsArray = [50, 100, 200];
  return speedsArray[Math.floor(Math.random() * speedsArray.length)];
};

// Method to choose random y-axis for enemy.
function y() {
  let yArray = [60, 145, 230];
  return yArray[Math.floor(Math.random() * yArray.length)];
};

// Method to update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    // reset the enemy when reach the end of the game board..
    if (this.x >= this.boardEnd)
        this.reset();
    // go to the following function to check if any collision happened ..
    this.checkCollisions();
};

// Method to check if any collision happened..
// if there are any collision reset player position.
Enemy.prototype.checkCollisions = function(){
    if (player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y + 40 &&
        40 + player.y > this.y) {
        player.reset();
      };
};

// Method to reset enemy position and speed
Enemy.prototype.reset = function() {
    this.x = this.boardStart;
    this.y = y();
    this.speed= speed();
};

// Method to draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class with properities: x-axis and y-axix and player image
let Player = function() {
   this.sprite = 'images/char-princess-girl.png';
   this.x = 200;
   this.y = 400;
};

// Method to reset player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
  };

// Method to Render the player on the canvas
Player.prototype.render = function()  {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Method to update the status of the player.
Player.prototype.update = function() {
      this.win();
};

// Method to alert the player when he/she wins..
Player.prototype.win = function() {
if(this.y == 0) {
  alert('Congratulations! you made it!');
  this.reset();
  };
};

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Method to handle key presses and react to it.
Player.prototype.handleInput = function(arrowPressed) {

      if (arrowPressed == 'left' && this.x > 0)
          this.x -= 100;

      if (arrowPressed == 'right' && this.x < 400)
          this.x += 100;

      if (arrowPressed == 'up' && this.y > 0)
          this.y -= 80;

      if (arrowPressed == 'down' && this.y < 400)
          this.y += 80;
};


// Array to handle all enemies
let allEnemies = [];
// Enemy object
let enemy;
// Player object
let player;

// Function to start the Game
function init(){
    // add enemy object to the array
    for (let i = 0; i <= 3; i++) {
      enemy = new Enemy (0, y(), speed());
      allEnemies.push(enemy);
    };

    player = new Player ();
};

init();
