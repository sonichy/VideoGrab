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

function xmlHttpRequest1(url, c) {
	console.info(url);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.info(xhr.responseText);
				var data = JSON.parse(xhr.responseText);
				var a = document.createElement('a');
				a.textContent = '[' + c + ']';
				a.target = '_blank';
				a.href = data.url;
				a.onclick = function(){
					var as = dialog.getElementsByTagName('a');
					for(l=0; l<as.length; l++){
						as[l].style.color = 'black';
					}
					this.style.color = 'red';
				}
				dialog.append(a);
				var br = document.createElement('br');
				dialog.append(br);
			}
		} else {
			console.error(url);
			console.error(xhr.responseText);
		}
	}
	xhr.open('GET', url, false);
	xhr.send();
}

function xmlHttpRequest(url) {
	console.info(url);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.info(xhr.responseText);
				var data = JSON.parse(xhr.responseText);
				var clipsURL = data.data.clipsURL;
				for (k = 0; k < clipsURL.length; k++) {
					var d = new Date();
					var url1 = 'http://' + data.allot + '/?prot=9&prod=flash&pt=1&file=' + data.data.clipsURL[k] + '&new=' + data.data.su[k] + '&key=' + data.data.ck[k] + '&vid=' + videoId + '&uid=' + d.getTime() + '&t=' + Math.random() + '&rb=1';
					xmlHttpRequest1(url1, k+1);
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

var videoId;
var embed = document.getElementsByTagName('embed');
console.info(embed);
for (i = 0; i < embed.length; i++) {
	var flashvars = embed[i].getAttribute('flashvars');
	console.info(flashvars);
	if (flashvars.indexOf('&') != -1) {
		var vars = new Array();
		vars = flashvars.split('&');
		for (j = 0; j < vars.length; j++) {
			//console.info(vars[j]);
			if (vars[j].indexOf('vid=') != -1) {
				videoId = vars[j].substring(4);
				console.info(videoId);
				var url = 'http://hot.vrs.sohu.com/vrs_flash.action?vid=' + videoId;
				xmlHttpRequest(url);
				break;
			}
		}
	}
}