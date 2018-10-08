// A simple player class

class playerController{
  constructor(pos, size, mass, gravity, timestep){
    this.pos = pos;
    this.lastPos = pos.copy();
    this.size = size;
    this.m = mass;
    this.g = gravity;
    this.t = timestep;
    this.f = createVector();
    this.v = createVector();
    this.a = createVector();
  }
  
  move(){
    // Store the last position (handy for barriers)
    this.lastPos = this.pos.copy();

    // Work out total force by adding gravity
    this.addForce(createVector(0.0, this.g));

    // Work out accelleration (accel = force/mass)
    this.a = p5.Vector.div(this.f, this.m);

    // Work out velocity change (acell * timestep)
    this.v.add(p5.Vector.mult(this.a, this.t));
  
    // Work out position change (velocity * timestep)
    this.pos.add(p5.Vector.mult(this.v, this.t));

    // Check for going through the ground
    if (this.pos.y > height - this.size / 2)
    {
      // Move to ground
      this.pos.y = height - this.size / 2;
      
      // Remove all movement in the vertical direction
      this.v.y = 0.0;
    }

    // Zero out force
    this.f.set(0.0, 0.0);
  }

  draw(){
    // Just a circle for now
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  addForce(newForce){
    // Add onto all existing forces 
    // (cleared once we move each frame)
    this.f.add(newForce);
  }

};