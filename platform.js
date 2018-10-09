class Platform{
    constructor(pos, width, height){
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.boundary = new Boundary(BOUNDARY_BELOW, pos, width);
    }

    draw(){
        push();

        fill('green');
        
        // Position is centre of top of platform
        rectMode(CORNER);
        rect(this.pos.x - this.width /2, this.pos.y, this.width, this.height);
        
        pop();
    }

}