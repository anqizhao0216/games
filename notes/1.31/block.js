var Block = function (game, position) {

  var p = position
  var o = game.imageByName('block')
  // var image = imageFromPath('block.png')
  // var o = {
    // image: image,
    o.x = p[0],
    o.y = p[1],
    // w = 50,
    // h = 20,
    o.lives = p[2] || 1,
    o.alive = true,
  // }

  // o.image = img
  // o.w = img.w
  // o.h = img.h

  o.kill = function() {
    o.lives--
    if (o.lives < 1) {
        o.alive = false
    }
  }
  o.collide = function(ball) {
    return (o.alive && (rectIntersects(o, ball) | rectIntersects(ball, o)))
  }
  return o
}
