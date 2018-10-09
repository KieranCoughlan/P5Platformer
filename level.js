class Level {

    constructor(){
        this.platforms = [];
        this.edgeBoundaries = [];

        createEdges();
    }

    createEdges(){
        // Edges of the screen
        let b0 = new Boundary(BOUNDARY_ABOVE, createVector(width/2, 0), width);
        let b1 = new Boundary(BOUNDARY_BELOW, createVector(width/2, height), width);
        let b2 = new Boundary(BOUNDARY_LEFT, createVector(height/2, 0), height);
        let b3 = new Boundary(BOUNDARY_RIGHT, createVector(height/2, width), height);

        this.edgeBoundaries.push([b0, b1, b2, b3]);
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
        let allBoundaries = [];
        allBoundaries.push(this.edgeBoundaries);
        this.platforms.forEach(element => {
            allBoundaries.push(element.boundary);
        });

        return allBoundaries;
    }

}