console 对象提供对浏览器控制台的接入.

Console对象可以在任何全局对象中访问.
它被浏览器定义为 Window.console，也可被简单的 console 调用.

例如：

`console.log("Failed to open the specified link")`



异步加载图片资源的必要性，加载一次之后，之后的每次使用就不需要加载了。节省时间。



let 和 var 的区别

```javascript
for (var i = 0 ; i < 2; i++) {
  console.log(i)
}
// 0, 1

但是如果是一个异步函数，且函数体内用到了变量i,那么取到的只是循环结束时i的最终值。因为var 声明的变量的作用域是整个函数体。每次循环调用的并没有重新声明。

如果用let声明，就可以避免这个问题。
但是let声明的变量不是全局的属性，即不可以通过window.变量名获取
let声明的变量必须在声明之后才可以使用，否则会报错
```

