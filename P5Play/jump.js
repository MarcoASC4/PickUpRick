var x = 175;
var y = 300;
var moveUp = false;
var moveDown = false;

function setup() {
    createCanvas(400, 400);
    background(0, 0, 0)
    fill(255, 255, 255)
    rect(x, y, 50, 50)
}
function jump() {
    y = y - 10
    if (y <= 0) {
        y = y + 100
    }
}

function draw() {
    background(0, 0, 0);

    if (moveUp) {
        y -= 10;
        if (y <= 0) {
            moveUp = false;
            moveDown = true;
        }
    }
    if (moveDown) {
        y += 10;
        if (y >= 300) {
            moveDown = false;
        }
    }
    rect(x, y, 50, 50);
}

 
function keyPressed() {
    if (key == ' ' && !moveDown) {
        moveUp = true;
    }
}