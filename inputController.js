class InputController{
    constructor(){
    }

    checkInput(player){
        if (keyIsDown(LEFT_ARROW)){
          player.pushLeft();
        }
        else if (keyIsDown(RIGHT_ARROW)){
          player.pushRight();
        }
        else if (keyIsDown(32)){ // Space
          player.jump();
        }
    }
}