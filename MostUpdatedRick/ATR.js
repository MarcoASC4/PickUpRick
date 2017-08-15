
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

//From Phillip's Jump Code
var ypos = 0;
var xpos = 0;
var followSong = true;
var moveUp = false;
var moveDown = false;
var totalMoveUpDist = 300;

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
    amp = new p5.Amplitude(.8 );
    firstIndexY = 0;
    secondIndexY = 0;
    probabilityTrash = false;
    probabilitySharks = false;
    startSpawners = false;

}


function P() {
    // This makes the function have really low probability. You might need to change this number.
    var prob = Math.random()*1;
    if (prob < 0.0001) {
        probabilityTrash = true;
        console.log("I'm true");
    } else if (prob >= 0.0001 && prob < 0.0002) {
        console.log("No I'm true");
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
    for (var i = 0; i < 200; i++) {
        var y = map(volhistory[i], 0, 1, height / 2, 0);
        vertex(1 + 3*i, y);
        P();
        if (i === 0) {
           firstIndexY = y; 
        }
        if (i === volhistory.length - 1) {
            secondIndexY = y;
            // If probability has been met then a new trash will spawn at the last index (all the way to the right on the canvas).
            if (probabilityTrash === true && startSpawners === true) {
               // console.log("TrashShow??");
                SpawnerArray.push({num: i, trash: probabilityTrash, shark: false})
                probabilityTrash = false;
            }
            if (probabilitySharks === true && startSpawners === true) {
                //console.log("SharkShow?");
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
            rect(1+ 3*SpawnerArray[i].num - 10, y -10, 20, 20);
            SpawnerArray[i].num-=1;
            // If the trash has an x value of less than 0 it is spliced from the array.
            if (1 + 3*SpawnerArray[i].num < 0) {
                SpawnerArray.splice(0, 1);  
            }
        }
    }
    // Makes sure trash spawns after the ocean is the length of the canvas.
    if (volhistory.length >= 200) {
        volhistory.splice(0, 1);
        startSpawners = true;


        
    }
    // if (TrashArray.length > width) {
    //     TrashArray.splice(0, 1);
    // }

    //This will change based on the size of the canvas.
    if (followSong === true) {
        fill(255, 0,0);
        var Characterx = Math.floor(volhistory.length / 2);
        var squareLength = 50;
        xpos = 1+ Characterx*3- squareLength / 2;
        var yVal = map(volhistory[Characterx], 0, 1, height / 2, 0) - 25;
        ypos = yVal;
        rect(1 + Characterx*3 - squareLength / 2, yVal, squareLength, squareLength);

    } else {
        if (moveUp===true) {
            //console.log("Going Up")
            ypos -= 5;
            totalMoveUpDist -= 10;
            if (totalMoveUpDist <= 0) {
                moveUp = false;
                moveDown = true;
            }
        }
        if (moveDown===true) {
            ypos += 5;
            totalMoveUpDist+=10;
            if (totalMoveUpDist >= 300) {
                moveDown = false;
                followSong = true;
            }
        }
        fill(255,0,0);
        rect(xpos, ypos, 50, 50);

    }
    //console.log(followSong)
}
function keyPressed() {
    if (keyCode === UP_ARROW && !moveDown) {
        moveUp = true;
        followSong = false;
    }       
}
   
