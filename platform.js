class Platform{
    constructor(pos, width, height){
        this.pos = pos;
        this.width = width;
        this.height = height;
        let boundaryCentre = createVector(pos.x + width /2, pos.y);
        this.boundary = new Boundary(BOUNDARY_BELOW, boundaryCentre, width);
    }

    draw(){
        rect(this.pos, this.width, this.height);
    }

}