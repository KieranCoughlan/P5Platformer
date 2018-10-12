class Level {

    constructor(){
        this.platforms = [];
        this.edgeBoundaries = [];

        this.createEdges();
    }

    createEdges(){
        // Edges of the screen
        let b0 = new Boundary(BOUNDARY_ABOVE, createVector(width/2, 0), width);
        let b1 = new Boundary(BOUNDARY_BELOW, createVector(width/2, height), width);
        let b2 = new Boundary(BOUNDARY_LEFT, createVector(0, height/2), height);
        let b3 = new Boundary(BOUNDARY_RIGHT, createVector(width, height/2), height);

        this.edgeBoundaries = [b0, b1, b2, b3];
    }

    draw(){
        background('LightSkyBlue');

        this.platforms.forEach(element => {
            element.draw();
        });
    }

    checkPlayer(player){
        // Check player against all boundaries
        this.allBoundaries().forEach(element => {
            element.checkPlayer(player);
        });
    }

    allBoundaries(){
        // Build a list of all boundaries, both edges and platform
        // boundaries
        let platformBoundaries = [];
        this.platforms.forEach(element => {
            platformBoundaries.push(element.boundary);
        });

        let allBoundaries = this.edgeBoundaries.concat(platformBoundaries);
        return allBoundaries;
    }

}