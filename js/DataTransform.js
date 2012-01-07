/**
 * Created by JetBrains WebStorm.
 * User: Microfed
 * Date: 22.12.11
 * Time: 8:22
 * To change this template use File | Settings | File Templates.
 */

Visualize.DataTransform = atom.Class({
    initialize:function (sweep, countOfPoints) {
        this.sweep = sweep;
        this.countOfPoints = countOfPoints;
        this.magicOutOfSweep = 32568;
    },

    getFormattedData:function (array, callback) {
        var i = 0, j = 0,
            step = 1,
            length = array.length,
            over = 0,
            newArray = [];

        for (i = 0; i < length; i++) {
            if (array[i] > this.sweep || array[i] < -(this.sweep)) {
                array[i] = this.magicOutOfSweep;
            }
        }

        if (length > this.countOfPoints) {
            for (i = 2; i <= length / this.countOfPoints; i += 2) {
                over = length / i;
                if (over === this.countOfPoints) {
                    step = i;
                    break;
                } else if (over < this.countOfPoints) {
                    for (j = 0; j < length - 1; j++) {
                        newArray[j] = array[j];
                        newArray[j + 1] = (array[j] + array[j + 1]) / 2;
                        callback(newArray);
                    }
                    break;
                }
            }
        } else if (length < this.countOfPoints) {
            for (j = 0; j < this.countOfPoints; j += 2) {
                if (j + 1 <= length) {
                    newArray[j] = array[j / 2];
                    newArray[j + 1] = (array[j / 2] + array[j / 2 + 1]) / 2;
                } else {
                    newArray[j] = array[j / 2];
                    newArray[j + 1] = (array[j / 2] + array[j / 2] + 1) / 2;
                }
            }
            callback(newArray);
        }

        for (i = 0; i < length / step; i += 1) {
            newArray[i] = array[i * step];
        }

        callback(newArray);
    },

    changeSweep:function (newSweep) {
        this.sweep = newSweep;
    }
});