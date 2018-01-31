var GuaGame = function(fps) {
  var g = {
    actions: {}, // store  callbacks
    keydowns: {}, // store keys have been pressed
  }
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d') // 目前只支持二维
  g.canvas = canvas
  g.context = context

  g.drawImage = function(obj) {
    g.context.drawImage(obj.image, obj.x, obj.y)
  }
  // events
  window.addEventListener('keydown', function(event){
    g.keydowns[event.key] = true
  })

  window.addEventListener('keyup', function(event){
    g.keydowns[event.key] = false
  })

  g.regiserAction = function(key, callback) {
    g.actions[key] = callback
  }

  var runloop = function() {
    //update
    var actions = Object.keys(g.actions)
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i]
      if (g.keydowns[key]) {
        g.actions[key]()
      }
    }
    g.update()
    //clear
    g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
    //draw
    g.draw()

    setTimeout(function(){
      runloop()
    }, 1000/window.fps)
  }

  //timer
  setTimeout(function(){
    runloop()
  }, 1000/window.fps)
  return g
}
