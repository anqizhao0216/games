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

  // var scene = Scene(game)

  var game = GuaGame(images, 30, function(g){
    var scene = Scene(g)
    g.runWithScene(scene)

  })
  enableDebug(game, true)

}

__main()
