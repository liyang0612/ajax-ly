function Ajax() {
  this.defaultContentType = 'application/x-www-form-urlencoded';
}
/*
*@param { String, Object, String } url and params of http. data type of request
*@return { Promise } 
*/
Ajax.prototype.post = function (url, params, dataType) {
  var promise = new Promise((resolve, reject) => {
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
    xmlHttp.open('POST', url, true);
    if (dataType === 'json') this.defaultContentType = 'application/json';
    xmlHttp.setRequestHeader('Content-type', this.defaultContentType);
    if(this.defaultContentType == 'application/json') xmlHttp.send(JSON.stringify(params));
    else xmlHttp.send(this.getUrlencoeded(params));
  })
  return promise;
}
/*
*@param { String, Object } url and params of http.
*@return { Promise } 
*/
Ajax.prototype.get = function (url, params) {
  var promise = new Promise((resolve, reject) => {
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
    xmlHttp.open('GET', `${url}?${this.getUrlencoeded(params)}`, true);
    xmlHttp.send();
  })
  return promise;
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



// ajax.get("http://localhost:9090/getTest", { id: 1, name: 'liyang' }, 'json').then((res) => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })

// ajax.post("http://localhost:9090/postTest", { id: 1, name: 'liyang' }, 'json').then((res) => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })
