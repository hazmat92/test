let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let isDrawing = false;
let drawColor = "black";
let drawWidth = "2";
let restoreArray = [];
let index = -1;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);
canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDraw);

// fix_dpi();
// ctx.beginPath();
// ctx.lineWidth = "6";
// ctx.strokeStyle = "blue";
// ctx.moveTo(60, 20);
// ctx.lineTo(50, canvas.height); for exercise
// ctx.lineTo(canvas.width, 40); for adv part
// ctx.stroke();

// ctx.font = "150px Comic Sans MS";
// ctx.fillStyle = "orange";
// ctx.strokeStyle = "pink"; adv part
// ctx.textAlign = "center";
// ctx.fillText("Be Cool", canvas.width/2, canvas.height/2);
// ctx.strokeText("Be Cool", canvas.width/2, canvas.height/2); adv

// ctx.fillStyle = "red";
// ctx.fillRect(canvas.width/2 -40, canvas.height/2 +100, 80, 80);

updateCanvasSize();
// window.onresize = updateCanvasSize();
window.onresize = saveData;

function saveData() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    updateCanvasSize();
    ctx.putImageData(imgData, 0, 0);
}

function updateCanvasSize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientWidth * 0.5;
}

function start(pEvent) {
    isDrawing = true;
    ctx.beginPath();
    // ctx.moveTo(pEvent.clientX, pEvent.clientY);
    if(pEvent.type == 'touchstart'){
        ctx.moveTo(pEvent.touches[0].clientX - canvas.getBoundingClientRect().left,
            pEvent.touches[0].clientY - canvas.getBoundingClientRect().top);    
    }
    else{
        ctx.moveTo(pEvent.clientX - canvas.getBoundingClientRect().left,
        pEvent.clientY - canvas.getBoundingClientRect().top);
    }
}

function draw(pEvent) {
    if(isDrawing){
        // ctx.lineTo(pEvent.clientX, pEvent.clientY);
        if(pEvent.type == 'touchmove'){
            ctx.lineTo(pEvent.touches[0].clientX - canvas.getBoundingClientRect().left,
            pEvent.touches[0].clientY - canvas.getBoundingClientRect().top);    
        }
        else{

            ctx.lineTo(pEvent.clientX - canvas.getBoundingClientRect().left,
            pEvent.clientY - canvas.getBoundingClientRect().top);
        }
        // ctx.strokeStyle = "blue";
        ctx.strokeStyle = drawColor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // ctx.lineWidth = "4";
        ctx.lineWidth = drawWidth;
        ctx.stroke();
    }
}

function stopDraw(pEvent) {
    isDrawing = false;
    if(pEvent.type != 'mouseout'){
        restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        console.log("restoreArray: " + restoreArray);
        index = index + 1;
        // console.log("Index: " + index);    
    }
}

function changeColor(pElement) {
    drawColor = pElement.style.background;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    restoreArray = [];
    index = -1;
}

function saveImage() {
    let imageName = prompt("Please choose a name for your painting", "My paint");
    let dataUrl = canvas.toDataURL("image/png");
    console.log("dataUrl: " + dataUrl);
    let downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = imageName;
    // downloadLink.download = 'myPaint.png';
    downloadLink.click();
    downloadLink.delete;
}

function undoLast() {
    if(index <= 0){
        clearCanvas();
    }
    else{
        index = index - 1;
        restoreArray.pop();
        // console.log("Index: " + index);
        ctx.putImageData(restoreArray[index], 0, 0);
    }
}

