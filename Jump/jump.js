
var moveUp = false;
var moveDown = false;
var totalMoveUpDist = 100;
var x = 100;
var y = 300;

function draw() {
    if (moveUp) {
        y -= 10;
        totalMoveUpDist -= 10;
        if (totalMoveUpDist <= 0) {
            moveUp = false;
            moveDown = true;
        }
    }
    if (moveDown) {
        y += 10;
        if (y >= 300) {
            moveDown = false;
            totalMoveUpDist = 100;
            followSong = true;
        }
    }
    fill(0,0,0);
    rect(x, y, 50, 50);
}
}

function keyPressed() {
    if (key == ' ' && !moveDown) {
        moveUp = true;
    }
}