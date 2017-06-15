/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var World = __webpack_require__(6);
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var world = new World(canvas.width, canvas.height);

document.body.onkeyup = function (e) {
  if (e.keyCode == 32 || e.keyCode == 13) {
    ballStart();
  }
};

document.body.onkeydown = function (e) {
  if (e.keyCode == 37) {
    world.paddle.x -= 30;
    if (world.paddle.x < 0) {
      world.paddle.x = 0;
    }
  }
  if (e.keyCode == 39) {
    world.paddle.x += 30;
    if (world.paddle.x > 428) {
      world.paddle.x = 428;
    }
  }
};

canvas.addEventListener('mousemove', function (e) {
  var mouseX = e.offsetX;

  if (mouseX > 465) {
    mouseX = 465;
  }
  if (mouseX < 35) {
    mouseX = 35;
  }
  world.paddle.draw(ctx, mouseX);
});

var ballStart = function ballStart() {
  if (world.lives === 0) {
    world.score = 0;
    world.lives = 3;
    world.level = 0;

    for (var i = 0; i < 24; i++) {
      world.brick[i].hits = 1;
    }
  }

  if (world.ball.dx === 0) {

    if (world.ball.x > 250) {
      world.ball.dx = -3;
      world.ball.dy = -3;
    } else if (world.ball.x < 250) {
      world.ball.dx = 3;
      world.ball.dy = -3;
    }
  }
  world.start.state = false;
};

function saveHighScore() {
  var newScore = world.score;
  var highScore = JSON.parse(localStorage.getItem("highscore"));

  if (highScore !== null) {
    if (newScore > highScore) {
      localStorage.setItem("highscore", JSON.stringify(newScore));
    }
  } else {
    localStorage.setItem("highscore", JSON.stringify(newScore));
  }
}

function displayHighScore() {
  var highScore = JSON.parse(localStorage.getItem("highscore"));
  var updateHighScore = document.getElementById('highScore').innerHTML = highScore;
}

