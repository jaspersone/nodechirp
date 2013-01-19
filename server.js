
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , tweet = require('./routes/tweet')
  , http = require('http')
  , path = require('path')
  , app = require('http').createServer(handler)
  , io   = require('socket.io').listen(app)
  , fs	 = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/tweet', tweet.getTweet);

io.sockets.on('connection', function (socket) {
  socket.emit('sound', { channel: 0, note: 100, velocity: 127, delay: 0 });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
