chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
		console.info('tabs[0].url = ' + url);
		if(url.indexOf('yinyuetai.com')!=-1){
			chrome.tabs.executeScript({ file : 'yinyuetai.js' });
		}
		if(url.indexOf('youku.com')!=-1){
			chrome.tabs.executeScript({ file : 'youku.js' });
		}
		if(url.indexOf('mgtv.com')!=-1){
			chrome.tabs.executeScript({ file : 'mgtv.js' });
		}
		if(url.indexOf('v.qq.com')!=-1){
			chrome.tabs.executeScript({ file : 'qq.js' });
		}
		if(url.indexOf('tv.cctv.com')!=-1){
			chrome.tabs.executeScript({ file : 'cctv.js' });
		}
		if(url.indexOf('tv.sohu.com')!=-1){
			chrome.tabs.executeScript({ file : 'sohu.js' });
		}
		if(url.indexOf('iqiyi.com')!=-1){
			chrome.tabs.executeScript({ file : 'iqiyi.js' });
		}
		//chrome.tabs.create({ url: chrome.runtime.getURL('result.htm') });
	});
});

//chrome.extension.onMessage.addListener(
//    function(request, sender, sendResponse) {
//        console.log(request.title);
//		chrome.browserAction.setBadgeText({ text:request.title });
//		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//			chrome.tabs.executeScript({ code : "alert(request.title);document.title = request.title;" });
//		});
//  }
//);