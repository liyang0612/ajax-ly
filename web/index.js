var xhrAdatper = require('./xhr.js');

function Ajax() {
  this.defaultConfig = {};
  this.defaultContentType = { 'Content-type': 'application/x-www-form-urlencoded' };
}
/*
*@param { Object } config of http
*@return { XHRHttpRqutest } return a XMLHttpRequest
*/
Ajax.prototype.request = function(config) {
  if (typeof config === 'undefined') throw new Error('arguments is undefined of request function');
  if (typeof config.method === 'undefined') throw new Error('http method is undefind');

  //deep copy
  this.defaultConfig = JSON.parse(JSON.stringify(config));
  //convert to uppercase
  this.defaultConfig.method = config.method.toLocaleUpperCase();
  
  switch (this.defaultConfig.method) {
    case 'GET':
      if(config.params)
        this.defaultConfig.url = config.url + '?' + this.getUrlencoeded(config.params);
      else
        this.defaultConfig.url = config.url
      break;
    case 'POST':
      this.defaultConfig.headers = config.headers || this.defaultContentType;
      //根据不同的Content-type, send()方法接收不同格式的参数
      if(this.defaultConfig.headers['Content-type'].indexOf('application/json') > -1)
        this.defaultConfig.params = JSON.stringify(config.params);
      else
        this.defaultConfig.params = this.getUrlencoeded(config.params);
      break;
  }

  return xhrAdatper(this.defaultConfig);
}

/*
*@param { Object } url and params of http
*@return { String } return urlencoeded string
*/
Ajax.prototype.getUrlencoeded = function (params) {
  var str = '';
  for (let [k, v] of Object.entries(params)) {
    str += (k + '=' + v + '&')
  }
  str = str.slice(0, -1);
  return str;
}

function init() {
   return new Ajax()
}

var ajax = init();


//usage one
ajax.request({
  method: 'post',
  url: 'http://localhost:9090/postTest',
  params: {
    x: 2, y: 1
  },
  headers: {
    'Content-type': 'application/json'
  }
}).then((res) => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
//usage two
ajax.request({
  method: 'get',
  url: 'http://localhost:9090/getTest',
}).then((res) => {
  console.log(res);
}).catch(err => {
  console.log(err);
})