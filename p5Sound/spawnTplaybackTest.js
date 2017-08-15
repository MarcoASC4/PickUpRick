
/*
How to make spawning sharks! Make sure the trash and sharks aren't on the same x value (Non mvp version.);

*/


/* What we now know is that if the song is slowed down. The game will be longer. We want the square to move faster. So the game doesn' take that long.
You can play 2 songs at once. Just use load sound with the same file address again. 

*/

var song;
var amp;
var button;
var firstIndexY;
var secondIndexY;
// true or false variable that tells the computer to put trash or not.
var probability;
// An array that holds the x values of the trash. The y values are calculated with map();
var TrashArray = [];
var volhistory = [];
// A boolean that tells stuff to spawn after the ocean is completely drawn.
var startSpawners;
var newSong;

function toggleSong() {
    if (newSong.isPlaying()) {
        newSong.pause();
    } else {
        newSong.play();
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
    probability = false;
    startSpawners = false;
    song.rate(1);
   
}


function P() {
    // This makes the function have really low probability. You might need to change this number.
    if (Math.random()*1 < 0.00001) {
        probability = true;
    }
    return probability;
}

function draw() {
    background(0, 119, 190);
    var vol = amp.getLevel();
    volhistory.push(vol)
    stroke(0);
    push();
    var currentY = map(vol, 0, 1, height, 0);
    //translate(0, height / 2 - currentY);
    
    beginShape();
    stroke(0,255,0)
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height / 2, 0);
        vertex(i, y);
        probability = P();
        console.log(probability);
        if (i === 0) {
           firstIndexY = y; 
        }
        if (i === volhistory.length - 1) {
            secondIndexY = y;
            // If probability has been met then a new trash will spawn at the last index (all the way to the right on the canvas).
            if (probability === true && startSpawners === true) {
                probability = false;
                TrashArray.push(i)
            }
        }
    }
    vertex(width, height);
    vertex(0, height);
    fill(0, 0, 255);
    endShape(CLOSE);
    pop();
    // This moves the trash to the next x value to the right.
    if (startSpawners === true) {
        for (var i = 0; i <TrashArray.length; i++) {
            fill(255, 255, 0);
            // The indexes at TrashArray has the x values or indexes for volhistory which is used to calculuate the y value.
            var y = map(volhistory[TrashArray[i]], 0, 1, height / 2, 0);
            rect(TrashArray[i], y, 20, 20);
            TrashArray[i]-=1;
            // If the trash has an x value of less than 0 it is spliced from the array.
            if (TrashArray[i] < 0) {
            TrashArray.splice(0, 1);  
            }
        }
    }
    // Makes sure trash spawns after the ocean is the length of the canvas.
    if (volhistory.length > width) {
        volhistory.splice(0, 1);
        startSpawners = true;
        
    }
    // if (TrashArray.length > width) {
    //     TrashArray.splice(0, 1);
    // }

    //This will change based on the size of the canvas.
    fill(255, 0, 0);
    var Characterx = volhistory.length/2
    var squareLength = 30;
    var yVal = map(volhistory[Characterx], 0, 1, height/2, 0) -squareLength/2;
    rect(Characterx -squareLength/2, yVal, squareLength, squareLength);

}
   