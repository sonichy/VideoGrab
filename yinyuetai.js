console.clear();
var domain = location.host;
console.info(domain);

function xmlHttpRequest(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.info(url);
                console.info(xhr.responseText);
                var data = JSON.parse(xhr.responseText);
                var link;
                var models = data.videoInfo.coreVideoInfo.videoUrlModels;
                link = models[models.length - 1].videoUrl;
                window.open(link);
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
var flashvars = embed[0].getAttribute('flashvars');
console.log('%c' + flashvars, 'color:blue;');
var vars = new Array();
vars = flashvars.split('&');
for (i = 0; i < vars.length; i++) {
    if (vars[i].indexOf('videoId=') != -1) {
        videoId = vars[i].substring(8);
        break;
    }
}

var url;
url = 'http://ext.yinyuetai.com/main/get-h-mv-info?json=true&videoId=' + videoId;
xmlHttpRequest(url);