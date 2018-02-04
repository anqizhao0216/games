var Scene = function(game) {
  var s = {
    game: game,
  }
  // 初始化
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


  s.draw = function() {

    game.context.fillStyle =  "#554"
    game.context.fillRect(0, 0, 400, 300)
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
  s.update = function() {
    if (window.paused) {
      return
    }
    ball.move()
    if (ball.y > paddle.y) {
        // 跳转到 游戏结束 的场景
        var end = SceneEnd(game)
        game.replaceScene(end)
    }
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

  // mouse event
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

  return s
}
