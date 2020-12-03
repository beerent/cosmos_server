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

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {}
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

function UpdateTextColorIfChanged(textObject, originalText) {
  if ( textObject.type == 'select-one' ) {
    UpdateSelectText(textObject, originalText);
  } else {
    UpdateTextText(textObject, originalText);    
  }
}

function UpdateSelectText(textObject, originalText) {
  var newText = textObject.value;
  newText = ReplaceAll(newText, "\n", "{n}");

  if (originalText == newText) {
    UpdateSelectToBlack(textObject);
  } else {
    UpdateSelectToRed(textObject);
  }
}

function UpdateTextText(textObject, originalText) {
  var newText = textObject.value;
  newText = ReplaceAll(newText, "\n", "{n}");

  if (originalText == newText) {
    UpdateTextToBlack(textObject);
  } else {
    UpdateTextToRed(textObject);
  }
}

function UpdateTextToBlack(textObject) {
    textObject.style.color = "black";
}

function UpdateTextToRed(textObject) {
    textObject.style.color = "red";
}

function UpdateSelectToBlack(textObject) {
  textObject.style.backgroundColor = "rgb(255, 255, 255)";
  textObject.style.color = "black";
}

function UpdateSelectToRed(textObject) {
  textObject.style.backgroundColor = "rgb(139, 0, 0)";
  textObject.style.color = "white";
}