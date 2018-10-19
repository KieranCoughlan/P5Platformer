// A simple player class

class PlayerController{
  constructor(pos, size, mass, gravity, timestep, pushStrength, jumpStrength){
    this.pos = pos;
    this.lastPos = pos.copy();
    this.size = createVector(size, size * 1.5); // Square for now
    this.m = mass;
    this.g = gravity;
    this.t = timestep;
    this.pushStrength = pushStrength;
    this.jumpStrength = jumpStrength;
    this.f = createVector();
    this.v = createVector();
    this.a = createVector();
    this.onGround = false;
    this.jumpsLeft = 0; // Will be determined
    this.framesBetweenJumps = 10; 
    this.framesSinceLastJump = this.framesBetweenJumps;
    this.groundFriction = 2.0; // Slows us on the ground, the bigger, the quicker
    this.airFriction = 0.3; // Slows horizontally in the air, the bigger, the quicker
  }
  
  move(){
    // Store the last position (handy for barriers)
    this.lastPos = this.pos.copy();

    // Work out total force by adding gravity
    this.addForce(createVector(0.0, this.g));

    // Add a horizontal friction force in the 
    // opposite direction to the way we're moving
    // Different for ground and air
    if (this.onGround)
      this.addForce(createVector(this.v.x * -this.groundFriction, 0.0));
    else
      this.addForce(createVector(this.v.x * -this.airFriction, 0.0));

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

    // Increment this 
    this.framesSinceLastJump++;

    // On the ground? Allow jumps
    if (this.onGround)
      this.jumpsLeft = 1; // Double jumps

    // Set this false now and when
    // we check boundaries it might be true again
    player.onGround = false;
  }

  draw(){
    // Just a circle for now
    ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  addForce(newForce){
    // Add onto all existing forces 
    // (cleared once we move each frame)
    this.f.add(newForce);
  }

  pushLeft(){
    this.addForce(createVector(-this.pushStrength, 0.0));
  }

  pushRight(){
    this.addForce(createVector(this.pushStrength, 0.0));
  }

  jump(){
    if (this.jumpsLeft > 0 &&
        this.framesSinceLastJump > this.framesBetweenJumps){
      this.jumpsLeft--;
      this.framesSinceLastJump = 0;
      this.addForce(createVector(0.0, -this.jumpStrength));
    }
  }

};