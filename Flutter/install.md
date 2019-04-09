# 入门: 在 macOS 上搭建 Flutter 开发环境

## 使用镜像

由于在国内访问 Flutter 有时可能会受到限制，Flutter 官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中：

```shell
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

## 系统要求

要安装并运行 Flutter，您的开发环境必须满足以下最低要求:

- 操作系统: macOS (64-bit)
- 磁盘空间: 700 MB (不包括 Xcode 或 Android Studio 的磁盘空间）.
- 工具: Flutter 依赖下面这些命令行工具
  - bash, mkdir, rm, git, curl, unzip, which

## 获取 Flutter SDK

1. 去 flutter 官网下载其最新可用的安装包
   注意，Flutter 的渠道版本会不停变动，请以 Flutter 官网为准。另外，在中国大陆地区，要想正常获取安装包列表或下载安装包，可能需要翻墙，读者也可以去 Flutter github 项目下去下载安装包
1. 解压安装包到你想安装的目录

```shell
cd ~/development
unzip ~/Downloads/flutter_macos_v0.5.1-beta.zip
```

1. 添加 flutter 相关工具到 path 中

```bash
export PATH=`pwd`/flutter/bin:$PATH
```

此代码只能暂时针对当前命令行窗口设置 PATH 环境变量，要想永久将 Flutter 添加到 PATH 中请参考下面更新环境变量 部分。

> 注意： 由于一些 flutter 命令需要联网获取数据，如果您是在国内访问，由于众所周知的原因，直接访问很可能不会成功。 上面的 PUB_HOSTED_URL 和 FLUTTER_STORAGE_BASE_URL 是 google 为国内开发者搭建的临时镜像。

#### 运行 flutter doctor

运行以下命令查看是否需要安装其它依赖项来完成安装

```bash
flutter doctor
```

该命令检查您的环境并在终端窗口中显示报告。Dart SDK 已经在捆绑在 Flutter 里了，没有必要单独安装 Dart。 仔细检查命令行输出以获取可能需要安装的其他软件或进一步需要执行的任务（以粗体显示）

例如:

```bash

[-] Android toolchain - develop for Android devices
    • Android SDK at /Users/obiwan/Library/Android/sdk
    ✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ
    • Try re-installing or updating your Android SDK,
      visit https://flutter.io/setup/#android-setup for detailed instructions.

```

一般的错误会是 xcode 或 Android Studio 版本太低、或者没有 ANDROID_HOME 环境变量等，请按照提示解决。

```bash
export PATH=/Users/用户名/Documents/flutter/flutter/bin:$PATH
export ANDROID_HOME="/Users/用户名/Documents/android_sdk"
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

第一次运行一个 flutter 命令（如 flutter doctor）时，它会下载它自己的依赖项并自行编译。以后再运行就会快得多。

#### 更新环境变量

您在命令行只能更新当前会话的 PATH 变量，如 Clone Flutter repo 所示。 但是，您可能需要的是永久更新此变量，以便您可以运行 flutter 命令在任何终端会话中。

对于所有终端会话永久修改此变量的步骤是和特定计算机系统相关的。通常，您会在打开新窗口时将设置环境变量的命令添加到执行的文件中。例如

1. 确定您 Flutter SDK 的目录，您将在步骤 3 中用到。
1. 打开(或创建) \$HOME/.bash_profile. 文件路径和文件名可能在您的机器上不同.
1. 添加以下行并更改[PATH_TO_FLUTTER_GIT_DIRECTORY]为克隆 Flutter 的 git repo 的路径:

```sh
export PUB_HOSTED_URL=https://pub.flutter-io.cn //国内用户需要设置
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export PATH=PATH_TO_FLUTTER_GIT_DIRECTORY/flutter/bin:$PATH
```

注意：PATH_TO_FLUTTER_GIT_DIRECTORY 为你 flutter 的路径，比如“~/document/code”

```shell
export PATH=PATH_TO_FLUTTER_GIT_DIRECTORY/flutter/bin:$PATH
```
