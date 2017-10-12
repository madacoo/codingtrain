let particles = [];
let xorigins = [0];
let yorigin;


class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 20;
		this.xvel = random(-1.5, 1.5);
		this.yvel = random(0, -5);
		this.alpha = 255;
		this.red = random(0, 255);
		this.green = random(0, 30);
		this.blue = random(0, 50);
	}
	
	update() {
		this.x += this.xvel;
		this.y += this.yvel;
		this.alpha -= random(20);
		if (this.alpha < 100 && Math.abs(this.yvel) > 3) {
			this.red = 0;
			this.gren = 0;
			this.blue = 0;
		}
	}
	
	show() {
		noStroke();
		fill(this.red, this.green, this.blue, this.alpha);
		rect(this.x, this.y, this.r, this.r);
	}
	
}



function setup() {
	createCanvas(600, 600);
	xorigin = 20;
	yorigin = height - 20;


}

function draw() {
	background(51);
	for (let i in xorigins) {
		if (random() < 0.05) particles.push(new Particle(xorigins[i], yorigin));
	}
	
	if (xorigins[xorigins.length-1] < width) xorigins.push(xorigins[xorigins.length-1] + 1);
	if (random() < 0.5) xorigins.splice(0, 1);
	
	for (let i = particles.length-1; i > 0; i--) {
		particles[i].update();
		particles[i].show();
		if (particles[i].alpha < 50) {
			particles.splice(i, 1);
		}
	}
}

