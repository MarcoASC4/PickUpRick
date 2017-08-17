var playerChoice = "Rock"

var compChoices = ["Rock", "Paper", "Scissors"];
var compChoice = compChoices[Math.floor(Math.randon()*3)]

if (compChoice == playerChoice){
    console.log("It's a tie");
}
else if (compChoice == "Paper" && playerChoice == "Rock"){
    console.log("You lose")
}
else if (compChoice == "Scissors" && playerChoice == "Rock"){
    console.log("You win")
}
else if (compChoice == "Rock" && playerChoice == "Paper"){
    console.log("You win")
}
else if (compChoice == "Scissors" && playerChoice == "Paper"){
    console.log("You lose")
}
else if (compChoice == "Paper" && playerChoice == "Scissors"){
    console.log("You win")
}
else if (compChoice == "Rock" && playerChoice == "Scissors"){
    console.log("You lose")
}        
