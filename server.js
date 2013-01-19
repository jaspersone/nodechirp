
/**
 * Module dependencies.
 */

var routes = require('./routes')
  , user = require('./routes/user')
  , tweet = require('./routes/tweet')
  , http = require('http')
  , path = require('path')
  , app = require('express').createServer()
  , io   = require('socket.io').listen(app)
  , fs	 = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + './static/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/index.html');
});

app.get('/js', function (req, res) {
  res.sendfile(__dirname + '/static/js/');
});

app.get('/css', function (req, res) {
  res.sendfile(__dirname + '/static/css');
});


//app.get('/', routes.index);
//app.get('/users', user.list);
//app.get('/tweet', tweet.getTweet);

io.sockets.on('connection', function (socket) {
  socket.emit('sound', { channel: 0, note: 100, velocity: 127, delay: 0 });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