function drawBrick() {
  for (var i = 0; i < world.brick.length; i++) {

    if (world.brick[i].hits > 0) {
      world.brick[i].draw(ctx);
      world.brick[i].color = world.brick[i].colors[world.brick[i].hits - 1];
      var score = document.getElementById('score').innerHTML = world.score;
      var lives = document.getElementById('lives').innerHTML = world.lives;
    }
  }
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world.paddle.draw(ctx);
  world.ball.draw(ctx);
  world.bounceLeft().bounceRight().bounceMiddle().brickHitSide();
  world.brickHitMid();
  world.loseLife();
  world.gameOver(ctx);
  world.levelUp();
  world.prepareLaunch();
  world.start.draw(ctx);
  saveHighScore();
  displayHighScore();
  drawBrick();

  // draw brick if hitval is greater than one --> drawBricks()

  requestAnimationFrame(gameLoop);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
  function Ball(options) {
    _classCallCheck(this, Ball);

    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius;
    this.startCircle = options.firstAngle;
    this.endCircle = options.endCircle;
    this.color = options.color;
    this.dy = 0;
    this.dx = 0;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#f5f5f5";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 6.5, 0, 2 * Math.PI);
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.strokeStyle = "#5d15ff";
      ctx.fill();
      this.move();
    }
  }, {
    key: "move",
    value: function move() {
      // if ball hits walls bounce off
      if (this.x + this.dx > 500 || this.x + this.dx < 0) {
        this.dx = this.dx * -1;
      }

      // hits ceiling bounce off
      if (this.y + this.dy < 0) {
        this.dy = this.dy * -1;

        // hits bottom
      } else if (this.y > 500) {
        this.y = 510;
        this.dy = 0;
        this.dx = 0;
      }

      // move ball
      this.x += this.dx;
      this.y += this.dy;

      return this;
    }
  }, {
    key: "hasCollidedMid",
    value: function hasCollidedMid(brick) {
      if (brick.hits > 0 && this.x >= brick.x && this.x <= brick.x + brick.width && this.y >= brick.y - brick.wiggleTopY && this.y <= brick.y + brick.height) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "hasCollidedSide",
    value: function hasCollidedSide(brick) {
      if (brick.hits > 0 && this.x >= brick.x - brick.wiggleLeftX && this.x <= brick.x + brick.wigglerightX && this.y >= brick.y - brick.wiggleTopY && this.y <= brick.y + brick.height) {

        return true;
      } else if (brick.hits > 0 && this.x >= brick.x + brick.width - brick.wiggleLeftX && this.x <= brick.x + brick.width + brick.wigglerightX && this.y >= brick.y - brick.wiggleTopY && this.y <= brick.y + brick.height) {

        return true;
      }

      return false;
    }
  }, {
    key: "canCollideLeft",
    value: function canCollideLeft(paddle) {
      if (this.hasCollidedPaddleLeft(paddle)) {
        return true;
      }
    }
  }, {
    key: "canCollideRight",
    value: function canCollideRight(paddle) {
      if (this.hasCollidedPaddleRight(paddle)) {
        return true;
      }
    }
  }, {
    key: "canCollideMiddle",
    value: function canCollideMiddle(paddle) {
      if (this.hasCollidedPaddleMid(paddle)) {
        return true;
      }
    }
  }, {
    key: "collideMiddle",
    value: function collideMiddle() {
      this.dy = -this.dy;
    }
  }, {
    key: "collideLeft",
    value: function collideLeft() {
      if (this.dx < 0) {
        this.dy = -this.dy;
        this.dx = this.dx;
      } else if (this.dx >= 0) {
        this.dy = -this.dy;
        this.dx = -this.dx;
      }
    }
  }, {
    key: "collideRight",
    value: function collideRight() {
      if (this.dx < 0) {
        this.dy = -this.dy;
        this.dx = -this.dx;
      } else if (this.dx >= 0) {
        this.dy = -this.dy;
        this.dx = this.dx;
      }
    }
  }, {
    key: "hasCollidedPaddleLeft",
    value: function hasCollidedPaddleLeft(paddle) {
      if (this.x >= paddle.x - paddle.wiggleLeftX && this.x <= paddle.x + paddle.wiggleRightX && this.y >= paddle.y - paddle.wiggleTopY && this.y <= paddle.y + paddle.height) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "hasCollidedPaddleRight",
    value: function hasCollidedPaddleRight(paddle) {
      if (this.x >= paddle.x + paddle.width - paddle.wiggleRightX && this.x <= paddle.x + paddle.width + paddle.wiggleLeftX && this.y >= paddle.y - paddle.wiggleTopY && this.y <= paddle.y + paddle.height) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "hasCollidedPaddleMid",
    value: function hasCollidedPaddleMid(paddle) {
      if (this.x >= paddle.x + paddle.wiggleRightX && this.x <= paddle.x + paddle.width - paddle.wiggleRightX && this.y >= paddle.y - paddle.wiggleTopY && this.y <= paddle.y + paddle.height) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Ball;
}();

module.exports = Ball;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Brick = function () {
  function Brick(options) {
    _classCallCheck(this, Brick);

    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.hits = options.hits;
    this.colors = ["cyan", "red", "blue", "white", "orange", "yellow", "pink"];
    // this.colors=["#6bcfff", "#6bffe3", "#a3fff5", "#6bff8d", "#e7ff6b", "#ffb46b", "#ff6c6b"]
    this.wiggleLeftX = 1;
    this.wigglerightX = 3;
    this.wiggleTopY = 1;
  }

  _createClass(Brick, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      return this;
    }
  }]);

  return Brick;
}();

module.exports = Brick;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gamedone = function () {
  function Gamedone() {
    _classCallCheck(this, Gamedone);

    this.x = 250;
    this.y = 250;
    this.state = false;
  }

  _createClass(Gamedone, [{
    key: "draw",
    value: function draw(ctx) {
      if (this.state == true) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "42px Orbitron";
        ctx.fillText("Game Over in Space", 12, 350);
        ctx.font = "20px Orbitron";
        ctx.fillText("Press SPACE to play again", 115, 395);
      }
    }
  }]);

  return Gamedone;
}();

module.exports = Gamedone;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paddle = function () {
  function Paddle(options) {
    _classCallCheck(this, Paddle);

    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = "#eef9f6";
    this.target = "#39ffd3";
    this.wiggleLeftX = 2;
    this.wiggleRightX = 13;
    this.wiggleTopY = 2;
  }

  _createClass(Paddle, [{
    key: "draw",
    value: function draw(ctx, mouseX) {
      var locationX = mouseX - 37 || this.x;

      ctx.fillStyle = this.color;
      ctx.fillRect(locationX, this.y, this.width, this.height);
      ctx.fillStyle = this.target;
      ctx.fillRect(locationX + 17, this.y, 43, this.height);
      ctx.fillStyle = "this.color";
      ctx.fillRect(locationX + 21, this.y + 3, 36, this.height);
      ctx.fillRect(locationX + 26, this.y + 6, 28, this.height);
      this.move(locationX);
      return this;
    }
  }, {
    key: "move",
    value: function move(location) {
      this.x = location;
    }
  }]);

  return Paddle;
}();

module.exports = Paddle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Start = function () {
  function Start() {
    _classCallCheck(this, Start);

    this.x = 250;
    this.y = 250;
    this.state = true;
  }

  _createClass(Start, [{
    key: "draw",
    value: function draw(ctx) {
      if (this.state == true) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "21px Play";
        ctx.fillText("Press SPACE or ENTER to play SPACE BREAKOUT", 22, 350);
        ctx.fillText("Move the Mouse or use Left and Right arrows", 37, 390);
        ctx.fillText("to move the Paddle!", 170, 420);
      }
    }
  }]);

  return Start;
}();

