var express = require('express'),
    path = require('path'),
    request = require('request');
    bodyParser = require('body-parser'),
    errorHandle = require('./error/index'),
    multer = require('multer'),
    port = 9090,
    url = 'http://localhost:' + port,
    app = express();

var commonJson = {
  data: {},
  success: true,
  status: 1,
  msg: 'success'
}
var upload = multer({dest: './uploads'});
app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//
app.all('*', function (req, res, next) {
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});

//404
app.use(errorHandle.isNotFind)

app.get('/getWeather', function(req, res) {
  console.log(req.query);
  var url = 'http://localhost:9090/getTest';
  var options = {
    headers: { "Connection": "close" },
    url: url,
    method: 'get',
    json: true,
    body: {
      sqlid: 'tme_servtopic.selectfilerecent',
      userid: 45524,
      servtype: 'MSP641520',
      _dc: '1528273791641'
    }
  };
  var callback = function (error, response, data) {
    // console.log(response, data);
    res.json(data);
  }
  request(options, callback);
})

app.get('/getTest', function (req, res) {
  res.header('total', 135)
  res.json(commonJson);
  res.end();
})

app.post('/postTest', function (req, res) {
  commonJson.msg = "application/json"
  res.json(commonJson);
  res.end();
})

app.post('/uploadFile', upload.single('file'), function(req, res, next) {
  console.log(req.file);
  commonJson.data = {
    id: req.body.id,
    fileInfo: req.file,
  }
  res.json(commonJson);
  res.end();
})



app.listen(port, function() {
  console.log(url);
});