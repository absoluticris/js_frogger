var Enemy = function(initX, initY) {
    // Variables for the instances
    this.sprite = 'images/enemy-bug.png';
    this.x = initX;
    this.y = initY;
    this.speed = Math.floor(Math.random() * (100 - 175) + 175);
};

// Method for updating the enemy's position
Enemy.prototype.update = function(dt) {
    if (this.x > 480) {
        this.x = Math.floor(Math.random() * 25);
    }
    this.x = this.x + this.speed * 2 * dt;
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(initX, initY) {
    this.x = initX;
    this.y = initY;
    this.sprite = 'images/char-boy.png';
};

// Player movement and collision detection against the enemies and water
Player.prototype.update = function() {
    if (this.y == 17.5) {
        this.reset();
    }
    for (var i = 0; i <= allEnemies.length - 1; i++) {
        if (allEnemies[i].x < this.x + 50 &&
            allEnemies[i].x + 50 > this.x &&
            allEnemies[i].y < this.y + 60 &&
            60 + allEnemies[i].y > this.y) {
            this.x = 310;
            this.y = 430;

        }
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Listens to key presses and moves the player
Player.prototype.handleInput = function(direction) {

    this.direction = direction;
    if (this.direction == 'left' && this.x > 101) {
        this.x -= 100;
    }
    if (this.direction == 'up' && this.y > 25) {
        this.y -= 82.5;
    }
    if (this.direction == 'right' && this.x < 404) {
        this.x += 100;
    }
    if (this.direction == 'down' && this.y < 430) {
        this.y += 82.5;
    }


};

// Initialization of enemies
var allEnemies = [];
x = 30;
y = 70;
for (var i = 0; i <= 2; i++) {
    var enemy = new Enemy(x, y);
    allEnemies.push(enemy);
    x = Math.floor(Math.random() * 480);
    y += 75;
};

// Initialization of the player
var player = new Player(310, 430);

// Player reset
Player.prototype.reset = function() {
    this.x = 310;
    this.y = 430;
};

// Key press listeners
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        // WASD Movement   
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});