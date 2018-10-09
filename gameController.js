let currentLevel; // A variable for the current level
let levels = [];  // A list for all levels;
let player;       // A variable for the player
let input;       // A variable for input processing
let fps = 30;     // Frame rate

function setup() {
    createCanvas(500, 300);
    frameRate(fps);
    
    levels.push(new Level());
    currentLevel = levels[0];
   
    let playerSize = 20;
    let playerPos = createVector(playerSize / 2, 
                                 height - playerSize / 2);

    player = new PlayerController(playerPos, playerSize, 1, 1, 1 / fps);
    input = new InputController(player, 100);
}

function draw() {
    currentLevel.draw();
    input.checkInput();
    player.move();
    player.draw();
}