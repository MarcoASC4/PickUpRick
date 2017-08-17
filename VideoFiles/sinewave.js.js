var diameter = 10;
var ypoint = 0;
var amplitude = 50;
var timeperiod = 100;
var angularvelocity = 6.28/timeperiod;
var time = 0;
var phaseDifference = 0;
var numofParticles;

function setup() {
    createCanvas(640, 200);
    numofParticles = width/diameter;
    fill(255);
    stroke(2);
}

function draw() {
    background(0);

    time += 1;
    for(i = 0; i < numofParticles+1; i++) {
        ypoint = sin(angularvelocity * (time-phaseDifference)) * amplitude;
        ellipse(i * diameter, height/2 + ypoint, diameter, diameter);
        phaseDifference += 5;
    }
    phaseDifference = 20;
    if(time == timeperiod) time = 0;
}


