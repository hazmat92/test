const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
const GAME_OVER_IMG_WIDTH = 960;
const GAME_OVER_IMG_HEIGHT = 572;
const GAME_OVER_IMG = new Image();
GAME_OVER_IMG.src = "./images/collector/gameoverimg.png"

const BG_IMG = new Image();
BG_IMG.src = "./images/collector/bgImage.png";
updateCanvasSize();
window.onresize = updateCanvasSize();

const PLAYER = {
    img: new Image,
    x: 200,
    y: 200,
    width: 25,
    height: 45,
    enlarge: 2.5,
    face: {
        "up": "./images/collector/yuki/up.png",
        "down": "./images/collector/yuki/down.png",
        "left": "./images/collector/yuki/left.png",
        "right":"./images/collector/yuki/right.png"
    },
    speed: 5,
};

PLAYER.img.src = PLAYER.face["down"];

const KEYS = {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowRight": false,
    "ArrowLeft": false,
};

let gameOverImgX = CANVAS.width/2 - GAME_OVER_IMG_WIDTH/2;
let gameOverImgY = CANVAS.height/2 - GAME_OVER_IMG_HEIGHT/2;
let time = 10;
let gameOn = true;
let userName = prompt("Please enter your name");
let pokemon1 = new Figure(CTX, "./images/collector/pokemons/pokemon1.png", "pikachu", 0.3, 4);
let pokemon2 = new Figure(CTX, "./images/collector/pokemons/pokemon2.png", "giglipah", 0.3, 5);
let pokemon3 = new Figure(CTX, "./images/collector/pokemons/pokemon3.png", "balbazaur", 0.5, 6);
let pokemonsGroup = [pokemon1, pokemon2, pokemon3];

let bomb1 = new Figure (CTX, "./images/collector/bomb.png", "bomb1", 0.08, 3);
let bomb2 = new Figure (CTX, "./images/collector/bomb.png", "bomb2", 0.08, 4);
let bombsGroup = [bomb1, bomb2];

document.addEventListener('keydown', addKey);
document.addEventListener('keyup', removeKey);

function updateCanvasSize() {
    CANVAS.width = CANVAS.clientWidth;
    CANVAS.height = CANVAS.clientWidth * 0.5;
}

function writeText(text = "TEXT", color = "black", colorFill = "red", size = "30", font = "cursive", style = "italic", x = CANVAS.width / 2, y = CANVAS.height / 2) {
    CTX.font = style + " " + size + "px " + font;
    CTX.fillStyle = colorFill;
    CTX.strokeStyle = color;
    CTX.lineWidth = 5;
    CTX.strokeText(text, x, y);
    CTX.fillText(text, x, y);

// CTX.fillStyle = 'red';
// CTX.strokeStyle = 'black';

// CTX.font = style + " " + size + "px " + font;
// CTX.fillText( text, 50, 50);
// CTX.strokeText(text, 50, 50);

// CTX.fill();
// CTX.stroke();
}

function timer(){
    if(time > 0){
        time --;
    }
    else{
        gameOver();
    }
}

function addKey(pEvent){
    KEYS[pEvent.key] = true;
    console.log(pEvent.key);
}

function removeKey(pEvent){
    KEYS[pEvent.key] = false;
    PLAYER.img.src = PLAYER.face["down"];
}

function gameOver(){
    gameOn = false;
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(GAME_OVER_IMG, gameOverImgX, gameOverImgY, GAME_OVER_IMG_WIDTH, GAME_OVER_IMG_HEIGHT)
}

function controlPlayerMove(){
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

function gameLoop(){
    if(gameOn == true){
    //CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(BG_IMG, 0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "black";
    writeText("Time: " + time, "blue", "orange", 50, undefined, "bold", 1150, 90);
    writeText("Hello " + userName, "black", "brown", 50, undefined, "bold", 50, 90);
    drawFigure(PLAYER);
    controlPlayerMove();
    for(let i = 0; i<pokemonsGroup.length; i++){
        pokemonsGroup[i].draw();
        pokemonsGroup[i].moveToRandomLoc();
    }

    for(let i = 0; i<bombsGroup.length; i++){
        bombsGroup[i].draw();
        bombsGroup[i].moveToRandomLoc();
    }
    // pokemon1.draw();
    // pokemon2.draw();
    // pokemon3.draw();
    // bomb1.draw();
    // bomb2.draw();
    // timer();
    // setTimeout(function() {requestAnimationFrame(gameLoop);}, 1000);
    requestAnimationFrame(gameLoop);
    }
}

gameLoop();
setInterval(timer, 1000);