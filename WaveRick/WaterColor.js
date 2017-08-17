var song;
var amp;
var button;
var firstIndexY;
var secondIndexY;

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
    createCanvas(600, 600);
    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    amp = new p5.Amplitude();
    firstIndexY = 0;
    secondIndexY = 0;
}


function draw() {
    background(0, 119, 190);
    var vol = amp.getLevel();
    volhistory.push(vol);
    stroke(0);
    fill(0, 0, 255);
    push();
    var currentY = map(vol, 0, 1, height, 0);
    //translate(0, height / 2 - currentY);
    beginShape();
    stroke(0,255,0)
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height / 2, 0);
        vertex(i, y);
        if (i === 0) {
           firstIndexY = y; 
        }
        if (i === volhistory.length -1) {
            secondIndexY = y;
        }
    }
    vertex(width, height);
    vertex(0, height);
   
    endShape(CLOSE);
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

}
   