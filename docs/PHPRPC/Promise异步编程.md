# Promise 异步编程

## 概述

PHP 的主要编程模式是同步方式，如果要在 PHP 中进行异步编程，通常是采用回调的方式，因为这种方式简单直接，不需要第三方库的支持，但缺点是当回调层层嵌套使用时，会严重影响程序的可读性和可维护性，因此层层回调的异步编程让人望而生畏。

回调的问题在 JavaScript 中更加明显，因为异步编程模式是 JavaScript 的主要编程模式。为了解决这个问题，JavaScript 社区提出了一套 Promise 异步编程模型。Promise/A+(中文版)是一个通用的、标准化的规范，它提供了一个可互操作的 then 方法的实现定义。Promise/A+ 规范的实现有很多，并不局限于 JavaScript 语言，它们的共同点就是都有一个标准的 then 方法，而其它的 API 则各不相同。

Hprose 2.0 为了更好的实现异步服务和异步调用，也为 PHP 提供了一套 Promise 异步模型实现。它基本上是参照 Promise/A+(中文版) 规范实现的。

Hprose 2.0 之前的版本提供了一组 Future/Completer 的 API，其中 Future 对象上也提供了 then 方法，但最初是参照 Dart 语言中的 Future/Completer 设计的。

而在 Hprose 2.0 版本中，我们对 Future 的实现做了比较大的改进，现在它既兼容 Dart 的 Future/Completer 使用方式，又兼容 Promise/A+ 规范，而且还增加了许多非常实用的方法。下面我们就来对这些方法做一个全面的介绍。

## 创建 Future/Promise 对象

#### 使用 Future 构造器

##### 创建一个待定（pending）状态 promise 对象

```PHP
use Hprose\Future;
$promise = new Future();

```

该 promise 对象的结果尚未确定，可以在将来通过 resolve 方法来设定其成功值，或通过 reject 方法来设定其失败原因。

##### 创建一个成功（fulfilled）状态的 promise 对象

```PHP
use Hprose\Future;
$promise = new Future(function() { return 'hprose'; });
$promise->then(function($value) {
    var_dump($value);
});
```

该 promise 对象中已经包含了成功值，可以使用 then 方法来得到它

##### 创建一个失败（rejected）状态的 promise 对象

```PHP
use Hprose\Future;
$promise = new Future(function() { throw new Exception('hprose'); });
$promise->catchError(function($reason) {
    var_dump($reason);
});
```

该 promise 对象中已经包含了失败值，可以使用 catchError 方法来得到它。

上面的 Future 构造函数的参数可以是无参的函数、方法、闭包等，或者说只要是无参的 callable 对象就可以，不一定非要用闭包。

#### 使用 Hprose\Future 名空间中的工厂方法

Hprose\Future 名空间内提供了 6 个工厂方法

* resolve
* value
* reject
* error
* sync
* promise

其中 resolve 和 value 功能完全相同，reject 和 error 功能完全相同。
resolve 和 reject 这两个方法名则来自 ECMAScript 6 的 Promise 对象。
value 和 error 这两个方法名来自 Dart 语言的 Future 类。因为最初是按照 Dart 语言的 API 设计的，因此，这里保留了 value 和 error 这两个方法名。
sync 功能跟 Future 含参构造方法类似，但在返回值的处理上有所不同。

promise 方法跟 Promise 类的构造方法类似，但返回的是一个 Future 类型的对象，而 Promise 构造方法返回的是一个 Promise 类的对象，Promise 类是 Future 类的子类，但除了构造函数不同以外，其它都完全相同。

##### 创建一个成功（fulfilled）状态的 promise 对象

```PHP
use Hprose\Future;
$promise = Future\value('hprose'); // 换成 Future\resolve('hprose') 效果一样
$promise->then(function($value) {
    var_dump($value);
});
```
使用 value 或 resolve 来创建一个成功（fulfilled）状态的 promise 对象效果跟前面用 Future 构造器创建的效果一样，但是写起来更加简单，不再需要把结果放入一个函数中作为返回值返回了。

