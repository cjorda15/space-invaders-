class Start {
  constructor() {
    this.x = 250
    this.y = 250;
    this.state = true;
  }
  draw(ctx) {
    if (this.state == true) {
      ctx.fillStyle = "#ffffff";
      ctx.font =  "21px Play"
      ctx.fillText("Press SPACE or ENTER to play SPACE BREAKOUT", 22, 350);
      ctx.fillText("Move the Mouse or use Left and Right arrows", 37, 390);
      ctx.fillText("to move the Paddle!", 170, 420);
    }
  }
}

module.exports = Start;
