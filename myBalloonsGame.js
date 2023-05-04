let score = 0;
let yellowBalloon = 0;
let redBalloon = 0;
// let balloonImg = document.getElementById("yellowBalloon");
let restartButton = document.getElementById("restart");
let scoreBoard = document.getElementById("scoreBoard");
let message = document.getElementById("balloonsGallery");
let clickMeImg = document.getElementById("clickMe")

document.addEventListener('mousedown',startGame);
restartButton.addEventListener('mousedown',restartGame);
clickMeImg.addEventListener('mousedown', clickOnMe);

function startGame(pEvent) {
    if(pEvent.target.className=="yellowBalloon"){
        pEvent.target.style.visibility = "hidden";
        score = score + 1;
        yellowBalloon = yellowBalloon + 1;
        scoreBoard.textContent = score;
        // endGame();
    
    }else if(pEvent.target.className=="redBalloon"){
            pEvent.target.style.visibility = "hidden";
            score = score - 1;
            redBalloon = redBalloon + 1;
            scoreBoard.textContent = score;
            alert("You should click on the big waterfalls")
            // endGame();
    // }else{
        // alert("You should click on the yellow balloons")
    }
    endGame();
    // balloonImg.style.visibility = "hidden";
    // score = score + 2;    
}

function restartGame() {
    balloonImg.style.visibility = "visible";
    score = 0;
    scoreBoard.textContent = score;   
}

function clickOnMe() {
    alert("Welcome to the balloons game");   
    // this is not working...
}

function endGame() {
    if(yellowBalloon == 12){
        message.textContent = "Congratulations!"
        message.style.backgroundColor = "blue";
    }
    if(redBalloon == 1){
        message.textContent = "Did you just pop a small waterfall? YELL OH!"
        message.style.backgroundColor = "orange";
    }
}

