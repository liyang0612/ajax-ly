var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    errorHandle = require('./error/index'),
    multer = require('multer'),
    port = 9090,
    url = 'http://localhost:' + port,
    app = express();

app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

//
app.all('*', function (req, res, next) {
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});

//404
app.use(errorHandle.isNotFind)

app.get('/getTest', function (req, res) {
  res.json({"get": "hello world"});
  res.end();
})

app.post('/postTest', function (req, res) {
  console.log(req.body);
  res.end();
})

app.listen(port, function() {
  console.log(url);
});