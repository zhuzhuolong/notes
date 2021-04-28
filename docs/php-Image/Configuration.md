# 配置
目前Intervention Image支持两种图像处理扩展。

  * **GB**
  * **Imagick**
在开始之前，请确保在PHP环境中安装了其中一个。

可以将Image配置为使用其中一个库进行所有操作。只需将配置作为数组直接传递到**ImageManager**中。

```PHP
require 'vendor/autoload.php';

use Intervention\Image\ImageManager;

$manager = new ImageManager(array('driver' => 'imagick'));

$image = $manager->make('public/foo.jpg')->resize(300, 200);
```

## 内存设置
PHP中的图像处理是一项非常耗费内存的任务。由于PHP中的大多数任务都不会耗尽默认的内存限制，因此必须确保PHP配置能够分配足够的内存来处理大图像。

php.ini

#### memory_limit

设置允许脚本分配的最大内存量（以字节为单位）。将3000 x 2000像素图像调整为300 x 200可能需要高达32 MB的内存。

#### upload_max_filesize
