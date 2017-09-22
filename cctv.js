console.clear();
var domain = location.host;
console.info(domain);
var dialog = document.getElementById('dialog');
if (dialog == null) {
	dialog = document.createElement('dialog');
	dialog.setAttribute('id', 'dialog');
	dialog.setAttribute('open', 'open');
	dialog.style.margin = '0px';
	dialog.style.top = '100px';
	dialog.style.left = '0px';
	dialog.style.zIndex = 10000;
	document.body.appendChild(dialog);
}
dialog.style.display = 'block';
dialog.innerHTML = '';
var button = document.createElement('button');
button.textContent=' X ';
dialog.appendChild(button);
button.onclick = function(){
	dialog.style.display = 'none';
}
var br = document.createElement('br');
dialog.appendChild(br);

function xmlHttpRequest(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //console.info(url);
                //console.info(xhr.responseText);
                var data = JSON.parse(xhr.responseText);                
                var video = data.video;
				for(var obj in video){
					//console.log(video[obj] + ' ' + Array.isArray(video[obj]));
					if(Array.isArray(video[obj])){
						var s='';
						for(i=0; i<video[obj].length; i++){
							s += video[obj][i].url;
							if(i<video[obj].length-1)s+=';';
						}
						var a = document.createElement('a');
						a.textContent = obj;
						a.href = s;
						dialog.appendChild(a);
						var br = document.createElement('br');
						dialog.appendChild(br);
						//console.log(obj+': '+s);
					}
				}
            }
        } else {
            console.error(url);
            console.error(xhr.responseText);
        }
    }
    xhr.open('GET', url, false);
    xhr.send();
}

var url;
var videoId;
var embed = document.getElementsByTagName('embed');
var flashvars = embed[0].getAttribute('flashvars');
var vars = new Array();
vars = flashvars.split('&');
var keyword = 'videoCenterId=';
for (i = 0; i < vars.length; i++) {
	//console.info(vars[i]);
    if (vars[i].indexOf(keyword) != -1) {    	
 		videoId = vars[i].substring(keyword.length);
        break;
   	}
}

url = 'http://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid=' + videoId;
xmlHttpRequest(url);
console.info(url);
//window.open(url);