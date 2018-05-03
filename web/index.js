const ajaxLy = (reqType, url, params, callback) => {
  let xmlHttp = '',
      contentType = 'application/json';
  if(window.XMLHttpRequest){
    xmlHttp = new XMLHttpRequest();
  }else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open(reqType, url, true);
  // xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlHttp.setRequestHeader('Content-type', contentType);
  xmlHttp.send(JSON.stringify(params));
  // xmlHttp.send('msg=send&id=1')
}

ajaxLy('post', "http://localhost:9090/postTest", { id: 1, name: 'liyang' }, (val) => {console.log(val)} );
// ajaxLy("http://localhost:9090/getTest", (val) => { console.log(val) });