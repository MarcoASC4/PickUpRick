//var mySound;
var mySound = ['24kmagic.mp3', 'jeopardy.mp3', '30sec.mp3','30sec1.mp3']


function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound(mySound[Math.floor(Math.random()*4)]);
  console.log("Loading");
  console.log(Math.random()*4);
  
}

function setup() {
  console.log("Loaded");
  mySound.setVolume(0.5);
  mySound.play();
}

function draw() {
}







/*var S;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('24kmagic.mp3');
  S = new p5.SoundFile,successCallback(),errorCallback(),whileLoadingCallback(),(path('24kmagic.mp3');
}

function setup() {
  mySound.setVolume(50);
   mySound.play();

  
}

function draw() {
  S.play();
}



*/
