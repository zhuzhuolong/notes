#在程序中引用 Hprose

##composer 方式
如果你正在使用 composer 管理你的项目，那么你不需要做任何特别处理。只要在 composer.json 中的 require 段添加了对 hprose/hprose 的引用就可以了。如果你需要 swoole 支持，添加 hprose/hprose-swoole 就可以了。

```php

require_once "vendor/autoload.php";

use Hprose\Swoole\Http\Server;

function hello($name) {
    return "Hello $name!";
}

$server = new Server("http://0.0.0.0:8000");
$server->add("hello");
$server->debug = true;
$server->crossDomain = true;
$server->start();

```

## 手动

如果你不打算使用 composer 来管理你的项目，那你可以直接把 hprose-php 里面的 src 目录复制到你的项目中，然后改成任何你喜欢的名字，比如改为 hprose。

如果你还需要使用 hprose-swoole 下的文件，而且也不想使用 composer 来管理项目。你只需要把 hprose-swoole 下的 src 中的文件，复制到 hprose-php 下的 src 下对应的目录中，就可以了。

```PHP
require_once 'hprose/Hprose.php';

use Hprose\Swoole\Http\Server;

function hello($name) {
    return "Hello $name!";
}

$server = new Server("http://0.0.0.0:8000");
$server->add("hello");
$server->debug = true;
$server->crossDomain = true;
$server->start();

```
但是在后面其他章节中，为了方便统一，我们一律采用 composer 方式来写示例代码，而不再采用上面这种手动管理方式。
