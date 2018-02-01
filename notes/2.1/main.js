var blocks = []

var loadlevel = function(game, n) {
  var blocks = []
  var level = levels[n-1]
  for (var i = 0; i < level.length; i++){
    var position = level[i]
    blocks.push(Block(game, position))
  }
  return blocks
}

var enableDebug = function(game, enable) {
  if (!enable) {
    return
  }
  window.paused = false
  window.addEventListener('keydown', function(event) {
    var k = event.key
    if (k == 'p') {
      paused = !paused
    } else if ("123456789".includes(k)){
      var n = Number(k)
      blocks = loadlevel(game, n)
    }
  })

  document.querySelector('#fps-slider').addEventListener('input', function(event) {
    window.fps = Number(event.target.value)
  })

}

var __main = function () {
  window.fps = 30
  // var paused = false
  var images = {
    ball: 'ball.png',
    block: 'block.png',
    paddle: 'paddle.png'
  }


  var game = GuaGame(images, 30, function(g){
    var paddle = Paddle(game)
    var ball = Ball(game)


    blocks = loadlevel(game, 1)

    game.regiserAction('a', function() {
      paddle.moveLeft()
    })
    game.regiserAction('d', function() {
      paddle.moveRight()
    })
    game.regiserAction('f', function() {
      ball.fire()
    })

    game.update = function() {
      if (paused) {
        return
      }
      ball.move()

      //collide
      if (paddle.collide(ball)) {
        ball.bounce()
      }

      // ball & block collide
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        if (block.collide(ball)) {
          log('block')
          block.kill()
          ball.bounce()
        }
      }
    }

    game.draw = function() {
      // draw
      game.drawImage(paddle)
      game.drawImage(ball)
      // draw blocks
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        if (block.alive) {
            game.drawImage(block)
        }
      }
    }

    var enableDrag = false

    game.canvas.addEventListener('mousedown', function(){
      var x = event.offsetX
      var y = event.offsetY
      log(x, y)
      if (ball.hasPoint(x,y)) {
        enableDrag = true
      }
    })

    game.canvas.addEventListener('mousemove', function(){
      var x = event.offsetX
      var y = event.offsetY
      if (enableDrag) {
        ball.x = x
        ball.y = y
      }

    })

    game.canvas.addEventListener('mouseup', function(){
      // var x = event.offsetX
      // var y = event.offsetY
      enableDrag = false
    })





  })
  enableDebug(game, true)

}

__main()
