/**
 * Created by JetBrains WebStorm.
 * User: Microfed
 * Date: 03.01.12
 * Time: 15:57
 * To change this template use File | Settings | File Templates.
 */

Visualize.stopDrawing = false;

atom.dom(function () {
    var canvasWidth = window.innerWidth - 20,
        canvasHeight = window.innerHeight,
        visualizeManager = new Visualize.VisualizeManager("localhost", canvasHeight, canvasWidth);

    visualizeManager.gridContext.canvas.width = canvasWidth;
    visualizeManager.gridContext.canvas.height = canvasHeight;
    visualizeManager.dataContext.canvas.width = canvasWidth;
    visualizeManager.dataContext.canvas.height = canvasHeight;
    visualizeManager.visualizer.drawGrid();

    atom.dom('input').filter('#sweep').first.value = canvasHeight;
    atom.dom('div').filter('#settings').first.style.top = canvasHeight + 'px';
});

function CreateVisualizer(sweep, countOfPoints, maxAbsValue, countOfFrames) {
    var visualizeManager = new Visualize.VisualizeManager("localhost", sweep, countOfPoints),
        dataLength = countOfFrames,
        period = [],
        data = [],
        j, i = 0, k = 0,
        loop,
        draw = function () {
            var drawFrame = function (data) {
                visualizeManager.visualizer.drawFrame(data);
            };

            visualizeManager.dataTransform.getFormattedData(data[k], drawFrame);
            k++;
            if (k === dataLength || Visualize.stopDrawing) {
                clearInterval(loop);
            }
        };

    for (j = 0; j < dataLength; j += 1) {
        period = [];
        for (i = 0; i < countOfPoints; i += 1) {
            period[i] = Math.floor(Math.random() * maxAbsValue);
        }
        data.push(period);
    }

    Visualize.loop = setInterval(draw, 1);
}

function StartDrawing() {
    var sweep = atom.dom('input').filter('#sweep').first.value,
        countOfPoints = atom.dom('input').filter('#numberOfPoints').first.value,
        maxAbsValue = atom.dom('input').filter('#maxValue').first.value,
        countOfFrames = atom.dom('input').filter('#numberOfFrames').first.value;

    if (sweep > 0 && countOfPoints > 0 && maxAbsValue > 0 && countOfFrames > 1) {
        CreateVisualizer(sweep, countOfPoints, maxAbsValue, countOfFrames);
    }
}

function CreateVisualizerWithNet(sweep, countOfPoints, address, frequency) {
    var visualizeManager = new Visualize.VisualizeManager(address, sweep, countOfPoints),
        draw = function (msg) {
            var drawFrame = function (data) {
                visualizeManager.visualizer.drawFrame(data);
            },
                receivedData = msg.dataArray;

            visualizeManager.dataTransform.getFormattedData(receivedData, drawFrame);
        },
        socket = io.connect(address);

    socket.on('connect', function () {
        socket.emit("getData", {fr:frequency});

        socket.on('newData', function (msg) {
            if (Visualize.stopDrawing) {
                socket.disconnect();
            }
            draw(msg);
        });

        socket.on('disconnect', function () {

        });
    });


}

function StartDrawingWithNet() {
    var sweep = atom.dom('input').filter('#sweep').first.value,
        frequency = atom.dom('input').filter('#frequency').first.value,
        address = atom.dom('input').filter('#host').first.value,
        countOfPoints = window.innerWidth;

    Visualize.stopDrawing = false;

    if (sweep > 0 && countOfPoints > 0 && address !== "") {
        CreateVisualizerWithNet(sweep, countOfPoints, address, frequency);
    }
}

function StopReceivingData() {
    Visualize.stopDrawing = true;
}