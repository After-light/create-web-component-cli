# create-web-component-cli

一款基于 meow 和 cli-meow-help 的脚手架工具，通过命令行快速创建 react 中的 class/函数式组件。

## 安装

`npm i -g create-web-component-cli`

## 使用

创建函数式组件

`cwcc -n App`

创建类组件

`cwcc -n App -t class`

## API

cwcc [-v] [-n `<componentName>`] [-t `<componentType>`]
