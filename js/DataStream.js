/**
 * @fileOverview Файл содержит описание класса для работы с данными по сети.
 *
 * @author <a href="mailto:microfed@gmail.com">Microfed</a>
 */

/**
 * @namespace Пакет визуализатора. Содержит основные классы для работы с даными
 * (получение, преобразование, отображение)
 * @name Visualize
 */

Visualize.DataStream = atom.Class(
    /**
     @lends Visualize.DataStream#
     */
    {
        /**
         * @class Класс, отвечающий за получение данных
         * по сети.
         *
         * Конструктор класса
         * @constructs
         * @param {String} address IP-адрес сервера-отправителя
         */
        initialize:function (address) {
            /**
             * IP-адрес сервера-отправителя
             * @field
             * @type String
             */
            this.adress = address;
            //this.requestInterval = interval;

            /**
             * Внутреннее состояние объекта.
             * Возможные значения: ready, receive.
             * @field
             * @type String
             */
            this.state = 'ready';
        },

        /**
         * Проверяет возможность соединения с
         * сервером.
         *
         * @method
         * @param {Function} onDone callback-функция
         */
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

        /**
         * Получает данные от сервера.
         *
         * @method
         * @param {Function} onReceiveCallback callback-функция. Вызывается в случае получения данных
         * @param {Function} onErrorCallback  callback-функция. Вызывается в случае ошибки соединения
         */
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

        /**
         * Получает данные с определенной частотой запросов.
         *
         * @method
         * @param {Number} frequency Частота запросов к серверу
         * @param {Function} onReceiveCallback callback-функция. Вызывается в случае получения данных
         * @param {Function} onErrorCallback  callback-функция. Вызывается в случае ошибки соединения
         */
        startReceiveData:function (frequency, onReceiveCallback, onErrorCallback) {
            var socket = io.connect(this.address);
            this.state = "receive";

            socket.on('connect', function () {
                socket.emit("getData", {fr:frequency});
                socket.on('newData', function (msg) {
                    if (self.state === "ready") {
                        socket.disconnect();
                    }
                    onReceiveCallback(msg.dataArray);
                })
            });

            socket.on('disconnect', function () {
                self.state = "ready";
            });
        },

        /**
         * Останавливает процесс приема данных.
         *
         * @method stopReceiveData
         */
        stopReceiveData:function () {
            this.state = "ready";
        }
    });