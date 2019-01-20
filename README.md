# Chrome扩展：视频抓取器
解析视频网页，抓取视频地址，在新标签页中播放(mp4)或者在媒体播放器中播放(flv,m3u8...)，减少Flash播放视频CPU占用高的问题，让风扇安静下来，还可以无视广告。  

![alt](preview.jpg)  

致谢：视频提供商。  
参考：[YouKuDownLoader](https://github.com/zhangn1985/ykdl)。  
### 支持站点  
<table>
<tr><td>LOGO</td><td>站名</td><td>域名</td><td>支持情况</td></tr>
<tr><td><img src=http://www.yinyuetai.com/mv/get-logo></td><td>音悦Tai</td><td><a href=http://www.yinyuetai.com target=_blank>yinyuetai.com</a></td><td>mp4</td></tr>
<tr><td><img src=http://static.youku.com/youku/dist/img/find/yk-logo-1220.png></td><td>优酷</td><td><a href=http://www.youku.com target=_blank>youku.com</a></td><td>flv或mp4片段列表 + m3u8(不能拖动进度)</td></tr>
<tr><td><img src=http://img.hunantv.com/imgotv-channel/2582c1aa/imgotv-pub/component/header/logo.png></td><td>芒果tv</td><td><a href=http://www.mgtv.com target=_blank>mgtv.com</a></td><td>m3u8(能拖动进度)</td></tr>
<tr><td><img src=http://css.tv.itc.cn/global/images/nav1/logo.gif></td><td>搜狐视频</td><td><a href=http://tv.sohu.com target=_blank>tv.sohu.com</a></td><td>mp4片段列表</td></tr>
<tr><td><img src=qqv.png></td><td>腾讯视频</td><td><a href=http://v.qq.com target=_blank>v.qq.com</a></td><td>...</td></tr>
<tr><td><img src=56.png></td><td>56</td><td><a href=http://www.56.com target=_blank>56.com</a></td><td>...</td></tr>
</table>

### 2.0 (2017-10)
视频右键发送视频地址到本地播放器。

### Chrome 扩展启动本地应用程序
http://match-yang.blog.163.com/blog/static/2109902542014319103739996/  
http://blog.csdn.net/ztmaster/article/details/52684772  
1.Chrome扩展支持
<pre>
manifest.json
"permissions": [ "nativeMessaging" ]
</pre>
<pre>
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
</pre>
2.程序接收参数  
Qt（C语音）
<pre>
QMediaPlayer *player;
QStringList Largs = QApplication::arguments();
qDebug() << Largs;
if(Largs.length()>1){
    if(!Largs.at(1).contains("chrome-extension://")){
    QUrl url(Largs.at(1));
    open(url.toLocalFile());
}else{
    // 下面这段放在外面会导致调试时窗口出不来和从外部程序打开文件中断
    // 接收Chrome扩展传来的数据
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
3.配置文件  
path 参数为程序绝对路径
allowed_origins 参数为扩展路径
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
Linux路径：～/.config/google-chrome/NativeMessagingHosts  
Windows运行：REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\videograb" /ve /t REG_SZ /d "%~dp0videograb.json" /f