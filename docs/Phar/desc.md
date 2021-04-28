# 简介

phar扩展提供了一种方法，可以将整个PHP应用程序放入一个名为“phar”（php存档）的文件中，
以便于分发和安装。除了提供此服务外，phar扩展还提供了一种文件格式抽象方法，
用于通过phardata类创建和操作tar和zip文件，就像PDO为访问不同数据库提供了统一的接口一样。
与不能在不同数据库之间转换的PDO不同，phar还可以用一行代码在tar、zip和phar文件格式之间转换。

什么是 **phar** ？Phar档案的最大特点是，它是将多个文件组合成一个文件的方便方法。
因此，Phar存档提供了一种将完整的PHP应用程序分发到单个文件中并从该文件运行它的方法，
而无需将其提取到磁盘上。
此外，无论是在命令行上还是从Web服务器上，php都可以像其他任何文件一样轻松地执行phar存档。
对于PHP应用程序来说，phar有点像一个 thumb drive。

**Phar**通过流包装器实现此功能。通常，要在PHP脚本中使用外部文件，可以使用include

Example:

```php
<?php
    include '/path/to/external/file.php'
?>
 ```
 
php可以被认为是将/path/to/external/file.php实际转换为流包装器（file:///path/to/external/file.php），并且在后台它确实使用普通的文件流包装器流函数来访问所有本地文件

 

