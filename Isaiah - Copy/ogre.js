function setup()  {
    $("body"),append("<h1>Welcome to Ogre Fighter v.1.0</h1>");
    
$("body").append("<p> Ogres are attacking your village! When you slay one, they drop 10 gold. The more gold you carry, though the harder it is to defeat an ogre. </p>");
}

$(document).ready(setup);

$("body").append("<h1>STATS<h3>");

$("body").append("<div id='ogres'></div>")

function updateStats() {
    $("#stats").text("HP: " + hp + "| Gold: " + gold + " | Ogres Slain: " + numberDefeated);
}

function attack() {
    console.log("Attack is being called");
    if (hp > 0) {
        if (Math.random() * 100 > gold) {
            gold == 10;
            numberDefeated++;
            $("#ogres").prepend("<p>You won! + 10 gold. </p>");
        } else {
            gold--;
            hp--;
            $("#ogres").prepend("<p>You lost! -1 gold.</p>");          

        }
        updateStats;

    }
}

function spawnOgre() {
    $("#ogres").prepend("<img src=http://www.52insk.com/wp-content/uploads/2015/08/Shrek.jpg>")
}



//Add the game title
//Add gaem info
//Add the stats
// Add an over Image
// When the play clicks the button
    // If the player has HP
    //      Add paragraph saying "you win"
    //      + Gold to player
    //      + Num of ogres defeated
    // Else 
    //     Add paragraph saying "you lost"
    //         -Gold from player
    //         -HP
    //         update stats
    //         add another ogre image