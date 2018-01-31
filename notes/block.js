var Block = function (position) {
  var p = position
  var image = imageFromPath('block.png')
  var o = {
    image: image,
    x: p[0],
    y: p[1],
    w: 50,
    h: 20,
    lives: p[2] || 1,
    alive: true,
  }
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
