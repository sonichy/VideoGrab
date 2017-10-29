var port = null;
var nativeHostName = "videograb";

function onDisconnected(){
	console.log( "断开连接: " + chrome.runtime.lastError.message);
	port = null;
}

function connectToNativeHost(){
	port = chrome.runtime.connectNative(nativeHostName);
	port.onDisconnect.addListener(onDisconnected);
}

chrome.contextMenus.create({
	"id" : "CMVideoGrab",
	"title" : "播放视频",	
	"contexts" : ["video","link"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
	//console.log(info);
	if(info.menuItemId == 'CMVideoGrab'){
		connectToNativeHost();
		console.log(info.srcUrl);		
		port.postMessage(info.srcUrl);
	}
});

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
		console.info('tabs[0].url = ' + url);
		if(url.indexOf('yinyuetai.com')!=-1){
			chrome.tabs.executeScript({ file : 'yinyuetai.js' });
		}else if(url.indexOf('youku.com')!=-1){
			chrome.tabs.executeScript({ file : 'youku.js' });
		}else if(url.indexOf('mgtv.com')!=-1){
			chrome.tabs.executeScript({ file : 'mgtv.js' });
		}else if(url.indexOf('v.qq.com')!=-1){
			chrome.tabs.executeScript({ file : 'qq.js' });
		}else if(url.indexOf('tv.cctv.com')!=-1){
			chrome.tabs.executeScript({ file : 'cctv.js' });
		}else if(url.indexOf('tv.sohu.com')!=-1){
			chrome.tabs.executeScript({ file : 'sohu.js' });
		}else if(url.indexOf('iqiyi.com')!=-1){
			chrome.tabs.executeScript({ file : 'iqiyi.js' });
		}else if(url.indexOf('bilibili.com')!=-1){
			chrome.tabs.executeScript({ file : 'bilibili.js' });
		}else{			
			chrome.tabs.executeScript({ file : 'normal.js', allFrames: true });
		}		
	});
});