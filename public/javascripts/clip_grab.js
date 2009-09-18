_ClipGrab.Grabber = function(){
  this.initialize = function() {
    this.iFrameURL = _ClipGrab.hostname + 'iframe.html';
    this.locationURL = document.location.href;
    this.buildUI();
    this.buildIframe();
    this.activate();
  };
  
  this.targetDrop = function() {
    return _ClipGrab.targetDrop;
  };
  
  this.buildUI = function() {
    this.uiContainer = document.createElement('div');
    this.uiContainer.setAttribute('style',"position:fixed;top:0px;right:0px;background-color:#EEEEEE;border-left:1px solid #333333;border-bottom:1px solid #333333;width:200px;height:40px;z-index:9999;");
    this.uiContainer.innerHTML = "<a href='http://drop.io/" + this.targetDrop().name + "'>View Your NIBLes</a>";
    document.body.appendChild(this.uiContainer);
  };
  
  this.buildIframe = function() {
    this.iFrame = document.createElement('iframe');
    this.iFrame.setAttribute('src',this.iFrameURL)
    this.iFrame.setAttribute('style','width:0px;height:0px;border-width:0px;')
    document.body.appendChild(this.iFrame);
  };
  
  this.addFile = function(href) {
    this.dropAction('addfile',href)
  };
  
  this.dropAction = function(action,message) {
    this.iFrame.contentWindow.location = this.iFrameURL + "#" + this.encodeMessage(action,message)
    
  };
  
  this.encodeMessage = function(action,message) {
    return this.targetDrop().name + "_a_a_a_" + action + "_a_a_a_" + escape(message);
  };
  
  this.activate = function() {
    images = document.getElementsByTagName('img')
    
    for (var i = 0; i < images.length; i++) { 
      if(images[i].tagName == "IMG") _ClipGrab.buildLinkForImage(images[i]);
    }
  };
  
  this.initialize();
};

_ClipGrab.buildLinkForImage = function(img) {
  src = img.getAttribute('src');
  if (src.indexOf('http') == -1) {
    base = document.baseURI;
    src = base.substring(0,base.lastIndexOf('/')) + src;
  }
  
  img.style.border = "2px solid #000000"
  a = document.createElement('a');
  a.setAttribute('href',src);
  a.innerHTML = 'NIBL this';
  a.style.position = 'absolute';
  a.style.left = _ClipGrab.findPosX(img) + img.offsetWidth + 'px';
  a.style.top = _ClipGrab.findPosY(img) + img.offsetHeight + 'px';
  a.style.zIndex = "99999";
  a.style.backgroundColor = "#000000";
  a.style.color = "#FFFFFF";
  a.style.textDecoration = "none";
  a.style.padding = "3px";
  a.pairedClipGrabImage = img;

  a.onclick = function() {
    _ClipGrab.grabber.addFile(this.getAttribute('href'));
    a.pairedClipGrabImage.style.border = "";
    return false;
  }
  
  document.body.appendChild(a);
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