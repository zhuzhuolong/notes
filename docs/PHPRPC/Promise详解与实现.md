# Promise详解与实现（Promise/A+规范）
##什么是Promise?

    Promise是JS异步编程中的重要概念，异步抽象处理对象，是目前比较流行Javascript异步编程解决方案之一

## 对于几种常见异步编程方案
 - 回调函数
 - 事件监听
 - 发布/订阅
 - Promise对象

#### 回调函数
对于回调函数 我们用Jquery的ajax获取数据时 都是以回调函数方式获取的数据

```JavaScript
  $.get(url, (data) => {
      console.log(data)
  )

```

如果说 当我们需要发送多个异步请求 并且每个请求之间需要相互依赖 那这时 我们只能 以嵌套方式来解决 形成 "回调地狱"

```JavaScript
$.get(url, data1 => {
    console.log(data1)
    $.get(data1.url, data2 => {
        console.log(data1)
    })
})
```

> 这样一来，在处理越多的异步逻辑时，就需要越深的回调嵌套，这种编码模式的问题主要有以下几个：
> * 代码逻辑书写顺序与执行顺序不一致，不利于阅读与维护。
> * 异步操作的顺序变更时，需要大规模的代码重构。
> * 回调函数基本都是匿名函数，bug 追踪困难。
> * 回调函数是被第三方库代码（如上例中的 ajax ）而非自己的业务代码所调用的，造成了 IoC 控制反转。


## 实现同步版的promise
promise包含几个关键词：
* resolve
* reject
* then

其中resolve和reject的代码在正常使用的时候是看不到的，但可以猜测他们两个都应该是回调函数，传递给了用户传入的函数，而then则挂在原型上

```JavaScript

calss Promise{
    consturctor(exector){
        function resolve(){

        }
        function reject(){

        }
        exector(resolve,reject)
    }
    then(){

    }
}

```
文档中提出，promise具备三种逻辑判断状态pending、fulfilled、rejected，三者不并处，同一时间只能存在一种状态

pending向fulfilled或rejected单向流动。

## 同步版本实现

```JavaScript
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class Promise{
    constructor(exector){
        let self = this;
        self.status = PENDING;
        self.value = undefined;
        self.reason = undefined;
        let resolve = (value)=>{
            if(self.status === PENDING){
                self.status = FULFILLED
                self.value = value;
            }
        }
        let reject = (reason)=>{
            if(self.status === PENDING){
                self.status = REJECTED;
                self.reason = reason
            }
        }
        try{
            exector(resolve,reject)
        }catch(e){
            reject(e)
        }
    }
    then(onFulfilled,onRejected){
        let self = this;
        if(self.status === FULFILLED){
            onFulfilled(self.value);
        }
        if(self.status === REJECTED){
            onRejected(self.reason);
        }
    }
};
```
