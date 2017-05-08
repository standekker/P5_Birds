
2
function setup() {
	createCanvas(windowWidth,windowHeight);
	background(100);
	angleMode(DEGREES);
	frameRate(30);
	//////ui/////

}


var DEBUG = false;
var flock = new Array();
var minDistance = 200;
var headingTreshhold = 0.009;

function draw() {
		clear();
		if(DEBUG == false){
			background(0);
		}
		
	if (mouseIsPressed){
		edje = new Bird (random(width), random (height),random(360)+90);
		flock.push(edje);
	}

	for(i=0;i<flock.length;i++){
		var birdCountInReach = 1;
		var headingAverage = new Array();
		for(j=0;j<flock.length;j++){
			len = dist(flock[i].x,flock[i].y,flock[j].x,flock[j].y);
			//console.log(len);
			if(len != 0){
				if (len < minDistance){
					birdCountInReach++
					//gedrag als een andere bird in zijn comfort zone zit
					//flock[i].heading = flock[i].heading + random(-10,10);
					headingAverage.push(flock[j].heading);
					if (DEBUG == true){
						line(flock[i].x,flock[i].y,flock[j].x,flock[j].y);
					}

				}
			}
		}
		//flock[i].speed = birdCountInReach*6;
		if(headingAverage.length !=0){
			// calculate average
			var total = 0;
			for(k=0;k<headingAverage.length;k++){
				total = total + headingAverage[k];

			}
			total = total/headingAverage.length;
			total = total % 360;
			flock[i].heading = flock[i].heading - ((flock[i].heading - total)*headingTreshhold);	
			
		
		}
	}

	for(i=0;i<flock.length;i++){
		flock[i].move();
		flock[i].display();
	}
}
/*
function model(){

}

function viewer(){

}
*/
function Bird(x,y,heading){
	this.x = x;
	this.y = y;
	this.heading = heading;
	this.speed = 15;
	this.move = function(){
		this.x = this.x + cos(this.heading-90)*this.speed;
		this.y = this.y + sin(this.heading-90)*this.speed;
		// wrap around for respawning 
		if(this.x <=0){
			this.x = width - Math.abs(this.x);
		}
		if(this.y <=0){
			this.y = width - Math.abs(this.y);
		}
		if(this.x >=width){
			this.x = width - this.x;
		}
		if(this.y >=height){
			this.y = height - this.y;
		}
	}

	this.display = function(){
		stroke(0);
		fill(0,255,0);
		ellipse(this.x,this.y,10,10);
		if (DEBUG == true){
			noFill();
			ellipse(this.x,this.y,minDistance,minDistance);
			line(this.x,this.y,this.x+(cos(this.heading-90)*minDistance),this.y+(sin(this.heading-90)*minDistance));
		}
	}
}

function toglleDebug(){
	if (DEBUG== true){
		DEBUG = false;
	} 
	else{
		DEBUG = true;
	}
}