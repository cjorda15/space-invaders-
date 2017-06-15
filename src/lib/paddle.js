class Paddle {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = "#eef9f6"
    this.target = "#39ffd3"
    this.wiggleLeftX = 2;
    this.wiggleRightX = 13;
    this.wiggleTopY = 2;
  }
  draw(ctx, mouseX) {
    let locationX = mouseX - 37 || this.x;

    ctx.fillStyle = this.color;
    ctx.fillRect(locationX, this.y, this.width, this.height)
    ctx.fillStyle = this.target;
    ctx.fillRect (locationX + 17, this.y, 43, this.height)
    ctx.fillStyle = "this.color";
    ctx.fillRect(locationX + 21, this.y + 3, 36, this.height)
    ctx.fillRect(locationX + 26, this.y + 6, 28, this.height)
    this.move(locationX);
    return this;
  }
  move(location) {
    this.x = location;
  }
}

module.exports = Paddle
