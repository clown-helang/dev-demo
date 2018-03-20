var fs = require("fs");
var packageJson=JSON.parse(fs.readFileSync("../package.json"));

fs.readdir('../access-configuration/'+packageJson.version,function (err, files) {
  if(err){
    console.log('开始创建'+packageJson.version+'目录');
    fs.mkdir('../../access-configuration/'+packageJson.version,function (err) {
      if(err) console.log("创建目录操作失败。");
      else {
        console.log("创建目录成功。");
        writeFile()
      }
    })
  }
  else writeFile()
});

function writeFile() {
  // 添加版本信息
  var access = {
    name: 'base_permission',
    child: [{
      name: '基础权限',
      code: 'base_permission',
      child: [
        {
          name: '基础权限',
          code: 'base_permission',
          owner:'SAAS_TENANT',
          apis: [
            {
              url: '/auth-service/v1/users/action-permissions',
              method: 'GET'
            },
            {
              url: '/auth-service/v1/users/passwords',
              method: 'PUT'
            },
            {
              url: '/auth-service/v1/users',
              method: 'PUT'
            },
            {
              url: '/auth-service/v1/users/id',
              method: 'GET'
            },
            {
              url: '/auth-service/v1/role-api/update',
              method: 'GET'
            },
          ],
          buttons: [],
        },
      ]
    }]
  };

// 将对象转换为要写入的json字符串
  var accessConfiguration = JSON.stringify(access);
  console.log("准备写入文件");
  fs.writeFile('../access-configuration/'+packageJson.version+'/'+packageJson.version +'-base_permission.json',accessConfiguration,function (err) {
    if(err){
      return console.log(err)
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------");
    console.log("读取写入的数据！");
    fs.readFile('../access-configuration/'+packageJson.version+'/'+packageJson.version +'-base_permission.json', function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
    });
  });
}

