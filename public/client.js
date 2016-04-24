var nickname = prompt('What is your nickname please?');

var socket = io.connect('http://195.154.72.36:55555');

socket.emit('nickname', nickname);
socket.on('nickname', function(msg) {
    var chatarea = document.getElementById('chatarea');
    chatarea.innerHTML += `<p><em>${msg} enters the room.</em></p>`;
});

socket.on('msg', function(msg) {
    var chatarea = document.getElementById('chatarea');
    var nickname = msg['nickname'];
    var msg = msg['msg'];

    var p = document.createElement("p");
    p.setAttribute("class", "fadein");
    p.innerHTML = `<strong>${nickname}:</strong> ${msg}`;

    chatarea.appendChild(p);
});

var textarea = document.getElementById('msg');
textarea.addEventListener('keyup', function(evt) {
    if(evt.keyCode != 13/*Enter Key*/)
	return;
    socket.emit('msg', {'nickname': nickname, 'msg': textarea.value});
    textarea.value = '';
});
