GRAB_CLIP_BASE_URL = 'http://localhost:9393/iframe'

UIhud = document.createElement('div');
UIhud.setAttribute('style',"position:fixed;top:0px;right:0px;background-color:#EEEEEE;border-left:1px solid #333333;border-bottom:1px solid #333333;width:200px;height:40px;");

document.body.appendChild(UIhud);

UIhud.innerHTML = "<input type='submit' value='click ME' onclick='sendMessage(\"testing\");return false;'/>";

iFrame = document.createElement('iframe');
iFrame.setAttribute('src',GRAB_CLIP_BASE_URL)

document.body.appendChild(iFrame);

function sendMessage(message) {
  iFrame.contentWindow.location = GRAB_CLIP_BASE_URL + "#" + escape(message);
}