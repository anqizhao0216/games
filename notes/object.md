[TOC]



#JavaScript高级程序设计

##第6章

###面向对象的程序设计

​	面向对象的语言有一个标志，即都有**类**的概念。

​	通过类可以创建任意多个具有相同属性和方法的对象。

​	JS中没有类的概念。因此它的对象也与基于类的语言中的对象有所不同。



​	对象的定义为：“无属性的集合，其属性可以包含基本值，对象或者函数。”

​	相当于说对象是一组没有特定顺序的值。

​	对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。

​	所以可以把对象想象成散列表：一组名值对，值可以是数据或函数。



​	对象都是基于一个引用类型创建的。可以是自带的原生类型，也可以是程序员自定义的类型。



#### 6.1理解对象

对象是属性集合。属性可以分为数据属性和访问器属性。四个特性来描述属性。

对于数据属性，分别为configurable, enumerable, writable, value。

特性的值可以进行修改，但是往往用不到。为了便于更好的理解对象。



#### 6.2创建对象

- 在对象上直接添加

```javascript
var person = new Object()
persone.name = 'anqi'
person.sayName = function() {
  console.log(this.name)
}
```

- 对象字面量。与上述方式相同，形式改变。

```javascript
var person = {
  name: 'anqi',
  sayName: function() {
    console.log(this.name)
  }
}
```



> 创建单个对象是很方便的。但是创建很多类似的对象时，产生很多的重复代码。即类似于需要有一个类的概念存在？？是的。

因为ECMAScript无法创建类。所以就发明了一种函数，封装了创建对象的细节。

- 工厂模式

```javascript
var createPerson = function(name, age, job) {
  var o = {
    o.name = name
    o.age = age
    o.job = job
    o.sayName = function() {
    	console.log(this.name)
  	}
  }
  return o
}

var person1 = new createPerson('anqi', 25, programmer)
var person2 = new createPerson('yf', 25, my girl)
```



现在可以很方便的调用createPerson这个函数，来创建很多相似的对象。但是，我们仍然无法识别某个对象的类型。



- 构造函数模式

```javascript
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function() {
    alert(this.name)
  }
}
```

与工厂模式的区别

- 没有显式地创建一个对象。

解决了没有类型标志的问题，现在通过new操作符创建的对象，通过instanceof Person 会返回TRUE。

问题：就是每个实例中所包含的函数对象都是不同的函数实例。

解决办法是在构造器函数的原型对象上定义所有的属性和方法，然后通过构造器函数实例化的对象会继承原型对象上的方法。

每个对象都有一个属性叫prototype，指向它的原型对象。而它的原型对象中有一个指针叫construtor指向它的构造器函数。然后每个构造器函数实例出的对象，有一个[[prototype]]指针，指向它的构造器的原型对象。

每个对象可以调用它的原型对象上的属性和方法。原型对象也是一个对象，也会有自己的原型对象。这样，就形成了一个原型链。在调用函数方法的时候会一层一层的寻找。如果在整个原型链上都没有，则没有。

最基本的对象是原生对象Object。但是并不是Object上的方法和属性都是记录在prototype上的。必须要记录在Object.prototype上才可以被它的实例对象继承。

如果有同名的属性，会覆盖掉原型上的属性。但是delete之后，就会重现。

还有一些方法可以判断某个属性是位于它的原型链上还是自身上。





打砖块游戏视频第一期总结

这个也是断断续续看了好久了，从去年大概十月份开始知道有这么一个直播。寒假的时候看了四五期，看了个热闹。这次打算按照看操作系统视频一样的看法，慢慢看。毕竟水平还不够，而且感觉可以看出很多东西。



这是一个从0到1的视频，一开始是在canvas上写了一个挡板paddle，在全局中，并在window上注册了两个事件给它，实现了按键控制挡板在页面上的移动。通过setInterval的不断调用canvas的Clear和drawImage来实现移动的效果。



效果是实现了，但是这样的代码不够好。



首先，应该以函数为基本单位。有一个入口函数main来调用其他的函数。当main返回时，整个程序结束。

然后在main中按照抽象出的对象和功能，把整个任务切分。定义好每个对象的功能。把细节写在对象内部。



所以可以将之前实现的代码抽象为两个主要部分，一个是挡板paddle，另一个是游戏背景game context。

每个对象要有自己的属性来描述自己。

paddle，image，坐标。

game，canvas。



按键之后实现挡板的移动。注册事件是在window上发生的，所以事件的绑定可以放在game上，挡板的移动属于挡板自己的行为，可以写成它自己的函数。然后通过game上的条件判断是否执行paddle的行动。

game要不断检查哪些事件被注册了，然后执行相应的回调函数。

这里有一个疑问，game的一部分函数是放在Game()中的，另一部分函数是放在了main函数中。这样做是不是可以在以后的重构中进行改进？

然后又加了一个小球，逻辑上和挡板是一样的。稍有差别。可以和挡板继承同一个类。