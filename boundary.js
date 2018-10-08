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
        if (this.inBounds == false)
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
        let gap = player.size / 2;

        // Snap the player position to the surface
        if (this.type == BOUNDARY_ABOVE){
            player.pos.y = this.pos.y + gap;
        }
        else if (this.type == BOUNDARY_BELOW){
            player.pos.y = this.pos.y - gap;
        }
        else if (this.type == BOUNDARY_LEFT){
            player.pos.x = this.pos.x + gap;
        }
        else if (this.type == BOUNDARY_RIGHT){
            player.pos.x = this.pos.x - gap;
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
        let tolerance = this.size / 2 + player.size / 2;

        if (this.isHorizontal()) {
            // Horizontal boundary, check x
            let xMin = this.pos.x - tolerance;
            let xMax = this.pos.x + tolerance;

            return (player.x > xMin && player.x < xMax);
        }
        else {
            // Vertical boundary, check y
            let yMin = this.pos.y - tolerance;
            let yMax = this.pos.y + tolerance;

            return (player.y > yMin && player.y < yMax);
        }
    }

    touching(player) {
        // Assumes we've already know
        // inBounds() == true before
        // asking this

        // Distance between player and boundary
        let dist;

        if (this.isHorizontal()) {
            // Vertical distance between player 
            // and boundary 
            dist = player.pos.y - this.pos.y;
        }
        else {
            // Horizontal distance between player 
            // and boundary 
            dist = player.pos.x - this.pos.x;
        }

        // Distance must be less or equal to
        // half the player size to be touching
        return Math.abs(dist) <= player.size / 2;
    }

    ahead(playerPos, playerSize) {
        let gap = playerSize / 2;

        if (this.type == BOUNDARY_ABOVE) {
            // ahead means down the screen 
            return (playerPos.y - gap >= this.pos.y);
        }
        else if (this.type == BOUNDARY_BELOW) {
            // ahead means up the screen 
            return (playerPos.y + gap <= this.pos.y);
        }
        else if (this.type == BOUNDARY_LEFT) {
            // ahead means to the right 
            return (playerPos.x - gap >= this.pos.x);
        }
        else if (this.type == BOUNDARY_RIGHT) {
            // ahead means to the left 
            return (playerPos.x + gap <= this.pos.x);
        }
    }

};