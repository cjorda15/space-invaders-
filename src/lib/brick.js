class Brick {
  constructor(options) {
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.hits = options.hits;
    this.colors = ["cyan", "red", "blue", "white", "orange", "yellow", "pink"]
    // this.colors=["#6bcfff", "#6bffe3", "#a3fff5", "#6bff8d", "#e7ff6b", "#ffb46b", "#ff6c6b"]
    this.wiggleLeftX = 1;
    this.wigglerightX = 3;
    this.wiggleTopY = 1;
  }
  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    return this;
  }
}

module.exports = Brick;
