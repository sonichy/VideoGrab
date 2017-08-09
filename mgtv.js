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

function xmlHttpRequest1(url,s) {
    console.info(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.info(xhr.responseText);
                var data = JSON.parse(xhr.responseText);
                var a = document.createElement('a');
                a.textContent = s;
                a.href = data.info;
                a.target = '_blank';
                dialog.appendChild(a);
                var br = document.createElement('br');
                dialog.appendChild(br);
            }
        } else {
            console.error(url);
            console.error(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
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
                var stream = data.data.stream;
                for(i=0; i<stream.length; i++) {
                    var url = data.data.stream_domain[0] + stream[i].url;
                    xmlHttpRequest1(url,stream[i].name);
                }
            }
        } else {
            console.error(url);
            console.error(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

var videoId;
var param = document.getElementsByTagName('param');
console.info(param);
for (a = 0; a < param.length; a++) {
    if (param[a].getAttribute('name') == 'flashvars') {
        var flashvars = param[a].getAttribute('value');
        console.info(flashvars);
        if (flashvars.indexOf('&') != -1) {
            var vars = new Array();
            vars = flashvars.split('&');
            for (b = 0; b < vars.length; b++) {
                //console.info(vars[i]);
                if (vars[b].indexOf('video_id=') != -1) {
                    videoId = vars[b].substring(9);
                    console.info(videoId);
                    var	url = 'http://pcweb.api.mgtv.com/player/video?video_id=' + videoId;
                    xmlHttpRequest(url);
                    break;
                }
            }
            break;
        }
    }

}
