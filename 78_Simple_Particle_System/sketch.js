let particles = [];
let xorigins = [];
let yorigin;

class Particle {
	constructor(pos, vel, size, deterioration) {
		this.pos = pos;
		this.vel = vel;
		this.size = size;
		this.deterioration = deterioration;
		
		// colour
		this.alpha = 255;
		this.red = random(0, 255);
		this.green = random(0, 30);
		this.blue = random(0, 50);
	}
	
	update() {
		// move and deteriorate
		this.pos.add(this.vel);
		this.alpha -= this.deterioration;
		
		// make some black smoke
		if (this.alpha < 100 && Math.abs(this.vel.y) > 3) {
			this.red = 0;
			this.gren = 0;
			this.blue = 0;
		}
	}
	
	show() {
		noStroke();
		fill(this.red, this.green, this.blue, this.alpha);
		rect(this.pos.x, this.pos.y, this.size, this.size);
	}
	
}

function setup() {
	createCanvas(600, 200);
	yorigin = height - 20;
	xorigins.push(0);
}

function draw() {
	background(51);
	
	// create particles at each xorigin (point of burnation)
	for (let i in xorigins) {
		if (random() > 0.05) continue; // sometimes skip a point
		let pos = new p5.Vector(xorigins[i], yorigin);
		let vel = new p5.Vector(random(-1, 1), random(0, -5));
		let size = random(10, 20);
		let det = random(5, 20);
		particles.push(new Particle(pos, vel, size, det));
	}
	
	// spread
	if (xorigins[xorigins.length-1] < width-20) {
		let i = xorigins.length-1;
		let newXOrigin = xorigins[i] + 1;
		xorigins.push(newXOrigin);
	}
	
	// extinguish
	if (random() < 0.3) xorigins.splice(0, 1);
	
	// update and show particles, removing when they are gone
	for (let i = particles.length-1; i > 0; i--) {
		particles[i].update();
		particles[i].show();
		if (particles[i].alpha < 50) {
			particles.splice(i, 1);
		}
	}
}

