let World =  require("./world.js")
let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d')

let world = new World(canvas.width, canvas.height)



document.body.onkeyup = (e) => {
  if (e.keyCode == 32 || e.keyCode == 13 ) {
    ballStart()
  }
}

document.body.onkeydown = (e) => {
  if (e.keyCode == 37) {
    world.paddle.x -= 30
    if (world.paddle.x < 0) {
      world.paddle.x = 0
    }
  }
  if (e.keyCode == 39)  {
    world.paddle.x += 30
    if (world.paddle.x > 428) {
      world.paddle.x = 428
    }
  }
}


canvas.addEventListener('mousemove', (e) => {
  let mouseX = e.offsetX;

  if (mouseX > 465) {
    mouseX = 465
  }
  if (mouseX < 35) {
    mouseX = 35
  }
  world.paddle.draw(ctx, mouseX);
});

let ballStart = () => {
  if (world.lives === 0) {
    world.score = 0
    world.lives = 3
    world.level = 0

    for (let i = 0; i < 24; i++) {
      world.brick[i].hits=1
    }
  }

  if (world.ball.dx === 0) {

    if (world.ball.x > 250) {
      world.ball.dx =- 3;
      world.ball.dy =- 3;

    } else if (world.ball.x < 250) {
      world.ball.dx = 3;
      world.ball.dy =- 3;
    }
  }
  world.start.state = false;
}

function saveHighScore () {
  let newScore = world.score;
  let highScore = JSON.parse(localStorage.getItem("highscore"))

  if (highScore !== null) {
    if (newScore > highScore) {
      localStorage.setItem("highscore", JSON.stringify(newScore));
    }
  } else {
    localStorage.setItem("highscore", JSON.stringify(newScore))
  }
}

function displayHighScore() {
  let highScore = JSON.parse(localStorage.getItem("highscore"));
  let updateHighScore = document.getElementById('highScore').innerHTML = highScore;
}

function drawBrick() {
  for (let i = 0; i < world.brick.length; i++) {

    if (world.brick[i].hits > 0) {
      world.brick[i].draw(ctx)
      world.brick[i].color=world.brick[i].colors[world.brick[i].hits-1]
      let score = document.getElementById('score').innerHTML=world.score;
      let lives = document.getElementById('lives').innerHTML=world.lives;
    }

  }
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world.paddle.draw(ctx);
  world.ball.draw(ctx);
  world.bounceLeft()
        .bounceRight()
        .bounceMiddle()
        .brickHitSide()
  world.brickHitMid();
  world.loseLife()
  world.gameOver(ctx)
  world.levelUp()
  world.prepareLaunch()
  world.start.draw(ctx);
  saveHighScore();
  displayHighScore();
  drawBrick();


  // draw brick if hitval is greater than one --> drawBricks()

  requestAnimationFrame(gameLoop);
})
