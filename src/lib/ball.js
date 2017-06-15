class Ball {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius;
    this.startCircle = options.firstAngle;
    this.endCircle = options.endCircle;
    this.color = options.color;
    this.dy = 0
    this.dx = 0
  }
  draw(ctx) {
    ctx.fillStyle = "#f5f5f5"
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6.5, 0, 2*Math.PI);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.strokeStyle = "#5d15ff"
    ctx.fill();
    this.move()
  }

  move() {
    // if ball hits walls bounce off
    if (this.x + this.dx > 500 || this.x + this.dx < 0) {
      this.dx = this.dx *- 1
    }

    // hits ceiling bounce off
    if (this.y + this.dy < 0 ) {
      this.dy = this.dy *- 1

    // hits bottom
    } else if (this.y > 500) {
      this.y = 510;
      this.dy = 0;
      this.dx = 0;
    }

    // move ball
    this.x += this.dx;
    this.y += this.dy;

    return this
  }
  hasCollidedMid( brick ) {
    if (brick.hits > 0 &&
        this.x >= brick.x &&
        this.x <= brick.x + brick.width &&
        this.y >= brick.y - brick.wiggleTopY &&
        this.y <= brick.y + brick.height) {
      return true;
    } else {
      return false;
    }
  }

  hasCollidedSide( brick ) {
    if (brick.hits > 0 &&
        this.x >= brick.x - brick.wiggleLeftX &&
        this.x <= brick.x + brick.wigglerightX &&
        this.y >= brick.y - brick.wiggleTopY &&
        this.y <= brick.y + brick.height) {

      return true;

    } else if (brick.hits > 0 &&
        this.x >= brick.x + brick.width - brick.wiggleLeftX &&
        this.x <= brick.x + brick.width + brick.wigglerightX &&
        this.y >= brick.y - brick.wiggleTopY &&
        this.y <= brick.y + brick.height) {

      return true;
    }

    return false;
  }

  canCollideLeft(paddle) {
    if (this.hasCollidedPaddleLeft(paddle)) {
      return true;
    }
  }

  canCollideRight(paddle) {
    if (this.hasCollidedPaddleRight(paddle)) {
      return true;
    }
  }

  canCollideMiddle(paddle) {
    if (this.hasCollidedPaddleMid(paddle)) {
      return true;
    }
  }

  collideMiddle() {
    this.dy = -this.dy
  }

  collideLeft() {
    if (this.dx < 0) {
      this.dy = -this.dy
      this.dx = this.dx

    } else if (this.dx >= 0) {
      this.dy = -this.dy
      this.dx = -this.dx
    }
  }
  collideRight() {
    if (this.dx < 0) {
      this.dy = -this.dy
      this.dx = -this.dx

    } else if (this.dx >= 0) {
      this.dy = -this.dy
      this.dx = this.dx
    }
  }


  hasCollidedPaddleLeft( paddle ) {
    if (this.x >= paddle.x - paddle.wiggleLeftX &&
        this.x <= paddle.x + paddle.wiggleRightX &&
        this.y >= paddle.y - paddle.wiggleTopY &&
        this.y <= paddle.y + paddle.height) {
      return true;
    } else {
      return false;
    }
  }

  hasCollidedPaddleRight( paddle ) {
    if (this.x >= paddle.x + paddle.width - paddle.wiggleRightX &&
        this.x <= paddle.x + paddle.width + paddle.wiggleLeftX &&
        this.y >= paddle.y - paddle.wiggleTopY &&
        this.y <= paddle.y + paddle.height) {
      return true;
    } else {
      return false;
    }
  }

  hasCollidedPaddleMid( paddle ) {
    if (this.x >= paddle.x + paddle.wiggleRightX&&
        this.x <= paddle.x + paddle.width - paddle.wiggleRightX &&
        this.y >= paddle.y - paddle.wiggleTopY &&
        this.y <= paddle.y + paddle.height) {
      return true;
    } else {
      return false;
    }
  }
}



module.exports = Ball;
