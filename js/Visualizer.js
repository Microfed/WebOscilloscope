/**
 * Created by JetBrains WebStorm.
 * User: Microfed
 * Date: 22.12.11
 * Time: 6:21
 * To change this template use File | Settings | File Templates.
 */

Visualize.Visualizer = atom.Class({
    initialize:function (gridContext, dataContext, countOfPoints, sweep) {
        this.gridContext = gridContext;
        this.dataContext = dataContext;
        this.countOfPoints = countOfPoints;
        this.yAxis = dataContext.height / 2 - sweep / 2;
        this.drawGrid();
        this.dataContext.strokeStyle = 'red';
        this.magicOutOfSweep = 32568;
    },


    drawGrid:function () {
        var gridContext = this.gridContext,
            i,
            height = gridContext.height,
            width = gridContext.width,
            gridStep = 25;

        gridContext.lineWidth = 0.1;

        for (i = 0; i < width; i += gridStep) {
            gridContext.beginPath(i, 0);
            gridContext.lineTo(i, height);
            gridContext.stroke('#dddddd').closePath();
        }
        for (i = 0; i < height; i += gridStep) {
            gridContext.beginPath(0, i);
            gridContext.lineTo(width, i);
            gridContext.stroke('#dddddd').closePath();
        }

        gridContext.lineWidth = 0.7;
        gridContext.beginPath(0, gridContext.height / 2);
        gridContext.lineTo(gridContext.width, gridContext.height / 2).stroke('#fff08d').closePath();
        gridContext.beginPath(gridContext.width / 2, 0);
        gridContext.lineTo(gridContext.width / 2, gridContext.height).stroke('#fff08d').closePath();
        gridContext.lineWidth = 1;
    },

    drawFrame:function (data) {
        var i,
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
});
