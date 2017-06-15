let Paddle =   require("./paddle.js");
let Ball =     require("./ball.js");
let Brick =    require("./brick.js");
let Start =    require("./start.js");
let Gamedone = require("./game-over.js");

class World {
  constructor(width, height) {
    this.lives = 3;
    this.level = 1;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.paddle = new Paddle({x: 212, y: 450, width: 75, height: 7});
    this.ball = new Ball({x: this.paddle.x + 25, y: 445, radius: 7, startCircle: 0, endCircle: 2*Math.PI, color: 'red'});
    this.brick = brickArray();
    this.start = new Start();
    this.gamedone = new Gamedone();
  }

  brickHitMid() {
    for (let i = 0 ; i < this.brick.length; i++) {

      if (this.ball.hasCollidedMid(this.brick[i])) {
        if (this.brick[i].hits>0) {
          this.score += 10
          this.increaseSpeed();
        }
        this.ball.dy = -this.ball.dy
        this.brick[i].hits--
      }
    }
  }
  brickHitSide() {
    for (let i = 0; i < this.brick.length; i++) {
      if (this.ball.hasCollidedSide(this.brick[i])) {
        this.collideBrickSide();
        if (this.brick[i].hits > 0) {
          this.score += 10
          this.increaseSpeed();
        }
        this.brick[i].hits--
      }
    }
  }
  collideBrickSide() {
    this.ball.dy = -this.ball.dy;
    this.ball.dx = -this.ball.dx;
  }

  bounceLeft() {
    if (this.ball.canCollideLeft(this.paddle)) {
      this.ball.collideLeft();
    }
    return this
  }

  bounceMiddle() {
    if (this.ball.canCollideMiddle(this.paddle)) {
      this.ball.collideMiddle();
    }
    return this
  }

  bounceRight() {
    if (this.ball.canCollideRight(this.paddle)) {
      this.ball.collideRight();
    }
    return this;
  }

  // move to ball
  increaseSpeed() {
    if (this.score % 20 == 0) {
      this.ball.dx = (this.ball.dx) * 1.06
      this.ball.dy = (this.ball.dy) * 1.06
    }
  }
  loseLife() {
    if (this.ball.y > 500) {
      this.lives--
      this.ball.x = this.paddle.x + 10
      this.ball.y = this.paddle.y - 5
      this.ball.dy = 0
      this.ball.dx = 0
    }
  }
  prepareLaunch() {
    if (this.ball.dy === 0 && this.ball.dx === 0) {
      this.ball.x=this.paddle.x + 40
      this.ball.y=this.paddle.y - 5
    }
  }
  gameOver(ctx) {
    if (this.lives === 0) {
      this.ball.x = 250
      this.ball.y = 250
      this.ball.dy = 0
      this.ball.dx = 0
      this.level = 0
      this.gamedone.state = true;
      this.gamedone.draw(ctx);

      for (let i = 0; i < 24; i++) {
        this.brick[i].colorLevel = this.level
        this.brick[i].color = this.brick[i].colors[this.brick[i].colorLevel]
      }
    }
  }
  levelUp() {
    let total = 0


    this.brick.forEach(function(i) {
      if (i.hits === 0) {
        return total++
      }
    })
    if (total === 24) {
      this.ball.x = 250
      this.ball.y = 250
      this.ball.dx = 0
      this.ball.dy = 0
      this.lives ++
      this.level ++
      for (let i = 0; i<total; i++) {
        this.brick[i].hits = this.level
        this.brick[i].color = this.brick[i].colors[this.brick[i].hits+1]

      }
    }
  }




}

let brickArray = () => {
  let bricks = [];

  // consider giving magic numbers variable names
  for (let i = 0; i < 24; i++) {
    let x = 15 + (i % 8) * 60 ;
    let y = 20 + (i % 3) * 30;

    bricks.push(
      new Brick({ x, y, width: 50, height: 26, hits: 1 })
    );
  }
  return bricks;
}

module.exports = World;