##### 创建一个失败（rejected）状态的 promise 对象
```PHP
use Hprose\Future;
$e = new Exception('hprose');
$promise = Future\error($e); // 换成 Future\reject($e) 效果一样
$promise->catchError(function($reason) {
    var_dump($reason);
});
```

使用 error 或 reject 来创建一个失败（rejected）状态的 promise 对象效果跟前面用 Future 构造器创建的效果也一样，但是写起来也更加简单，不再需要把失败原因放入一个函数中作为异常抛出了。

注意，这里的 error（或 reject）函数的参数并不要求必须是异常类型的对象，但最好是使用异常类型的对象。否则你的程序很难进行调试和统一处理。

#### 通过 Future\sync 方法来创建 promise 对象
Future 上提供了一个
```PHP
Future\sync($computation);
```
实际上，Hprose for PHP 的 Future 构造方法也是同步的，这一点跟 JavaScript 版本的有所不同。sync 函数跟 Futrue 构造方法区别在于结果上，通过 Future 构造方法的结果中如果包含生成器函数或者是生成器，则生成器函数和生成器将原样返回。而通过 sync 函数返回的生成器函数或生成器会作为协程执行之后，返回执行结果。

```PHP
use Hprose\Future;

$p = Future\promise(function($resolve, $reject) {
    $a = 1;
    $b = 2;
    if ($a != $b) {
        $resolve('OK');
    }
    else {
        $reject(new Exception("$a == $b"));
    }
});
$p->then(function($value) {
    var_dump($value);
});
```

## Future 类上的方法
#### then 方法
then 方法是 Promise 的核心和精髓所在。它有两个参数：$onfulfill, $onreject。这两个参数皆为 callable 类型。当它们不是 callable 类型时，它们将会被忽略。当 promise 对象状态为待定（pending）时，这两个回调方法都不会执行，直到 promise 对象的状态变为成功（fulfilled）或失败（rejected）。当 promise 对象状态为成功（fulfilled）时，$onfulfill 函数会被回调，参数值为成功值。当 promise 对象状态为失败（rejected）时，$onreject 函数会被回调，参数值为失败原因。

then 方法的返回值是一个新的 promise 对象，它的值由 $onfulfill 或 $onreject 的返回值或抛出的异常来决定。如果$onfulfill 或 $onreject 在执行过程中没有抛出异常，那么新的 promise 对象的状态为成功（fulfilled），其值为 $onfulfill 或 $onreject 的返回值。如果这两个回调中抛出了异常，那么新的 promise 对象的状态将被设置为失败（rejected），抛出的异常作为新的 promise 对象的失败原因。

同一个 promise 对象的 then 方法可以被多次调用，其值不会因为调用 then 方法而改变。当 then 方法被多次调用时，所有的 $onfulfill, $onreject 将按照原始的调用顺序被执行。

因为 then 方法的返回值还是一个 promise 对象，因此可以使用链式调用的方式实现异步编程串行化。

当 promise 的成功值被设置为另一个 promise 对象（为了区分，将其命名为 promise2)时，then 方法中的两个回调函数得到的参数是 promise2 对象的最终展开值，而不是 promise2 对象本身。当 promise2 的最终展开值为成功值时，$onfulfill 函数会被调用，当 promise2 的最终展开值为失败原因时，$onreject 函数会被调用。

当 promise 的失败原因被设置为另一个 promise 对象时，该对象会直接作为失败原因传给 then 方法的 $onreject 回调函数。因此最好不要这样做。

关于 then 方法的用法，这里不单独举例，您将在其它的例子中看到它的用法。

#### done 方法
跟 then 方法类似，但 done 方法没有返回值，不支持链式调用，因此在 done 方法的回调函数中，通常不会返回值。

如果在 done 方法的回调中发生异常，会直接抛出，并且无法被捕获。

因此，如果您不是在写单元测试，最好不要使用 done 方法。

#### fail 方法
该方法是 done(null, $onreject) 的简化方法。

如果您不是在写单元测试，最好不要使用 fail 方法。

