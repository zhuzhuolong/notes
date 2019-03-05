# 基本用法

---
## 快速开始
```PHP
// include composer autoload
require 'vendor/autoload.php';

// import the Intervention Image Manager Class
use Intervention\Image\ImageManager;

// create an image manager instance with favored driver
$manager = new ImageManager(array('driver' => 'imagick'));

// to finally create image instances
$image = $manager->make('public/foo.jpg')->resize(300, 200);
```

## 读取图像

##### 从文件中读取图像
