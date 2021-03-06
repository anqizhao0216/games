var Paddle = function (game) {
  // var img = game.imageByName('paddle')
  var o = game.imageByName('paddle')
  // var image = imageFromPath('paddle.png')
  // var o = {
    // image: image,
    o.x = 100,
    o.y = 200,
    o.speed = 15,
  // }

  // o.image = img

  o.move = function(x) {
    if (x < 0) {
      x = 0
    }

    if (x > 400 - o.image.width) {
      x = 400 - o.image.width
    }

    o.x = x
  }
  o.moveLeft = function() {
    o.move(o.x - o.speed)
  }
  o.moveRight = function() {
    o.move(o.x + o.speed)
  }
  o.collide = function(ball) {
    if (ball.y + ball.image.height > o.y) {
      if (ball.x > o.x && ball.x < o.x + o.image.width) {
        return true
      }
    }

    return false
  }
  return o
}
