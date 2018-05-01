const ajaxLy = (url, callback) => {
  let xmlHttp = '';
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
  xmlHttp.open('POST', url, true);
  xmlHttp.setRequestHeader('Content-type', 'application/json;charset=utf-8');
  xmlHttp.send('msg=12&success=false');
}

ajaxLy("http://localhost:9090/postTest", (val) => {console.log(val)} );