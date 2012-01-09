var io = require('socket.io').listen(1234),
    frames = 300,
    maxValue = 200,
    numberOfPixels = 1420,
    fr = 100, //частота
    period = [],
    data = [],
    j, i = 0, k = 0,
    loop;

for (j = 0; j < frames; j += 1) {
    period = [];
    for (i = 0; i < numberOfPixels; i += 1) {
        period.push(Math.floor(Math.random() * maxValue));
    }
    data.push(period);
}

io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
            console.log(msg);
        },
        socket.on('getData', function (msg) {
            fr = msg.fr;
            loop = setInterval(function () {
                socket.emit('newData', {dataArray:data[k]});
                k++;
                if (k === frames) {
                    clearInterval(loop);
                    socket.disconnect();
                    k = 0;
                }
            }, 1000 / fr);
        })
    );
    socket.on('disconnect', function () {
        if(loop !== undefined){
            clearInterval(loop);
            k = 0;
        }
    });
});