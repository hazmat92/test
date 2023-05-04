const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
// let CANVAS = document.getElementById('canvas');
// let CTX = CANVAS.getContext('2d');
// let dropdown = document.getElementById('animations');
// const GAME_OVER_IMG_WIDTH = 960;
// const GAME_OVER_IMG_HEIGHT = 574;
// above is original, below is to reduce size by 2
const GAME_OVER_IMG_WIDTH = 960/2;
const GAME_OVER_IMG_HEIGHT = 574/2;
// below is used when adding our own image of game over
// const GAME_OVER_IMG_WIDTH = 591;
// const GAME_OVER_IMG_HEIGHT = 158;
const GAME_OVER_IMG = new Image();
GAME_OVER_IMG.src = "./images/collector/gameOver.png";
const BG_IMG = new Image();
// BG_IMG.src = "./images/collector/bgImage.png";
BG_IMG.src = "images/collector/bgImage.png";

// .\collector\images\collector\gameOver.png


// let playerImage = new Image();
// playerImage.src = "images/dragon/" + playerState + frame + ".png";
//     playerImage.onload = () => {
//         ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//         ctx.drawImage(playerImage, 10, 40, SPRITE_WIDTH, SPRITE_HEIGHT);


const PLAYER = {
    img: new Image(),
    x: 200,
    y: 200,
    width: 25,
    height: 45,
    enlarge: 2.5,
    face: {
        "up": "./images/collector/yuki/up.png",
        "down": "./images/collector/yuki/down.png",
        "left": "./images/collector/yuki/left.png",
        "right": "./images/collector/yuki/right.png"
    },
    speed: 17,
};

PLAYER.img.src = PLAYER.face["down"];

const KEYS = {
    // "ArrowUp": true,
    // changed to:
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowRight": false,
    "ArrowLeft": false,
    "r": false,
};

updateCanvasSize();
window.onresize = updateCanvasSize();

let gameOverImgX = CANVAS.width / 2 - GAME_OVER_IMG_WIDTH / 2;
let gameOverImgY = CANVAS.height / 2 - GAME_OVER_IMG_HEIGHT / 2;
let gameOn = true;
let score=0;
let userName = prompt("Please enter your name");
let chooseTime = prompt("Please enter number of seconds you want to play");
let time = chooseTime;

let pokemon1 = new Figure(CTX, "./images/collector/pokemons/pokemon1.png", "pikachu", 0.3, 6);
let pokemon2 = new Figure(CTX, "./images/collector/pokemons/pokemon2.png", "giglipah", 0.3, 7);
let pokemon3 = new Figure(CTX, "./images/collector/pokemons/pokemon3.png", "balbazaur", 0.5, 2);
let pokemonsGroup = [pokemon1, pokemon2, pokemon3];

let bomb1 = new Figure (CTX, "./images/collector/bomb.png", "bomb1", 0.06, 5);
let bomb2 = new Figure (CTX, "./images/collector/bomb.png", "bomb2", 0.09, 3);
let bombsGroup = [bomb1, bomb2];


// document.addEventListener('keydown', controlPlayerMove); 
// above changed to addKey below
// dropdown.addEventListener('change', setState);
document.addEventListener('keydown', addKey);
document.addEventListener('keyup', removeKey);

function updateCanvasSize() {
    CANVAS.width = CANVAS.clientWidth;
    CANVAS.height = CANVAS.clientWidth * 0.5;
}

function writeText(text = "TEXT", color = "black", size = "30", font = "Arial", style = "", x = CANVAS.width / 2, y = CANVAS.height / 2) {
    CTX.font = style + " " + size + "px " + font;
    CTX.fillStyle = color;
    CTX.fillText(text, x, y);
}

function gameLoop() {
    if(gameOn == true){
        // CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        // BG_IMG.onload = () => {
        CTX.drawImage(BG_IMG, 0, 0, CANVAS.width, CANVAS.height);
        // }
        // playerImage.onload = () => {
            //         ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            //         ctx.drawImage(playerImage, 10, 40, SPRITE_WIDTH, SPRITE_HEIGHT);
            

        writeText("Time: " + time, "yellow", 67, undefined, "bold", 900, 77);
        // timer();
        // setTimeout(function() {requestAnimationFrame(gameLoop);}, 1000);
        // requestAnimationFrame(gameLoop); 
        writeText("Hi " + userName, "white", 50, undefined, "bold", 650, 70);
        writeText("Score: " + score, "blue", 50, undefined, "bold", 100, 70);
        drawFigure(PLAYER);
        controlPlayerMove();
        // pokemon1.draw();
        // pokemon2.draw();
        // pokemon3.draw();
        // bomb1.draw();
        // bomb2.draw();
        for(let i = 0; i < pokemonsGroup.length; i++)
        {
            pokemonsGroup[i].draw();
            pokemonsGroup[i].moveToRandomLoc();
        
            if(checkCollision(PLAYER, pokemonsGroup[i]))
            {
                pokemonsGroup[i].jumpToRandomLoc();
                score++;
            }
        }
        for(let i = 0; i < bombsGroup.length; i++)
        {
            bombsGroup[i].draw();
            bombsGroup[i].moveToRandomLoc();

            if(checkCollision(PLAYER, bombsGroup[i])){
                bombsGroup[i].jumpToRandomLoc();
                score--;
            }
        }
    }
    if(KEYS["r"] == true){
        resetGame();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
setInterval(timer, 1000);
// setTimeout(timer, 1000);

function timer() {
    if(time > 0){
        time--;
    }
    else{
        gameOver();
    }
}

function gameOver() {
    gameOn = false;
    
    // GAME_OVER_IMG.onload = () => {
        // above line is testing as on server there is error
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(GAME_OVER_IMG, gameOverImgX, gameOverImgY, GAME_OVER_IMG_WIDTH, GAME_OVER_IMG_HEIGHT);
    // }
    writeText("Your Score:" + score, "yellow", 20, undefined, "bold", GAME_OVER_IMG_WIDTH + 160, GAME_OVER_IMG_HEIGHT + 100);
    writeText("Press r to restart", "white", 20, undefined, "bold", GAME_OVER_IMG_WIDTH + 165, GAME_OVER_IMG_HEIGHT + 125);
}

function addKey(pEvent) {
    console.log(pEvent.key);
    KEYS[pEvent.key] = true;
}

function removeKey(pEvent) {
    KEYS[pEvent.key] = false;
    PLAYER.img.src = PLAYER.face["down"];
}

function controlPlayerMove() {
    if(KEYS["ArrowUp"] == true && PLAYER.y > 0){
        PLAYER.y = PLAYER.y - PLAYER.speed;
        PLAYER.img.src = PLAYER.face["up"];
    }

    if(KEYS["ArrowLeft"] == true && PLAYER.x > 0){
        PLAYER.x = PLAYER.x - PLAYER.speed;
        PLAYER.img.src = PLAYER.face["left"];
    }

    if(KEYS["ArrowDown"] == true && PLAYER.y < (CANVAS.height - PLAYER.height * PLAYER.enlarge)){
        PLAYER.y = PLAYER.y + PLAYER.speed;
        PLAYER.img.src = PLAYER.face["down"];
    }

    if (KEYS["ArrowRight"] && PLAYER.x < (CANVAS.width - PLAYER.width * PLAYER.enlarge)) {
        PLAYER.x = PLAYER.x + PLAYER.speed;
        PLAYER.img.src = PLAYER.face["right"];
    } 
}

function resetGame() {
    if(gameOn == false){
        gameOn = true;
        time = chooseTime;
        score = 0;
    }
}














