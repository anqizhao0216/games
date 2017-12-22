var Game = function(fps) {
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    var g = {
      actions: {},
      keydowns: {},
    }

    g.canvas = canvas
    g.context = context

    // draw image
    g.drawImage = function(paddle) {
      g.context.drawImage(paddle.image, paddle.x, paddle.y)
    }

    window.addEventListener('keydown', function() {
      g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', function() {
      g.keydowns[event.key] = false
    })

    g.registerAction = function(key, callback) {
      g.actions[key] = callback
    }
    window.fps = 30
    var runloop = function() {
      log(window.fps)
      // events
      var actions = Object.keys(g.actions)
      for (var i = 0; i < actions.length; i++) {
        var key = actions[i]
        if (g.keydowns[key]) {
          // 如果按键按下，调用注册的 action
          g.actions[key]()
        }
      }
      // update
      g.update()
      // clear
      context.clearRect(0, 0, canvas.width, canvas.height)
      // draw
      g.draw()

      //next run loop
      setTimeout(function() {
        runloop()
      }, 1000/window.fps)
    }

    // timer
    setTimeout(function(){
        runloop()
    }, 1000/fps)

    return g
}
