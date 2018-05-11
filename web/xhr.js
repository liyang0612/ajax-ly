module.exports = function xhrAdapter(config) {
  return new Promise(function (resolve, reject) {
    var xmlHttp = '';
    if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlHttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (this.status === 200)
          resolve(this.responseText)
        else if (this.status !== 0)
          reject(new Error(this.status));
      }
    }
    xmlHttp.open(config.method, config.url, config.async);
    if(Object.prototype.toString.call(Object).slice(8, -1) === 'Object') {
      for (let key in config.headers) {
        xmlHttp.setRequestHeader(key, config.headers[key]);
      }
    }
    xmlHttp.send(config.params);
  })
}