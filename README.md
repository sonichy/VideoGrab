# Chrome Extension: VideoGrab
Analyze video webpage, and display video url in a box.  
You can play HLS(m3u8) in Chrome by [HLSPlayer](http://github.com/sonichy/HLSPlayer) extention.

![alt](preview.jpg)  

## Thanks
Video providers.  
## Reference
[YouKuDownLoader](https://github.com/zhangn1985/ykdl)  
## Supported Sites  
<table>
<tr><td>LOGO</td><td>Name</td><td>Site</td><td>Condition</td></tr>
<tr><td><img src=http://www.yinyuetai.com/mv/get-logo></td><td>音悦Tai</td><td><a href=http://www.yinyuetai.com target=_blank>yinyuetai.com</a></td><td>mp4</td></tr>
<tr><td><img src=http://static.youku.com/youku/dist/img/find/yk-logo-1220.png></td><td>优酷</td><td><a href=http://www.youku.com target=_blank>youku.com</a></td><td>flv或mp4片段列表 + m3u8(不能拖动进度)</td></tr>
<tr><td><img src=http://img.hunantv.com/imgotv-channel/2582c1aa/imgotv-pub/component/header/logo.png></td><td>芒果tv</td><td><a href=http://www.mgtv.com target=_blank>mgtv.com</a></td><td>m3u8(能拖动进度)</td></tr>
<tr><td><img src=http://css.tv.itc.cn/global/images/nav1/logo.gif></td><td>搜狐视频</td><td><a href=http://tv.sohu.com target=_blank>tv.sohu.com</a></td><td>mp4片段列表</td></tr>
<tr><td><img src=qqv.png></td><td>腾讯视频</td><td><a href=http://v.qq.com target=_blank>v.qq.com</a></td><td>...</td></tr>
<tr><td><img src=56.png></td><td>56</td><td><a href=http://www.56.com target=_blank>56.com</a></td><td>...</td></tr>
</table>

### 2.0 (2017-10)
Video right menu send to native video player.

## Chrome Extension Start Up Native Software
http://match-yang.blog.163.com/blog/static/2109902542014319103739996/  
http://blog.csdn.net/ztmaster/article/details/52684772  
1.Chrome Extension Support
<pre>
manifest.json
"permissions": [ "nativeMessaging" ]
</pre>
<pre>
var port = null;
var nativeHostName = "videograb";

function onDisconnected(){
	console.log( "Disconnect " + chrome.runtime.lastError.message);
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
</pre>
2.Software Receive Parameters  
Qt（C++）
<pre>
QMediaPlayer *player;
QStringList Largs = QApplication::arguments();
qDebug() << Largs;
if(Largs.length()>1){
    if(!Largs.at(1).contains("chrome-extension://")){
    QUrl url(Largs.at(1));
    open(url.toLocalFile());
}else{    
    int length = 0;
    //read the first four bytes (=> Length)
    //getwchar: receive char from stdin
    //putwchar: write char to stdout
    for (int i = 0; i < 4; i++) {
        length += getwchar();
    }
    //read the json-message
    QString url = "";
    for (int i = 0; i < length; i++) {
        url += getwchar();
    }
    //浏览器端传来的数据会有一个双引号引在两端
    url = url.mid(1, url.length()-2);
    qDebug() << url;
    if(url != ""){
        ui->tableWidget->hide();
        player->setMedia(QUrl(url));
        player->play();
        setWindowTitle(url);
    }
}
</pre>
3.Config file  
path: Software absolute path  
allowed_origins: chrome-extension://*  
<pre>
videograb.json
{
	"name": "videograb",
	"description": "Chrome send video url to native app.",
	"path": "/media/sonichy/job/HY/Linux/Qt/HTYMP/HTYMP",
	"type": "stdio",
	"allowed_origins": [ "chrome-extension://jiahehpnnhnnohoaknibedkbkdkibeho/"	]
}
</pre>
Linux Path：～/.config/google-chrome/NativeMessagingHosts  
Windows运行：REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\videograb" /ve /t REG_SZ /d "%~dp0videograb.json" /f