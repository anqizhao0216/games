var Ball = function() {
    var image = imageFromPath('ball.jpeg')
    var o = {
        image: image,
        x: 300,
        y: 400,
        speedX: 10,
        speedY: 10,
        fired: false,
    }
    o.fire = function() {
      o.fired = true
    }
    // bounce
    o.bounce = function() {
      o.speedY *= -1
    }
    o.move = function() {
      if (o.fired) {
          // log('move')
          if (o.x < 0 || o.x > 800) {
            o.speedX = -o.speedX
          }

          if (o.y < 0 || o.y > 600) {
            o.speedY = -o.speedY
          }



          // move
          o.x += o.speedX
          o.y += o.speedY
      }
    }
    return o
}
