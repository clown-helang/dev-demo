var open = require('open')

var
    url = require('url'),
    http = require('http'),
    port = 80 ,
    acceptor = http.createServer().listen(port);
    nstatic = require('node-static');//静态地址
    color =  require('colors');

//本地静态目录
var directory = './manage-portal/dist/manage-portal/';
//入口文件地址
var mainUrl = 'index.html';
//静态文件服务
var fileServer = new nstatic.Server(directory);

acceptor.on('request', function(req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res);
  }).resume();
});

var os = require('os');
var opn = require('opn');
var lacalhost = '';
  try {
    var network = os.networkInterfaces();
    localhost = network[Object.keys(network)[0]][1].address;
  } catch (e) {
    localhost = 'localhost';
  }
  var uri = 'http://' + localhost + ':' + port;
  // opn(uri);
  console.log((`服务已启动,地址为：${uri}` ).green);
