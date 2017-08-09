console.clear();
var domain = location.host;
console.info(domain);
var dialog = document.getElementById('dialog');
if (dialog == null) {
	var dialog = document.createElement('dialog');
	dialog.setAttribute('id', 'dialog');
	dialog.setAttribute('open', 'open');
	dialog.style.position = 'fixed';
	dialog.style.margin = '0px';
	dialog.style.top = '100px';
	dialog.style.left = '0px';
	dialog.style.zIndex = 10000;
	document.body.appendChild(dialog);
}
dialog.innerHTML = '';

function xmlHttpRequest(url) {
	console.info(url);
	console.warn("document.getElementById('dialog') = " + document.getElementById('dialog'));
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.info(xhr.responseText);
				var data = JSON.parse(xhr.responseText);


			}
		} else {
			console.error(url);
			console.error(xhr.responseText);
		}
	}
	xhr.open('GET', url, false);
	xhr.send();
}

var videoId;
var param = document.getElementsByTagName('param');
for (i = 0; i < param.length; i++) {
	if (param[i].getAttribute('name') == 'flashvars') {
		var flashvars = param[i].getAttribute('value');
		console.info(flashvars);
		if (flashvars.indexOf('&') != -1) {
			var vars = new Array();
			vars = flashvars.split('&');
			for (j = 0; j < vars.length; j++) {
				//console.info(vars[i]);
				if (vars[j].indexOf('vid=') != -1) {
					videoId = vars[j].substring(4);
					console.info(videoId);					
					var url = 'http://vv.video.qq.com/geturl?vid=' + videoId;
					xmlHttpRequest(url);
					break;
				}
			}
			break;	
		}		
	}
}