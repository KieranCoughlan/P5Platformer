let BOUNDARY_ABOVE = 0;
let BOUNDARY_BELOW = 1;
let BOUNDARY_LEFT = 2;
let BOUNDARY_RIGHT = 3;

class Boundary {
    constructor(type, pos, size) {
        this.type = type;
        this.pos = pos;
        this.size = size;
    }

    checkPlayer(player) {
        // Outside the bounds? Nothing to do
        if (this.inBounds(player) == false)
            return false;

        let touching = this.touching(player);
        let ahead = this.ahead(player.pos, player.size);

        if (ahead == true && touching == false) {
            // No contact
            return false;
        }

        // If we get here, we must be touching
        // the surface or behind it. Check if 
        // we started ahead of it
        let startedAhead = this.ahead(player.lastPos, player.size);
        if (startedAhead == false) {
            // We were behind all along, no contact
            // or crossing
            return false;
        }

        // Ok, after all that, we know
        // there's contact
        this.constrainPlayer(player);
        return true;
    }

    constrainPlayer(player){
 
        // Snap the player position to the surface
        if (this.type == BOUNDARY_ABOVE){
            player.pos.y = this.pos.y + player.size.y / 2;
        }
        else if (this.type == BOUNDARY_BELOW){
            player.pos.y = this.pos.y -  player.size.y / 2;
            player.onGround = true;
        }
        else if (this.type == BOUNDARY_LEFT){
            player.pos.x = this.pos.x +  player.size.x / 2;
        }
        else if (this.type == BOUNDARY_RIGHT){
            player.pos.x = this.pos.x -  player.size.x / 2;
        }

        // Stop it moving by setting
        // velocity to zero in the right direction
        if (this.isHorizontal()){
            player.v.y = 0;
        }
        else {
            player.v.x = 0;
        }
    }

    isHorizontal() {
        return this.type == BOUNDARY_ABOVE ||
            this.type == BOUNDARY_BELOW;
    }
 
    // Checks if the player is within the bounds
    // of the boundary
    inBounds(player) {
        
        if (this.isHorizontal()) {
            // Horizontal boundary, check x
            let tolerance = this.size / 2 + player.size.x / 2;

            let xMin = this.pos.x - tolerance;
            let xMax = this.pos.x + tolerance;

            return (player.pos.x > xMin && player.pos.x < xMax);
        }
        else {
            // Vertical boundary, check y
            let tolerance = this.size / 2 + player.size.y / 2;

            let yMin = this.pos.y - tolerance;
            let yMax = this.pos.y + tolerance;

            return (player.pos.y > yMin && player.pos.y < yMax);
        }

        return false;
    }

    touching(player) {
        // Assumes we've already know
        // inBounds() == true before
        // asking this

        // Distance between player and boundary
        let dist;

        // Distance must be less or equal to
        // half the player size to be touching
        if (this.isHorizontal()) {
            // Vertical distance between player 
            // and boundary 
            dist = player.pos.y - this.pos.y;
            return Math.abs(dist) <= player.size.y / 2;        }
        else {
            // Horizontal distance between player 
            // and boundary 
            dist = player.pos.x - this.pos.x;
            return Math.abs(dist) <= player.size.x / 2;
        }

        return false;
    }

    ahead(playerPos, playerSize) {

        if (this.type == BOUNDARY_ABOVE) {
            // ahead means down the screen 
            return (playerPos.y - playerSize.y / 2 >= this.pos.y);
        }
        else if (this.type == BOUNDARY_BELOW) {
            // ahead means up the screen 
            return (playerPos.y + playerSize.y / 2 <= this.pos.y);
        }
        else if (this.type == BOUNDARY_LEFT) {
            // ahead means to the right 
            return (playerPos.x - playerSize.x / 2 >= this.pos.x);
        }
        else if (this.type == BOUNDARY_RIGHT) {
            // ahead means to the left 
            return (playerPos.x + playerSize.x / 2 <= this.pos.x);
        }

        return false;
    }

};