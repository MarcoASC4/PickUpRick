var song;
var amp;
var button;

var volhistory = [];

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    song = loadSound('test.mp3');
}

function setup() {
    createCanvas(200, 200);
    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    amp = new p5.Amplitude();
    rectMode(CORNER);
}

function draw() {
    background(0);
    var vol = amp.getLevel();
    volhistory.push(vol);
    stroke(255);
    noFill();
    push();
    var currentY = map(vol, 0, 1, height, 0);
    //translate(0, height / 2 - currentY);
    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height/2, 0);
        vertex(i, y);
    }
    endShape();
    fill(0, 0,255);
    pop();
    if (volhistory.length > width) {
        volhistory.splice(0, 1);
    }
    //This will change based on the size of the canvas.
    fill(255, 0, 0);
    var Characterx = volhistory.length/2
    var squareLength = 50;
    var yVal = map(volhistory[Characterx], 0, 1, height/2, 0) -squareLength/2;
    rect(Characterx -squareLength/2, yVal, squareLength, squareLength);
   // line(volhistory.length, 0, volhistory.length, height);
    //ellipse(100, 100, 200, vol * 200);
}