class Gamedone {
  constructor() {
    this.x = 250
    this.y = 250;
    this.state = false;
  }
  draw(ctx) {
    if (this.state == true) {
      ctx.fillStyle = "#ffffff";
      ctx.font =  "42px Orbitron"
      ctx.fillText("Game Over in Space", 12, 350);
      ctx.font =  "20px Orbitron"
      ctx.fillText("Press SPACE to play again", 115, 395);
    }
  }
}

module.exports = Gamedone;
