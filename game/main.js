// 最外层只能有函数，不能有变量，代码应该是以函数为基本单位的

var loadLevel = function(n) {
  n = n - 1
  var level = levels[n]
  var blocks = []
  for (var i = 0; i < level.length; i++) {
    var p = level[i]
    var b = Block(p)
    blocks.push(b)
  }
  return blocks
}


var blocks
var enableDebugMode = function(enable) {
  if (!enable) {
    return
  }
  window.paused = false
  window.addEventListener('keydown', function(event) {
    var k = event.key
    if (k == 'p') {
      window.paused = !window.paused
    } else if ('1234567'.includes(k)) {
      blocks = loadLevel(Number(k))
    }
  })
  // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })

}
var _main = function() {
    enableDebugMode(true)
    var game = Game(30)

    var paddle = Paddle()
    var ball = Ball()
    var score = 0

    blocks = loadLevel(1)

    var paused = false
    game.registerAction('a', function() {
      // log('a')
      paddle.moveLeft()
    })

    game.registerAction('d', function() {
      paddle.moveRight()
    })

    game.registerAction('f', function() {
      ball.fire()
    })

    game.update = function() {
      if (window.paused) {
          return
      }
      ball.move()
      if (paddle.collide(ball)) {
        //  这里应该调用一个 ball.反弹() 来实现
        ball.bounce()
        // ball.speedY *= -1
      }
      // 判断 ball 和 block 相撞
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        if (block.alive && block.collide(ball)) {
          log('block')
          block.kill()
          // update score
          score += 100
          ball.bounce()
        }
      }

    }

    game.draw = function() {
      // draw
      game.drawImage(paddle)
      game.drawImage(ball)

      // draw block
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        if (block.alive) {
          game.drawImage(block)
        }
      }

      // draw labels
      game.context.fillText(score, 10, 400)
    }
}

_main()