#### catchError 方法
```PHP
$promise->catchError($onreject);
```
该方法是 then(null, $onreject) 的简化写法。

```PHP
$promise->catchError($onreject, $test);
```

该方法第一个参数 $onreject 跟上面的相同，第二个参数 $test 是一个测试函数（callable 类型）。当该测试函数返回值为 true 时，$onreject 才会执行。

```php
use Hprose\Future;

$p = Future\reject(new OutOfRangeException());

$p->catchError(function($reason) { return 'this is a OverflowException'; },
               function($reason) { return $reason instanceof OverflowException; })
  ->catchError(function($reason) { return 'this is a OutOfRangeException'; },
               function($reason) { return $reason instanceof OutOfRangeException; })
  ->then(function($value) { var_dump($value);  });

```

#### resolve 方法
该方法可以将状态为待定（pending）的 promise 对象变为成功（fulfilled）状态。

该方法的参数值可以为任意类型。

#### reject 方法

该方法可以将状态为待定（pending）的 promise 对象变为失败（rejected）状态。

该方法的参数值可以为任意类型，但通常只使用异常类型。

#### inspect 方法
该方法返回当前 promise 对象的状态。

如果当前状态为待定（pending），返回值为：

```php

array('state' => 'pending')

array('state' => 'fulfilled', 'value' => $promise->value)

array('state' => 'rejected', 'reason' => $promise->reason);

```

#### whenComplete 方法
有时候，你不但想要在成功（fulfilled）时执行某段代码，而且在失败（rejected）时也想执行这段代码，那你可以使用 whenComplete 方法。该方法的参数为一个无参回调函数。该方法执行后会返回一个新的 promise 对象，除非在回调函数中抛出异常，否则返回的 promise 对象的值跟原 promise 对象的值相同。

```PHP
use Hprose\Future;

$p1 = Future\resolve('resolve hprose');

$p1->whenComplete(function() {
    var_dump('p1 complete');
})->then(function($value) {
    var_dump($value);
});

$p2 = Future\reject(new Exception('reject thrift'));

$p2->whenComplete(function() {
    var_dump('p2 complete');
})->catchError(function($reason) {
    var_dump($reason->getMessage());
});

$p3 = Future\resolve('resolve protobuf');

$p3->whenComplete(function() {
    var_dump('p3 complete');
    throw new Exception('reject protobuf');
})->catchError(function($reason) {
    var_dump($reason->getMessage());
});
```
#### complete 方法
该方法的回调函数 oncomplete 在不论成功还是失败的情况下都会执行，并且支持链式调用。相当于：then(oncomplete, oncomplete) 的简化写法。

#### always 方法
该方法的回调函数 oncomplete 在不论成功还是失败的情况下都会执行，但不支持链式调用。相当于：done(oncomplete, oncomplete) 的简化写法。

如果您不是在写单元测试，最好不要使用 always 方法。

#### fill 方法
将当前 promise 对象的值充填到参数所表示的 promise 对象中。

#### tap 方法

```PHP
$promise->then(function($result) use ($onfulfilledSideEffect) {
    call_user_func($onfulfilledSideEffect, $result);
    return result;
});

$promise->tap($onfulfilledSideEffect);
```

#### spread 方法

```PHP
$promise->then(function($array) use ($onfulfilledArray) {
    return call_user_func_array($onfulfilledArray, $array);
});

$promise->spread($onfulfilledArray);
```

#### each 方法
如果 promise 对象中包含的是一个数组，那么使用该方法可以对该数组进行遍历。$callback 回调方法的格式如下：

```PHP
function callback(mixed $value[, mixed $key[, array $array]]);
```

```PHP
use Hprose\Future;

function dumpArray($value, $key) {
  var_dump("a[$key] = $value");
}

$a1 = Future\value(array(2, Future\value(5), 9));
$a2 = Future\value(array('name' => Future\value('Tom'), 'age' => Future\value(18)));
$a1->each('dumpArray');
$a2->each('dumpArray');
```

#### every 方法
```PHP

$promise->every($callback);
```
