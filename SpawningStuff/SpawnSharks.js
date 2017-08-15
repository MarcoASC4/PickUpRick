
/*
How to make spawning sharks! Make sure the trash and sharks aren't on the same x value (Non mvp version.);

*/


/*
Added playback rate To this. 
*/



var song;
var amp;
var button;
var firstIndexY;
var secondIndexY;
// true or false variable that tells the computer to put trash or not.
var probabilityTrash;
var probabilitySharks;
// An array that holds the x values of the trash. The y values are calculated with map();
var SpawnerArray = [];

var volhistory = [];
// A boolean that tells stuff to spawn after the ocean is completely drawn.
var startSpawners;

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
    probabilityTrash = false;
    probabilitySharks = false;
    startSpawners = false;
}


function P() {
    // This makes the function have really low probability. You might need to change this number.
    var prob = Math.random()*1;
    if (prob < 0.00003) {
        probabilityTrash = true;
    } else if (prob >= 0.00003 && prob < 0.00006) {
        probabilitySharks = true;
    }

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
        P();
        if (i === 0) {
           firstIndexY = y; 
        }
        if (i === volhistory.length - 1) {
            secondIndexY = y;
            // If probability has been met then a new trash will spawn at the last index (all the way to the right on the canvas).
            if (probabilityTrash === true && startSpawners === true) {
                SpawnerArray.push({num: i, trash: probabilityTrash, shark: false})
                probabilityTrash = false;
            }
            if (probabilitySharks === true && startSpawners === true) {
                SpawnerArray.push({num: i, trash: false, shark: probabilitySharks})
                probabilitySharks = false;
                
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
        for (var i = 0; i <SpawnerArray.length; i++) {
            if (SpawnerArray[i].trash === true) {
            fill(255, 255, 0);
        }
        
            if(SpawnerArray[i].shark === true) {
                fill(130);
            }
        
        
            // The indexes at TrashArray has the x values or indexes for volhistory which is used to calculuate the y value.
            var y = map(volhistory[SpawnerArray[i].num], 0, 1, height / 2, 0);
            rect(SpawnerArray[i].num-10, y -10, 20, 20);
            SpawnerArray[i].num-=1;
            // If the trash has an x value of less than 0 it is spliced from the array.
            if (SpawnerArray[i].num < 0) {
            SpawnerArray.splice(0, 1);  
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
    var squareLength = 50;
    var yVal = map(volhistory[Characterx], 0, 1, height/2, 0) -squareLength/2;
    rect(Characterx -squareLength/2, yVal, squareLength, squareLength);

}
   