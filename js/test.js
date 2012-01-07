var drawGrid = function (context) {
    var i,
        height = context.height,
        width = context.width,
        gridStep = 25;

/*    context.fillStyle = '#333333';
    context.fillRect(0, 0, width, height);*/
    context.lineWidth = 0.1;

    for (i = 0; i < width; i += gridStep) {
        context.beginPath(i, 0);
        context.lineTo(i, height);
        context.stroke('#dddddd').closePath();
    }
    for (i = 0; i < height; i += gridStep) {
        context.beginPath(0, i);
        context.lineTo(width, i);
        context.stroke('#dddddd').closePath();
    }

    context.lineWidth = 0.7;
    context.beginPath(0, context.height / 2);
    context.lineTo(context.width, context.height / 2).stroke('#fff08d').closePath();
    context.beginPath(context.width / 2, 0);
    context.lineTo(context.width / 2, context.height).stroke('#fff08d').closePath();
    context.lineWidth = 1;
};

function startDraw() {
    var LC = LibCanvas.extract({}),
        canvas = atom.dom('canvas').first,
        context = canvas.getContext('2d-libcanvas'),
        period = [], data = [],
        i, j,
        loop,
        periodLength = 800, dataLength = 500,
        yAxis = context.height / 6,
        fps = 0, now, lastUpdate = (new Date) * 1 - 1, fpsFilter = 50,
        draw = function () {
            periodLength = data[j].length;
            context.clearAll();
            context.beginPath(0.5, yAxis).lineJoin = 'round';
            for (i = 0; i < periodLength; i += 3) {
                context.lineTo(i + 0.5, data[j][i] + yAxis);
            }
            context.stroke();
            j += 1;

            var thisFrameFPS = 1000 / ((now = Date.now()) - lastUpdate);
            fps += (thisFrameFPS - fps) / fpsFilter;
            lastUpdate = now;
            if (j === dataLength) {
                clearInterval(loop);
            }
        };

    for (j = 0; j < dataLength; j += 1) {
        period = [];
        for (i = 0; i < periodLength; i += 1) {
            period[i] = Math.floor(Math.random() * 200);
        }
        data.push(period);
    }

    j = 0;
    context.strokeStyle = 'red';
    loop = setInterval(draw, 0);
    var fpsOut = document.getElementById('fps');
    setInterval(function () {
        fpsOut.innerHTML = fps.toFixed(1) + "fps";
    }, 200);
}

atom.dom(function () {

    var LC = LibCanvas.extract({}),
        canvas = atom.dom('canvas').filter('#layer2').first,
        context = canvas.getContext('2d-libcanvas');
    drawGrid(context);
    //drawAxis(context);


// Begin/close path, line/moveTo
    /*    new function () {
     context
     .beginPath(20.5, 20.5)
     .lineTo(20.5, 50.5)
     .lineTo(50.5, 50.5)
     .lineTo(50.5, 20.5)
     .closePath(20.5, 20.5)
     .fill('#900')
     .stroke('red');
     };

     // Shape fill/stroke
     new function () {
     var testShape = new LC.Rectangle(60, 20, 30, 30).snapToPixel();
     context
     .fill(testShape, '#090')
     .stroke(testShape, '#0f0');
     };

     // arc
     new function () {
     var circleCenter = new LC.Point(125, 23);
     context
     .beginPath(circleCenter)
     .arc({
     circle:new LC.Circle({
     center:circleCenter,
     radius:25
     }),
     angle:{
     start:(65).degree(),
     end:(170).degree()
     }
     })
     .closePath(circleCenter)
     .fill('#930')
     .stroke('#f90');
     };

     // curveTo
     new function () {
     context
     .save()
     .beginPath(140, 20)
     // bezierCurveTo
     .curveTo({
     to:[170, 50],
     points:[
     [140, 60],
     [150, 20]
     ]
     })
     // quadraticCurveTo
     .curveTo({
     to:[140, 20],
     points:[
     [170, 20]
     ]
     })
     // drawing
     .closePath()
     .set({ lineWidth:2 })
     .stroke('royalblue')
     .restore();
     };

     // text
     new function () {
     context.text({
     text:'test',
     align:'right',
     padding:20,
     color:'green'
     });
     };

     // draw rotated image
     new function () {
     [10, 40, 70].forEach(function (angle) {
     context.drawImage({
     image:canvas,
     crop:[10, 10, 100, 45],
     draw:[10, 70, 100, 45],
     angle:angle.degree()
     });
     });
     };*/
});