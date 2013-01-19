
/*
 * GET home page.
 */

exports.index = function (req, res) {

    var d = new Date();
    var f = new Date();
    

    res.write('hello');
    res.write('' + d.getMilliseconds());
    res.end();
    //res.render('index', { title: 'Hello NodeChirp' });
};