/**
 * Created by JetBrains WebStorm.
 * User: Microfed
 * Date: 22.12.11
 * Time: 6:22
 * To change this template use File | Settings | File Templates.
 */

var Visualize = {};

Visualize.VisualizeManager = atom.Class({
    initialize:function (address, sweep, countOfPoints) {
        this.gridContext = this.getCanvasContext("grid");
        this.dataContext = this.getCanvasContext("data");
        this.visualizer = new Visualize.Visualizer(this.gridContext, this.dataContext, countOfPoints, sweep);
        this.dataTransform = new Visualize.DataTransform(sweep, countOfPoints);
        this.dataStream = new Visualize.DataStream(address);
    },

    getCanvasContext:function (name) {
        var LC = LibCanvas.extract({}),
            canvas = atom.dom('canvas').filter('#' + name).first;
        return canvas.getContext('2d-libcanvas');
    },

    drawCurrentFrame:function (data) {
        self.visualizer.drawFrame(data);
    }

});