module.exports = Start;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paddle = __webpack_require__(4);
var Ball = __webpack_require__(1);
var Brick = __webpack_require__(2);
var Start = __webpack_require__(5);
var Gamedone = __webpack_require__(3);

var World = function () {
  function World(width, height) {
    _classCallCheck(this, World);

    this.lives = 3;
    this.level = 1;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.paddle = new Paddle({ x: 212, y: 450, width: 75, height: 7 });
    this.ball = new Ball({ x: this.paddle.x + 25, y: 445, radius: 7, startCircle: 0, endCircle: 2 * Math.PI, color: 'red' });
    this.brick = brickArray();
    this.start = new Start();
    this.gamedone = new Gamedone();
  }

  _createClass(World, [{
    key: "brickHitMid",
    value: function brickHitMid() {
      for (var i = 0; i < this.brick.length; i++) {

        if (this.ball.hasCollidedMid(this.brick[i])) {
          if (this.brick[i].hits > 0) {
            this.score += 10;
            this.increaseSpeed();
          }
          this.ball.dy = -this.ball.dy;
          this.brick[i].hits--;
        }
      }
    }
  }, {
    key: "brickHitSide",
    value: function brickHitSide() {
      for (var i = 0; i < this.brick.length; i++) {
        if (this.ball.hasCollidedSide(this.brick[i])) {
          this.collideBrickSide();
          if (this.brick[i].hits > 0) {
            this.score += 10;
            this.increaseSpeed();
          }
          this.brick[i].hits--;
        }
      }
    }
  }, {
    key: "collideBrickSide",
    value: function collideBrickSide() {
      this.ball.dy = -this.ball.dy;
      this.ball.dx = -this.ball.dx;
    }
  }, {
    key: "bounceLeft",
    value: function bounceLeft() {
      if (this.ball.canCollideLeft(this.paddle)) {
        this.ball.collideLeft();
      }
      return this;
    }
  }, {
    key: "bounceMiddle",
    value: function bounceMiddle() {
      if (this.ball.canCollideMiddle(this.paddle)) {
        this.ball.collideMiddle();
      }
      return this;
    }
  }, {
    key: "bounceRight",
    value: function bounceRight() {
      if (this.ball.canCollideRight(this.paddle)) {
        this.ball.collideRight();
      }
      return this;
    }

    // move to ball

  }, {
    key: "increaseSpeed",
    value: function increaseSpeed() {
      if (this.score % 20 == 0) {
        this.ball.dx = this.ball.dx * 1.06;
        this.ball.dy = this.ball.dy * 1.06;
      }
    }
  }, {
    key: "loseLife",
    value: function loseLife() {
      if (this.ball.y > 500) {
        this.lives--;
        this.ball.x = this.paddle.x + 10;
        this.ball.y = this.paddle.y - 5;
        this.ball.dy = 0;
        this.ball.dx = 0;
      }
    }
  }, {
    key: "prepareLaunch",
    value: function prepareLaunch() {
      if (this.ball.dy === 0 && this.ball.dx === 0) {
        this.ball.x = this.paddle.x + 40;
        this.ball.y = this.paddle.y - 5;
      }
    }
  }, {
    key: "gameOver",
    value: function gameOver(ctx) {
      if (this.lives === 0) {
        this.ball.x = 250;
        this.ball.y = 250;
        this.ball.dy = 0;
        this.ball.dx = 0;
        this.level = 0;
        this.gamedone.state = true;
        this.gamedone.draw(ctx);

        for (var i = 0; i < 24; i++) {
          this.brick[i].colorLevel = this.level;
          this.brick[i].color = this.brick[i].colors[this.brick[i].colorLevel];
        }
      }
    }
  }, {
    key: "levelUp",
    value: function levelUp() {
      var total = 0;

      this.brick.forEach(function (i) {
        if (i.hits === 0) {
          return total++;
        }
      });
      if (total === 24) {
        this.ball.x = 250;
        this.ball.y = 250;
        this.ball.dx = 0;
        this.ball.dy = 0;
        this.lives++;
        this.level++;
        for (var i = 0; i < total; i++) {
          this.brick[i].hits = this.level;
          this.brick[i].color = this.brick[i].colors[this.brick[i].hits + 1];
        }
      }
    }
  }]);

  return World;
}();

var brickArray = function brickArray() {
  var bricks = [];

  // consider giving magic numbers variable names
  for (var i = 0; i < 24; i++) {
    var x = 15 + i % 8 * 60;
    var y = 20 + i % 3 * 30;

    bricks.push(new Brick({ x: x, y: y, width: 50, height: 26, hits: 1 }));
  }
  return bricks;
};

module.exports = World;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);