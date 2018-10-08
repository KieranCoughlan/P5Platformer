class inputController{
    constructor(player, pushStrength){
      this.player = player;
      this.pushStrength = pushStrength;
    }

    checkInput(){
        if (keyIsDown(LEFT_ARROW)){
          this.player.addForce(createVector(-this.pushStrength, 0.0));
        }
        else if (keyIsDown(RIGHT_ARROW)){
          this.player.addForce(createVector(this.pushStrength, 0.0));
        }
    }
}