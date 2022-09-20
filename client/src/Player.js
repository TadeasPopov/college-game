class Player {
    constructor(xPos, yPos, width, height, color, xSpeed, ySpeed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.color = color;
        this.xSpeed = xSpeed;
        this.ySpeed =ySpeed;
    }
    
    draw(objects, canvas, ctx) {
        ctx.fillStyle = this.color;
		ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

    move(canvas, keyValues) {
        console.log(keyValues[0], ' ', this.xPos);
        console.log(canvas.width);
        if(keyValues[1] && this.xPos >= 0 && this.xPos + this.width < canvas.width) { this.xPos += this.xSpeed; }
        if(keyValues[0] && this.xPos > 0) { this.xPos -= this.xSpeed; }
        if(keyValues[3] && this.yPos >= 0) { this.yPos += this.ySpeed };
        if(keyValues[2]) { this.yPos -= this.ySpeed };  



    }
}