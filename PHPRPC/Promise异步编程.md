# Promise 异步编程

## 概述

PHP 的主要编程模式是同步方式，如果要在 PHP 中进行异步编程，通常是采用回调的方式，因为这种方式简单直接，不需要第三方库的支持，但缺点是当回调层层嵌套使用时，会严重影响程序的可读性和可维护性，因此层层回调的异步编程让人望而生畏。

回调的问题在 JavaScript 中更加明显，因为异步编程模式是 JavaScript 的主要编程模式。为了解决这个问题，JavaScript 社区提出了一套 Promise 异步编程模型。Promise/A+(中文版)是一个通用的、标准化的规范，它提供了一个可互操作的 then 方法的实现定义。Promise/A+ 规范的实现有很多，并不局限于 JavaScript 语言，它们的共同点就是都有一个标准的 then 方法，而其它的 API 则各不相同。

Hprose 2.0 为了更好的实现异步服务和异步调用，也为 PHP 提供了一套 Promise 异步模型实现。它基本上是参照 Promise/A+(中文版) 规范实现的。

Hprose 2.0 之前的版本提供了一组 Future/Completer 的 API，其中 Future 对象上也提供了 then 方法，但最初是参照 Dart 语言中的 Future/Completer 设计的。

而在 Hprose 2.0 版本中，我们对 Future 的实现做了比较大的改进，现在它既兼容 Dart 的 Future/Completer 使用方式，又兼容 Promise/A+ 规范，而且还增加了许多非常实用的方法。下面我们就来对这些方法做一个全面的介绍。
