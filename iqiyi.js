/*
def get_macid():
    '''获取macid,此值是通过mac地址经过算法变换而来,对同一设备不变'''
    macid=''
    chars = 'abcdefghijklnmopqrstuvwxyz0123456789'
    size = len(chars)
    for i in range(32):
        macid += list(chars)[random.randint(0,size-1)]
return macid

def get_vf(url_params):
    '''计算关键参数vf'''
    sufix=''
    for j in range(8):
        for k in range(4):
            v4 = 13 * (66 * k + 27 * j) % 35
            if ( v4 >= 10 ):
                v8 = v4 + 88
            else:
                v8 = v4 + 49
            sufix += chr(v8)
    url_params += sufix
    m = hashlib.md5()
    m.update(url_params.encode('utf-8'))
    vf = m.hexdigest()
    return vf

tm = int(time.time() * 1000);//gettime(),毫秒
var d = new Date();
tm = d.getTime();

host = 'http://cache.video.qiyi.com';
src = '/vps?tvid=' + tvid + '&vid=' + vid + '&v=0&qypid=' + tvid + '_12&src=01012001010000000000&t=' + str(tm) + '&k_tag=1&k_uid=' + get_macid() + '&rs=1';
vf = get_vf(src);
req_url = host + src + '&vf=' + vf;
*/

//var newscript = document.createElement('script');
//newscript.setAttribute('type','text/javascript');
//newscript.setAttribute('src','md5.js');
//var head = document.getElementsByTagName('head')[0];  
//head.appendChild(newscript);

function get_vf(url_params){
    // 计算关键参数vf
    sufix=''
    for(j=0; j<8; j++){
        for(k=0; k<4; k++){
            v4 = 13 * (66 * k + 27 * j) % 35;
			v8 = 0;
            if ( v4 >= 10 ){
                v8 = v4 + 88;
			}else{
                v8 = v4 + 49;
			}
            sufix += String.fromCharCode(v8);
		}
	}
	url_params += sufix;
	vf = hex_md5(url_params);
    return vf;
}

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
					host = 'http://cache.video.qiyi.com';					
					src = '/vps?tvid=' + tvid + '&vid=' + vid + '&v=0&qypid=' + tvid + '_12&src=01012001010000000000&t=' + d.getTime() + '&k_tag=1&k_uid=' + get_macid() + '&rs=1';
					vf = get_vf(src);
					console.log(vf);
					url = host + src + '&vf=' + vf;
					xmlHttpRequest(url);
					break;
				}
			}
			break;	
		}		
	}
}