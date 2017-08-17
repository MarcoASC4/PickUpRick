

/*
How to make spawning sharks! Make sure the trash and sharks aren't on the same x value (Non mvp version.);

*/


/*
Added playback rate To this. 
*/



var song = ['24kmagic.mp3', 'jeopardy.mp3', '30sec.mp3','30sec1.mp3'];
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
var TrashCounter = 0;

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
    // SoundCloud API would be in Preload. 
    soundFormats('mp3', 'ogg');
  song = loadSound(song[Math.floor(Math.random()*4)]);
}

function setup() {
    // Sets the size of the canvas to 600 by 600. Don't change this size yet because the
    // whole code is revolved around this size. I need to make a formula to make it better.
    createCanvas(600, 600);
    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    // The .8 is the smoothing function to make the function less bunched up.
    amp = new p5.Amplitude(.8 );
    // Determines the Y of the graph at the farthest left side of the canvas.
    firstIndexY = 0;
    // Determines the Y of the graph at the farthest right side of the canvas
    secondIndexY = 0;
    // These probabilities when true will make Trash or Sharks spawn.
    probabilityTrash = false;
    probabilitySharks = false;
    // Once the screen is filled with the graph then startSpawners will be true and trash and sharks can start to appear.
    startSpawners = false;
    // Makes the song 3 times as fast so the level is 3 times as fast.
    // Not the final level
    song.rate(1);

}


// These numbers may need to be lower
function P() {
    // This makes the function have really low probability. You might need to change this number.
    var prob = Math.random()*1;
    if (prob < 0.0001) {
        probabilityTrash = true;
    } else if (prob >= 0.0001 && prob < 0.0002) {
    
        probabilitySharks = true;
    }

}

function draw() {

    background(0, 119, 190);
    // gives volume at this instance of the song.
    var vol = amp.getLevel();
    volhistory.push(vol)
    stroke(0);
    push();
    
    beginShape();
    stroke(0,255,0)
    // makes 200 vertexes
    for (var i = 0; i < 200; i++) {
        var y = map(volhistory[i], 0, 1, height / 2, 0);
        // formula to approximate 200 vertexes
        vertex(1 + 3*i, y);
        P();
        AddSpawner(i);
    }
    vertex(width, height);
    vertex(0, height);
    fill(0, 0, 255);
    endShape(CLOSE);
    pop();

    //This will change based on the size of the canvas.
    if (followSong === true) {
        FollowGraph();
    } else {
        // Makes the red square jump
        FollowJump();
    }
    // This moves the trash to the next x value to the right.
    //Added
    CreateSpawner();
    // Makes sure trash spawns after the ocean is the length of the canvas.
    WaveSplicer();
    // if (TrashArray.length > width) {
    //     TrashArray.splice(0, 1);
    // }
    
}
function keyPressed() {
    if (keyCode === UP_ARROW && !moveDown) {
        moveUp = true;
        followSong = false;
    }       
}


//Added
function CreateSpawner() {
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
            var y = map(volhistory[SpawnerArray[i].num], 0, 1, height / 2, 0) - 10;
            var x = 1 + 3*SpawnerArray[i].num -10;
            if (isTouching(x, y) === true) {
                if (SpawnerArray[i].shark === false) {
                    TrashCounter++;
                }
                SpawnerArray.splice(i, 1);
                i--;
            } else {
                rect(x, y, 20, 20);
                SpawnerArray[i].num-=1;
            }
            // If the trash has an x value of less than 0 it is spliced from the array.
            if (x + 10 < 0) {
                SpawnerArray.splice(0, 1);  
            }
        }
        /// Score 
        text(TrashCounter.toString(), 90, 30);
    }
}


function isTouching(x, y) {
    var realDist = dist(xpos, ypos, x, y);
    var idealDist = 0;
    // helps calculate exact distances.
    // This is for the angle.
    var deltaX = x-xpos;
    var deltaY = y-ypos;
    var modX = Math.abs(deltaX);
    var modY = Math.abs(deltaY);
    // Gets the angles between both center pts
    var angle = Math.atan(modY/modX)*180/PI
    if (angle > 45) {
        var idealposdisY = 25;
        var idealposdisX =  idealposdisY/tan(angle*PI/180);
        //For other square
        angle = 90- angle;
        var idealdisx = 10;
        var idealdisy = idealdisx*Math.tan(angle*PI/180);
        idealDist = Math.sqrt(Math.pow(idealposdisY, 2) + Math.pow(idealposdisX, 2)) + Math.sqrt(Math.pow(idealdisx, 2) + Math.pow(idealdisy, 2));
    } else {
        var idealposdisX = 25;
        var idealposdisY = idealposdisX*tan(angle*PI/180);
        angle = 90 - angle;
        var idealdisy = 10;
        var idealdisx = idealdisy/tan(angle*PI/180);
        idealDist = Math.sqrt(Math.pow(idealposdisY, 2) + Math.pow(idealposdisX, 2)) + Math.sqrt(Math.pow(idealdisx, 2) + Math.pow(idealdisy, 2));
    }

    if(idealDist >= realDist) {
        return true;

    } else {
        return false;
    }
}

function WaveSplicer() {
    if (volhistory.length >= 200) {
        volhistory.splice(0, 1);
        startSpawners = true; 
    }
}


function FollowGraph() {
     fill(255, 0,0);
        var Characterx = Math.floor(volhistory.length / 2);
        var squareLength = 50;
        xpos = 1+ Characterx*3- squareLength / 2;
        var yVal = map(volhistory[Characterx], 0, 1, height / 2, 0) - 25;
        ypos = yVal;
        rect(1 + Characterx*3 - squareLength / 2, yVal, squareLength, squareLength);
}


function FollowJump() {
    if (moveUp===true) {
            
            ypos -= 6;
            totalMoveUpDist -= 10;
            if (totalMoveUpDist <= 0) {
                moveUp = false;
                moveDown = true;
            }
        }
        if (moveDown===true) {
            ypos += 3;
            totalMoveUpDist+=10;
            if (totalMoveUpDist >= 600) {
                moveDown = false;
                followSong = true;
                totalMoveUpDist = 300;
            }
        }
        fill(255,0,0);
        rect(xpos, ypos, 50, 50);
}

function AddSpawner(i ) {
        if (i === volhistory.length - 1) {
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



   
