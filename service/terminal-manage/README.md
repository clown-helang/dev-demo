# 基础工程说明

此基础工程可以直接拷贝重命名，在此基础上进行新的微应用的开发，但是需要注意以下几点

### 修改文件
- .roadhogrc中的打包输出目录：
  ```json
  "outputPath": "../../manage-portal/dist/manage-portal/demo",
  ```
  需要将demo改为重命名的工程名，这里的名字需要和manage-portal中的src/utils/config.js中
  ```javascript
  menus: [
    {
      name: '客房管理',
      code: 'GuestRoom',
      service:'hotel-manage',
      child: ['GuestRoomManage']
    },
  ]
  ```
  service保持一致

- .package.json中的启动端口：
    ```json
    "scripts": {
      "start": "set PORT=8000&&roadhog server",
      "build": "roadhog build",
      "lint": "eslint --ext .js src test",
      "precommit_bak": "npm run lint"
    },
    ```
    为了防止启动多个微应用导致的端口冲突，start中的PORT端口需要修改，manage-portal为8000，新建的应用从8001依次向下排列
