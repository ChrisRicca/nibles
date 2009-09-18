_ClipGrab.Grabber = function(){
  this.initialize = function() {
    this.iFrameURL = _ClipGrab.hostname + 'iframe.html';
    this.locationURL = document.location.href;
    this.buildUI();
    this.buildIframe();
  };
  
  this.targetDrop = function() {
    return _ClipGrab.targetDrop;
  };
  
  this.buildUI = function() {
    this.uiContainer = document.createElement('div');
    this.uiContainer.setAttribute('style',"position:fixed;top:0px;right:0px;background-color:#EEEEEE;border-left:1px solid #333333;border-bottom:1px solid #333333;width:200px;height:40px;");
    this.uiContainer.innerHTML = "<input type='submit' value='click ME' onclick='sendMessage(\"testing\");return false;'/>";
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
  
  this.initialize();
};

_ClipGrab.grabber = new _ClipGrab.Grabber()