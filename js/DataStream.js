/**
 * Created by JetBrains WebStorm.
 * User: Microfed
 * Date: 22.12.11
 * Time: 6:49
 * To change this template use File | Settings | File Templates.
 */

Visualize.DataStream = atom.Class({
    initialize:function (address) {
        this.adress = address;
        //this.requestInterval = interval;
        this.state = 'ready';
    },

    testConnect:function (onDone) {
        atom.ajax({
            type:'json',
            method:'get',
            url:this.adress,
            cache:false,
            onLoad:function (json) {
                onDone(true);
            },
            onError:function () {
                onDone(false);
            }
        });
    },

    receiveData:function (onReceiveCallback, onErrorCallback) {
        atom.ajax({
            type:'json',
            method:'get',
            url:this.adress,
            cache:false,
            onLoad:function (json) {
                onReceiveCallback(json);
            },
            onError:function () {
                this.state = "ready";
                onErrorCallback();
            }
        });
    },

    startReceiveData:function (frequency, onReceiveCallback, onErrorCallback) {
        this.state = "receive";
        var loop = setInterval(function () {
            if (self.state === "receive") {
                this.receiveData(onReceiveCallback, onErrorCallback)
            } else {
                clearInterval(loop);
            }
        }, 1000 / frequency);
    },

    stopReceiveData:function () {
        this.state = "ready";
    }
});