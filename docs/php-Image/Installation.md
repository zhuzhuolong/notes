# 安装

## 系统要求

需要以下组件
  * php >= 5.4
  * Fileinfo 扩展

图片库
  * GD库（> = 2.0）

## Composer 安装
使用[Composer]("https://getcomposer.org/")可以快速轻松地安装Intervention Image 。

要安装最新版本，请运行以下命令。

```php
php composer.phar require intervention/image
```
可以要求刚创建的vendor/autoload.php文件到PSR-4自动加载库

## 用法
Image 库不需要任何框架，使用composer autoload 实例化Image对象即可

```php
// 引入autoload
require 'vendor/autoload.php';

// 引用ImageManger 类
use Intervention\Image\ImageManager;

// 实例化图像类，设置驱动使用imagick
$manager = new ImageManager(array('driver' => 'imagick'));

$image = $manager->make('public/foo.jpg')->resize(300, 200);
```

静态示例

```php

require 'vendor/autoload.php';

use Intervention\Image\ImageManagerStatic as Image;

Image::configure(array('driver' => 'imagick'));

$image = Image::make('public/foo.jpg')->resize(300, 200);
```
