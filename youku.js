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
				var stream = data.data.stream;
				for (i = 0; i < stream.length; i++) {
					var segs = stream[i].segs;
					var fieldset = document.createElement('fieldset');
					var legend = document.createElement('legend');
					legend.textContent = stream[i].stream_type + ' ' + stream[i].width + 'X' + stream[i].height;
					fieldset.appendChild(legend);
					for (j = 0; j < segs.length; j++) {
						var a = document.createElement('a');
						a.textContent = '[' + (j + 1) + ']';
						a.href = segs[j].cdn_url;
						a.target = '_blank';
						a.onclick = function(){
							var as = this.parentNode.getElementsByTagName('a');
							for(l=0; l<as.length; l++){
								as[l].style.color = '#2fb3ff';
							}
							this.style.color = 'red';
						}
						fieldset.appendChild(a);
						var br = document.createElement('br');
						fieldset.appendChild(br);
					}
					var a = document.createElement('a');
					a.textContent = 'm3u8';
					a.href = stream[i].m3u8_url;
					a.target = '_blank';					
					fieldset.appendChild(a);
					dialog.appendChild(fieldset);
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
				if (vars[j].indexOf('VideoIDS=') != -1) {
					videoId = vars[j].substring(9);
					console.info(videoId);
					var d = new Date();
					var url = 'https://ups.youku.com/ups/get.json?vid=' + videoId + '&ccode=0401&client_ip=192.168.1.1&utid=oqikEO1b7CECAbfBdNNf1PM1&client_ts=' + d.getTime();
					xmlHttpRequest(url);
					break;
				}
			}
			break;	
		}		
	}
}