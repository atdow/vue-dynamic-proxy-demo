# vue-dynamic-proxy-demo
这是`vue动态代理无须重启项目解决方案`demo项目，除了基础代理外，还集成了命令行来切换代理配置。

## 1.快速启动
项目启动
```shell
cd demo
npm install
npm run proxy use # 选择代理并初始化代理配置（项目初始化运行时必须要运行一次这个命令或者npm run predev来初始化代理配置文件）
```
mock启动
```shell
cd mock
npm install
npm run start
```

## 2.api说明
- npm run predev: 使用当前环境变量来选择代理地址
- npm run proxy list: 列举出所以代理地址
- npm run proxy use: 选择代理地址

## 3.代理地址维护文件
`environments/env.json`是需要我们需要维护的代理地址文件，文件的第一个key是当前环境变量，target需要代理的地址。
> 为了项目的健壮性发展，请勿手动修改env.json，虽然也可以达到同样的效果，但是建议使用命令`npm run proxy use`来进行配置