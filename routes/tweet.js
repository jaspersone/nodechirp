var twitter = require('ntwitter');

//your secret keys go here
var twit = new twitter({
  consumer_key: 'Y9XEnqkaSUwlxLu6JDoxsw',
  consumer_secret: 'Kjct0neBdpMdKKM0cx3s8F1YlAACKvRUTx9atje0L8',
  access_token_key: '17220415-q4Nlz6q75XYzHldzeTZGsDi0pGGtH7cECDHg5Wbo',
  access_token_secret: 'A2qXLgzu9qAc15aeg89yQ3NIxHc3g0TbAriLMM7k'
});

exports.getTweet = function (req, res) {

    var doProcessItem = true;
    var maxCount = 100;
    var count = 0;
    var longestWordLength = 0;
    var longestWord = '';
    var wordCount = 0;

    ////
    var startDate = new Date();
    var endDate = new Date();
    endDate.setSeconds(startDate.getSeconds() + 3);
    ////

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    //twit.stream('statuses/filter', { 'locations': '-74,40,-73,41' }, function (stream) {
    twit.stream('statuses/sample', function (stream) {
        stream.on('data', function (data) {
            while (doProcessItem) {
                console.log(data.text);
                res.write(data.text);
                res.write("<BR \>");
                ++count;
                console.log("Tweet Count: " + count);
                var twords = data.text.split(" ");
                wordCount = twords.length;
                console.log("Word Count: " + wordCount);

                twords.forEach(logArrayElements);
                function logArrayElements(element, index, array) {
                    if (element.length > longestWordLength) {
                        longestWordLength = element.length;
                        longestWord = element;
                    }
                }
                console.log("Longest Word: " + longestWordLength);

                if (count > maxCount) {
                    doProcessItem = false;
                    res.end();
                    return;
                }
                var curDate = new Date();
                if (endDate < curDate) {
                    doProcessItem = false;
                    res.write("<BR \>");
                    res.write("In 3 Seconds or less than 100 tweets");
                    res.write("<BR \>");
                    res.write("Tweet Count: " + count);
                    res.write("<BR \>");
                    res.write("Last Tweet Word Count: " + wordCount);
                    res.write("<BR \>");
                    res.write("Longest Word Length: " + longestWordLength);
                    res.write("<BR \>");
                    res.write("Longest Word: " + longestWord);
                    res.write("<BR \>");
                    
                    res.end();
                    return;
                }
                return;
            }
        });
    });

}

