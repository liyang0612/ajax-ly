var xhrAdatper = require('./xhr.js');

function Ajax() {
  this.defaultConfig = {};
  this.defaultContentType = { 'Content-type': 'application/x-www-form-urlencoded' };
}
/*
*@param { Object } config of http
*@return { XHRHttpRqutest } return a XMLHttpRequest
*/
Ajax.prototype.requtest = function(config) {
  this.defaultConfig = JSON.parse(JSON.stringify(config));
  this.defaultConfig.method = config.method.toLocaleUpperCase();
  
  switch (this.defaultConfig.method) {
    case 'GET':
      this.defaultConfig.url = config.url + '?' + this.getUrlencoeded(config.params);
      break;
    case 'POST':
      this.defaultConfig.headers = config.headers || this.defaultContentType;
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



ajax.requtest({
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
