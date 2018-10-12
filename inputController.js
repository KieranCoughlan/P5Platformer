class InputController{
    constructor(player, pushStrength, jumpStrength){
      this.player = player;
      this.pushStrength = pushStrength;
      this.jumpStrength = jumpStrength;
    }

    checkInput(){
        if (keyIsDown(LEFT_ARROW)){
          this.player.addForce(createVector(-this.pushStrength, 0.0));
        }
        else if (keyIsDown(RIGHT_ARROW)){
          this.player.addForce(createVector(this.pushStrength, 0.0));
        }
        else if (keyIsDown(UP_ARROW)){
          this.player.addForce(createVector(0.0, -this.jumpStrength));
        }
    }
}