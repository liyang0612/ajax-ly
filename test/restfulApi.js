var express = require('express');
var app = express();

app.get('/getTest', function (req, res) {
  res.json({"x": "hello world"});
  res.end();
})

app.listen(9090);