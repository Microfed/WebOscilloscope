/**
 * Created by JetBrains WebStorm.
 * User: Microfed
 * Date: 24.12.11
 * Time: 6:21
 * To change this template use File | Settings | File Templates.
 */

Visualize.Visualizer = atom.Class({
    initialize:function (gridContext, dataContext, countOfPoints, sweep) {
        this.gridContext = gridContext;
        this.dataContext = dataContext;
        this.countOfPoints = countOfPoints;
        this.yAxis = dataContext.height / 2 - sweep / 2;
        this.drawGrid(gridContext);
        this.dataContext.strokeStyle = 'red';
        this.magicOutOfSweep = 32568;
    },


    drawGrid:function (context) {
        var i,
            height = context.height,
            width = context.width,
            gridStep = 25;

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
    },

    drawFrame:function (data) {
        var i = 0,
            yAxis = this.yAxis,
            y;
        this.dataContext.clearAll();
        this.dataContext.beginPath(0.5, yAxis).lineJoin = 'round';
        for (i = 0; i < this.countOfPoints; i += 1) {
            y = data[i];
            if (y !== this.magicOutOfSweep) {
                this.dataContext.lineTo(i + 0.5, data[i] + yAxis);
            }
        }
        this.dataContext.stroke();
    }
})
