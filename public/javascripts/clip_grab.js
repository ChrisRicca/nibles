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
    this.uiContainer.innerHTML = "<a href='http://drop.io/" + this.targetDrop().name + "'>View Your Nibbles</a>";
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
    document.onmouseup = function(e) {
      if (!e) var e = window.event;
      var relTarg = e.relatedTarget || e.fromElement;
      if (e.target.tagName == "IMG") {
        
        src = e.target.getAttribute('src');
        if (src.indexOf('http') == -1) {
          base = document.baseURI;
          src = base.substring(0,base.lastIndexOf('/')) + src
        }
        _ClipGrab.grabber.addFile(src)
      };
      return false;
    };
  };
  
  this.initialize();
};

_ClipGrab.grabber = new _ClipGrab.Grabber()