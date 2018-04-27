var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    errorHandle = require('./error/index'),
    app = express();

app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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

app.listen(9090);