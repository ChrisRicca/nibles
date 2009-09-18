_ClipGrab.Grabber = function(){
  this.initialize = function() {
    this.iFrameURL = _ClipGrab.hostname + 'iframe.html';
    this.locationURL = document.location.href;
    this.itemCount = 0;
    this.buildUI();
    this.buildIframe();
    this.activate();
  };
  
  this.targetDrop = function() {
    return _ClipGrab.targetDrop;
  };
  
  this.buildUI = function() {
    this.uiContainer = document.createElement('div');
    this.uiContainer.setAttribute('style',"position:fixed;top:0px;right:0px;background-color:#FFFFFF;border-bottom:1px solid #333333;width:100%;height:40px;z-index:99999;");
    imgHTML = "<img style='float:left;margin-top:3px;margin-left:3px' src='" + _ClipGrab.hostname + "images/nibles_small.png'/>";
    linkHTML = "<a style='float:right;font-size:16px;margin-top:6px;padding:3px;margin-right:22px;color:#D32323;' href='http://drop.io/" + this.targetDrop().name + "'>view all items in this NIBL</a>";
    helpHTML = "<div style='float:left;margin-top:19px;margin-left:10px;font-size:11px;color:#999999;'>did you know?  you can add snippets by highlighting text in the page below</div>";
    plusImgHtml = "<img style= 'display:none;position:fixed;top:10px;left:80px;' src='" + _ClipGrab.hostname + "images/plus.png'/>"
    this.uiContainer.innerHTML = imgHTML + helpHTML + linkHTML + plusImgHtml;
    document.body.appendChild(this.uiContainer);
    //this.counterSpan = this.uiContainer.getElementsByTagName('span')[0];
    this.plusOneImage = this.uiContainer.getElementsByTagName('img')[1];
  };
  
  this.animateAdd = function() {
    this.plusOneImage.style.display='block';
    setTimeout("_ClipGrab.grabber.plusOneImage.style.display='none';",1000);
  };
  // this.incrementItemCount = function() {
  //   this.itemCount++;
  //   this.counterSpan.innerHtml = this.itemCount;
  // };
  // 
  this.buildIframe = function() {
    this.iFrame = document.createElement('iframe');
    this.iFrame.setAttribute('src',this.iFrameURL)
    this.iFrame.setAttribute('style','width:0px;height:0px;border-width:0px;')
    document.body.appendChild(this.iFrame);
  };
  
  this.addFile = function(href) {
    this.dropAction('addfile',href)
    this.animateAdd();
  };
  
  this.addNote = function(body) {
    this.dropAction('addnote',body)
    this.animateAdd();
  }
  
  this.dropAction = function(action,message) {
    this.iFrame.contentWindow.location = this.iFrameURL + "#" + this.encodeMessage(action,message)
  };
  
  this.encodeMessage = function(action,message) {
    return this.targetDrop().name + "_a_a_a_" + action + "_a_a_a_" + escape(message);
  };
  
  this.activate = function() {
    
    //Build UI for images
    images = document.getElementsByTagName('img')
    for (var i = 0; i < images.length; i++) { 
      if(images[i].tagName == "IMG" && images[i].parentNode != this.uiContainer && images[i].offsetWidth > 25) _ClipGrab.buildLinkForImage(images[i]);
    }
    
    //Add Handler for text
    document.onmouseup = function(){
      text = _ClipGrab.getSelText();
      if (text && text!="") _ClipGrab.grabber.addNote(text);
    };
  };
  
  this.initialize();
};

_ClipGrab.buildLinkForImage = function(img) {
  src = img.getAttribute('src');
  if(src) {
    if (src.indexOf('http') == -1) {
      base = document.baseURI;
      src = base.substring(0,base.lastIndexOf('/')) + src;
    }

    img.style.border = "1px dotted #CCCCCC"
    a = document.createElement('a');
    a.setAttribute('href',src);
    a.innerHTML = '+ NIBL';
    a.style.position = 'absolute';
    a.style.left = _ClipGrab.findPosX(img) + img.offsetWidth - 78 + 'px';
    a.style.top = _ClipGrab.findPosY(img) + img.offsetHeight - 25 + 'px';
    a.style.zIndex = "9999";
    a.style.backgroundColor = "#222222";
    a.style.color = "#FFFFFF";
    a.style.textDecoration = "none";
    a.style.padding = "1px";
    a.style.width = "75px";
    a.style.height = "22px";
    a.style.textAlign = "center";
    a.style.fontSize = "14px";
    a.style.lineHeight = "22px";
    a.style.borderBottom = "1px solid #000000";
    a.style.borderRight = "1px solid #000000";
    a.pairedClipGrabImage = img;

    a.onclick = function() {
      _ClipGrab.grabber.addFile(this.getAttribute('href'));
      a.pairedClipGrabImage.style.border = "1px solid transparent";
      this.style.backgroundColor = "#999999";
      this.style.border = "";
      this.innerHTML = 'added';
      return false;
    }

    document.body.appendChild(a);
  }
};

_ClipGrab.getSelText = function ()
{
    var txt = '';
     if (window.getSelection)
    {
        txt = window.getSelection();
             }
    else if (document.getSelection)
    {
        txt = document.getSelection();
            }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
            }
    else return;
    return txt;
};


_ClipGrab.findPosX = function(obj)
{
  var curleft = 0;
  if(obj.offsetParent)
      while(1) 
      {
        curleft += obj.offsetLeft;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.x)
      curleft += obj.x;
  return curleft;
}

_ClipGrab.findPosY = function(obj)
{
  var curtop = 0;
  if(obj.offsetParent)
      while(1)
      {
        curtop += obj.offsetTop;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.y)
      curtop += obj.y;
  return curtop;
}

_ClipGrab.grabber = new _ClipGrab.Grabber()