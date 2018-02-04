var GuaGame = function(images, fps, callback) {
  var g = {
    scene: null,
    actions: {}, // store  callbacks
    keydowns: {}, // store keys have been pressed
    images:{},
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

  g.update = function() {
    g.scene.update()
  }

  g.draw = function() {
    g.scene.draw()
  }

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


  // 加载了所有图片，并将其存入到了 game.images 之中
  var names = Object.keys(images)
  var loads = []
  for (var i = 0; i < names.length; i++) {
    let name = names[i]
    var path = images[name]
    let image = new Image()
    image.src = path

    image.onload = function() {

      g.images[name] = image

      loads.push(1)

      // 当所有图片资源加载完毕之后，再调用程序
      if (loads.length == names.length) {
        // log('hello')
        log(g.images)
        g.__start()
      }
    }
  }

  g.imageByName = function(name) {
      var img = g.images[name]
      var image = {
        w: img.width,
        h: img.height,
        image: img,
      }
      return image
  }

  g.runWithScene = function(scene) {
    g.scene = scene
    setTimeout(function(){
      // runloop()
    }, 1000/window.fps)
  }
  g.replaceScene = function(scene) {
    g.scene = scene
  }
  g.__start = function() {
    callback(g)
  }

  return g
}
