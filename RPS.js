let rockDiv = document.getElementById('rockDiv');
let paperDiv = document.getElementById('paperDiv');
let scissorsDiv = document.getElementById('scissorsDiv');
let lizardDiv = document.getElementById('lizardDiv');
let spockDiv = document.getElementById('spockDiv');

let userScoreSpan = document.getElementById("userScore");
let computerScoreSpan = document.getElementById("computerScore");
let messageDiv = document.getElementById("message");
let options = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
let userScore = 0;
let computerScore = 0;
let numberOfRounds = 0;
let elemUser = document.createElement("img");
let elemComputer = document.createElement("img");



rockDiv.addEventListener('mouseover', hoverIsOn);
rockDiv.addEventListener('mouseout', hoverIsOff);
paperDiv.addEventListener('mouseover', hoverIsOn);
paperDiv.addEventListener('mouseout', hoverIsOff);
scissorsDiv.addEventListener('mouseover', hoverIsOn);
scissorsDiv.addEventListener('mouseout', hoverIsOff);
lizardDiv.addEventListener('mouseover', hoverIsOn);
lizardDiv.addEventListener('mouseout', hoverIsOff);
spockDiv.addEventListener('mouseover', hoverIsOn);
spockDiv.addEventListener('mouseout', hoverIsOff);

rockDiv.addEventListener('mousedown', function() {startGame("rock")});
paperDiv.addEventListener('mousedown', function() {startGame("paper")});
scissorsDiv.addEventListener('mousedown', function() {startGame("scissors")});
lizardDiv.addEventListener('mousedown', function() {startGame("lizard")});
spockDiv.addEventListener('mousedown', function() {startGame("spock")});

function hoverIsOn(pEvent) {
    if(pEvent.target.className == "rps"){
        pEvent.target.style.backgroundColor = 'black';
        pEvent.target.style.transition = "0.6s"; //in ex: 0.4, in sol:0.1
        pEvent.target.style.cursor = "pointer"; //changes mouse pointer into hand form
        pEvent.target.style.border = '6px solid yellow';
    }
}

function hoverIsOff(pEvent) {
    if(pEvent.target.className == "rps"){
        pEvent.target.style.backgroundColor = 'transparent';
        pEvent.target.style.border = '3px solid rgb(9, 116, 55)';
    }
}

function startGame(pUserSelection) {
    let userChoice = pUserSelection;
    console.log("User:" + userChoice);
    showSelection("userChoiceIcon", userChoice, elemUser);

    let randomNumber = Math.floor(Math.random() * 5);
    console.log("Random Number: " + randomNumber);

    let computerChoice = options[randomNumber];
    console.log("Computer: " + computerChoice);
    showSelection("computerChoiceIcon", computerChoice, elemComputer);

    rockPaperScissors(userChoice, computerChoice);
}

function rockPaperScissors(pUserChoice, pComputerChoice) {
    numberOfRounds = numberOfRounds + 1;
    let result = pUserChoice + pComputerChoice;
    if(numberOfRounds==3){
        if(userScore > computerScore){
            messageDiv.textContent = "Congratulations dear Winner!";
            messageDiv.style.color = "blue";
        }

        if(userScore < computerScore){
            messageDiv.textContent = "Better luck next time";
            messageDiv.style.color = "green";  
        }

        if(userScore == computerScore){
            messageDiv.textContent = "It's a draw";
            messageDiv.style.color = "red";
        }
    }
    else{

        if (result == 'rockrock' || result == 'paperpaper' || result == 'scissorsscissors' 
            || result == 'lizardlizard' || result == 'spockspock'){
            console.log("It's a draw");
            messageDiv.textContent = "It's a draw";
            messageDiv.style.color = "red";
        }

         
        if (result == 'rockscissors' || result == 'scissorspaper' || result == 'paperrock'
            || result == 'rocklizard' || result == 'lizardspock'|| result == 'spockscissors'
            || result == 'scissorslizard' || result == 'lizardpaper' || result == 'paperspock' 
            || result == 'spockrock')
            {
            console.log("You Won");
            messageDiv.textContent = "Congratulations dear Winner!";
            messageDiv.style.color = "blue";
      
            userScore = userScore + 1;
            userScoreSpan.textContent = userScore;
        }

        if (result == 'scissorsrock' || result == 'paperscissors' || result == 'rockpaper'
            || result == 'lizardrock' || result == 'spocklizard'|| result == 'scissorspock'
            || result == 'lizardscissors' || result == 'paperlizard' || result == 'spockpaper'
            || result == 'rockspock')
            {
            console.log("You lost");
            messageDiv.textContent = "Better luck next time";
            messageDiv.style.color = "green";
       
            computerScore = computerScore + 1;
            computerScoreSpan.textContent = computerScore;
        }
    }
}

function showSelection(pDivChoiceIcon, pImgName, pElem) {
    pElem.setAttribute("src", "images/" + pImgName + ".png");
    pElem.setAttribute("height", 40);
    pElem.setAttribute("width", 40);
    pElem.setAttribute("padding", 0);

    document.getElementById(pDivChoiceIcon).appendChild(pElem);
}


