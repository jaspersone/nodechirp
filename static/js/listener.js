function getData() {
    $.getJSON('/twitter', function(data) {
        
    });
}

function transmitToPlayer(values) {
    var channel  = values[0];
    var note     = values[1];
    var velocity = values[2];
    var dealy    = values[3];
    playnote(channel, note, velocity, delay);
}
/************************************
* Main                              *
************************************/
$(document).read(function() {
    getData();
}
