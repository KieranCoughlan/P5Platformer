let currentLevel; // A variable for the current level
let levels = [];  // A list for all levels;
let player;       // A variable for the player
let input;        // A variable for input processing
let fps = 30;     // Frame rate

function setup() {
    createCanvas(500, 300);
    frameRate(fps);
    
    setupLevels();
    currentLevel = levels[0];
   
    let playerSize = 20;
    let playerPos = createVector(playerSize / 2, 
                                 height - playerSize / 2);

    player = new PlayerController(playerPos, playerSize, 1, 50, 
                                  1 / fps, 100, 2000);
    input = new InputController();
}

function setupLevels(){
    let level0 = new Level();
    level0.platforms.push(new Platform(createVector(300, 200), 50, 50));

    levels.push(level0);
}

function draw() {
    currentLevel.draw();
    input.checkInput(player);
    player.move();
    currentLevel.checkPlayer(player);
    player.draw();
}