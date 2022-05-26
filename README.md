## ts-service
借助于`auto-service`，只提取了`services`；支持多个配置文件生成。
## 安装
`npm i @czalexzhan/ts-service`
## 命令参数说明
|参数|说明|
|:---|:---|
|--public|开发的公共目录，说明所有生成文件公有的目录，以便于生成多个不同的ts-service|
|--config|配置文件，可以配置别名，快速生成|
|--dir|生成的直接目录，需要基于--public 相对路径|
|--parentDir|用于临时目录生成，如指定 `--public src/routers/a`, 生成的临时目录应是 `temp/a`，--parentDir 默认是 `src/routers`，否，请指定，以便于生成正确的临时目录|

## 使用步骤
· 在目录下，配置Json文件
```
{
  "url": "",
  "remoteUrl": "",
  "requestConfig": {
    "url": ""
  },
  "type": "yapi",
  "yapiConfig": {
    "required": false,
    "bodyJsonRequired": false,
    "categoryMap": {}
  },
  "swaggerParser": {
    "-o": ""
  },
  "validateResponse": false,
  "guardConfig": {},
  "swaggerConfig": {
    "include": [
      "*",
    ]
  }
}
```
· 可以设置别名配置
```
module.exports = {
    alias: {
        '@invoice': 'invoiceManagement',
    }
}
```
· 配置scripts
```
"model:ts": @czalexzhan/ts-service --public src/routers/financialManagement --config config/tsServiceConfig.js
```
· 终端运行scripts
`yarn model:ts --dir @invoice or yarn model:ts --dir invoiceManagement `