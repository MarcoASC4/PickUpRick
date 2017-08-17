/*create new function randLetter()
randletter will return a random letter from the alphabet
function randWord that returns a string of random length
function randSentence that returns a string of a random number of words separated space and period.
Create 2 pokemon arrays*/

function randLetter(){
    var alphabet = ["abcdefghijklmnopqrstuvwxyz"]
//return alphabet[rand(alphabet.length)];

var randomNum = rand(alphabet.length);
var letter = alphabet[randomNum];
return letter;




}

function randWord(){
    for (var i = 0; i < 5; i++){
        console.log(randLetter());
        word = word + randLetter();
    }
    return word;
}

function randSentence() {
    var sentence + "";
    for (var i = 0; i < 5; i++)
        sentence = sentence +randWord() + " ";
}
return sentence;










var firstPokemon = ["Arcanine", 47, 110 ]
var secondPokemon = ["Snorlax", 90, 160]

pokeAttack(firstPokemon, secondPokemon){

}

//var randLetter = []

//console.log(randLetter)