var Ball = function(game) {
  var o = game.imageByName('ball') // game.imageByName 函数返回一个已经加载完毕的对象
  // var image = imageFromPath('ball.png')
  // var o = {
    o.x = 100,
    o.y = 150,
    o.speedX = 10,
    o.speedY = 10,
    o.fired = false,
  // }
  o.fire = function() {
    o.fired = true
  }
  o.move = function() {
    if (o.fired) {
      // log('move')
      if (o.x < 0 || o.x > 400) {
        o.speedX = -o.speedX
      }
      if (o.y < 0 || o.y > 400) {
        o.speedY = -o.speedY
      }
      o.x += o.speedX
      o.y += o.speedY
    }

  }
  o.bounce = function() {
    o.speedY *= -1
  }

  return o
}
