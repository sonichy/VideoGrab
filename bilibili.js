console.clear();
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
dialog.style.display = 'block';
dialog.innerHTML = '';
var button = document.createElement('button');
button.textContent=' X ';
dialog.appendChild(button);
button.onclick = function(){
	dialog.style.display = 'none';
}
var br = document.createElement('br');
dialog.appendChild(br);

var video = document.getElementsByTagName('video');
//window.open(video[0].src);
video[0].pause();
var video1 = document.createElement('video');
video1.src = video[0].src;
dialog.appendChild(video1);
video1.play();
