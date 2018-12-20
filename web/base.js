/*
function loadInnerHTML(url, pageElement) {
  try {
    req = new XMLHttpRequest();
  } catch(e) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        req = false;
      }
    }
  }
  req.onreadystatechange = function() {set(pageElement);};
  req.open("GET",url,true);
  req.send(null);
}

function set(pageElement) {
  if(req.status == 200) {
    output = req.responseText;
    document.getElementById(pageElement).innerHTML = output;
  }
}
*/

function execute(url) {
  try {
    req = new XMLHttpRequest();
    /* e.g. Firefox */
  } catch(e) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
      /* some versions IE */
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        /* some versions IE */
      } catch (e) {
        req = false;
      }
    }
  }

  req.open("GET",url,true);
  req.send(null);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function GetObjectsByName(id) {
  return document.getElementsByName(id);
}

function GetObject(id) {
  return document.getElementById(id);
}

function GetValue(id) {
  return GetObject(id).value;
}

function ReplaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}