var express = require('express');
var app = express();
var srv = require('http').Server(app);
var io = require('socket.io')(srv);
var ent = require('ent');
var encode = require('ent/encode');

srv.listen(55555);

app.set('view engine', 'pug');
app.use('/static', express.static(__dirname+'/public'));

app.get('/', function(req, res) {
    console.log('Get / route.');
    res.render('index');
});

app.use(function(req, res, next) {
    console.log("404 page not found.");
    res.status(404).send("Page not found.");
});

io.on('connection', function(socket) {
    socket.on('nickname', function(msg) {
	socket.nickname = encode(msg);
	socket.broadcast.emit('nickname', socket.nickname);
    });
    socket.on('msg', function(msg) {
	msg['nickname'] = encode(msg['nickname']);
	msg['msg'] = encode(msg['msg']);
	io.sockets.emit('msg', msg);
    });
});
