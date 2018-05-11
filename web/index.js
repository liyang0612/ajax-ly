var xhrAdatper = require('./xhr.js');

function Ajax() {
  this.defaultConfig = {};
  this.defaultContentType = { 'Content-type': 'application/x-www-form-urlencoded' };
}

Ajax.prototype.requtest = function(config) {
  this.defaultConfig = JSON.parse(JSON.stringify(config));
  this.defaultConfig.method = config.method.toLocaleUpperCase();
  
  if (this.defaultConfig.method === 'GET') {
    this.defaultConfig.url = config.url + '?' + this.getUrlencoeded(config.params);
  }

  if (this.defaultConfig.method === 'POST') {
    this.defaultConfig.headers = this.defaultContentType;
    this.params = this.getUrlencoeded(params);
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
  method: 'get',
  url: 'http://localhost:9090/getTest',
  params: {
    x: 2, y: 1
  }
}).then((res) => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

// ajax.post("http://localhost:9090/postTest", { id: 1, name: 'liyang' }, 'json').then((res) => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })
