class Figure {
    constructor(ctx, imgSrc, name, enlarge = 1, speed = 10, loc = randomLocation(ctx)) {
        this.ctx = ctx;
        this.name = name;
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () =>{
            this.width = this.img.width;
            this.height = this.img.height;
            this.x = randomLocation(ctx).x;
            this.y = randomLocation(ctx).y;
            this.enlarge = enlarge;
            this.speed = speed;
            this.moving = true;
            this.top = this.y;
            this.left = this.x;
            this.bottom = this.y + (this.height * this.enlarge);
            this.right = this.x + (this.width * this.enlarge);
            this.putFigureInBorders({ x: this.x, y: this.y });
        }
            this.targetLoc = loc;
    }

    draw() {
        this.updateLoc();
        this.ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width * this.enlarge, this.height * this.enlarge);
    }


    putFigureInBorders(loc) {
        this.putLocInBorders(loc);
        this.x = loc.x;
        this.y = loc.y;
    }

    moveToRandomLoc() {
        if (this.isInLoc()) {
            var newLoc = randomLocation(this.ctx);
            this.moveToLoc(newLoc);
        }
    }

    moveToLoc(loc) {
        this.putLocInBorders(loc);
        this.targetLoc = loc;
    }

    jumpToRandomLoc() {
        let newLoc = randomLocation(this.ctx);
        this.putLocInBorders(newLoc);
        this.x = newLoc.x;
        this.y = newLoc.y;
    }


    updateLoc() {
        if (this.moving) {
            if (this.targetLoc.x > this.x)
                this.x += this.speed;
            if (this.targetLoc.x < this.x)
                this.x -= this.speed;
            if (this.targetLoc.y > this.y)
                this.y += this.speed;
            if (this.targetLoc.y < this.y)
                this.y -= this.speed;

            this.top = this.y;
            this.left = this.x;
            this.bottom = this.y + (this.height * this.enlarge);
            this.right = this.x + (this.width * this.enlarge);
        }
    }

    putLocInBorders(loc) {
        if (loc.x < 0) {
            loc.x = 0;
        }
        if (loc.y < 0) {
            loc.y = 0
        }
        if (loc.x > (this.ctx.canvas.width - this.width * this.enlarge)) {
            loc.x = (this.ctx.canvas.width - this.width * this.enlarge);
        }
        if (loc.y > (this.ctx.canvas.height - this.height * this.enlarge)) {
            loc.y = (this.ctx.canvas.height - this.height * this.enlarge);
        }
    }

    isInLoc() {
        return (Math.abs(this.x - this.targetLoc.x) <= this.speed && Math.abs(this.y - this.targetLoc.y) <= this.speed);
    }
}

function randomLocation(ctx) {
    let x = Math.floor(Math.random() * ctx.canvas.width);
    let y = Math.floor(Math.random() * ctx.canvas.height);
    return { x: x, y: y };
}


function checkCollision(player, pFigure) {
    if (((player.y >= pFigure.top && player.y <= pFigure.bottom) || (pFigure.top >= player.y && pFigure.top <= player.y + player.height * player.enlarge))
        &&
        ((player.x >= pFigure.left && player.x <= pFigure.right) || (pFigure.left >= player.x && pFigure.left <= player.x + player.width * player.enlarge))) {
        return true;
    }
    return false;
}


////Functions for the main figure///
function drawFigure(figure) {
    CTX.drawImage(figure.img, 0, 0, figure.width, figure.height, figure.x, figure.y, figure.width * figure.enlarge, figure.height * figure.enlarge);
}


function handleFigureFrame(figure) {
    if (figure.frameX < (figure.cols - 1) && figure.moving)
        figure.frameX++;
    else figure.frameX = 0;
}

////End functions for the main figure///