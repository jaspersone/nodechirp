var twitter = require('ntwitter');

//your secret keys go here
var twit = new twitter({
  consumer_key: 'Y9XEnqkaSUwlxLu6JDoxsw',
  consumer_secret: 'Kjct0neBdpMdKKM0cx3s8F1YlAACKvRUTx9atje0L8',
  access_token_key: '17220415-q4Nlz6q75XYzHldzeTZGsDi0pGGtH7cECDHg5Wbo',
  access_token_secret: 'A2qXLgzu9qAc15aeg89yQ3NIxHc3g0TbAriLMM7k'
});

/*
twit.stream('statuses/sample', function(stream) {
  stream.on('data', function (data) {
    //console.log(data);
    console.log(data.text);
  });
});
*/

exports.getTweet = function (req, res) {

    var doProcessItem = true;
    var maxCount = 20;
    var count = 0;
    twit.stream('statuses/sample', function (stream) {
        stream.on('data', function (data) {
            console.log(data.text);
            res.write(data.text);
            ++count;
            if (!doProcessItem) {
                res.end();
                return;
            }
        });
    });

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('HELLO');

    while (count < maxCount) {
        if (count == maxCount) {
            doProcessItem = false;
        }
    }
}
