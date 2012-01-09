/**
 * @fileOverview Файл содержит описание класса-менеджера, который отвечает за
 * взаимодействие между модулем получения данных, преобразования и визуализатором.
 *
 * @author <a href="mailto:microfed@gmail.com">Microfed</a>
 */

/**
 * @namespace Пакет визуализатора. Содержит основные классы для работы с даными
 * (получение, преобразование, отображение)
 */
var Visualize = {};

Visualize.VisualizeManager = atom.Class(
    /**
     @lends Visualize.VisualizeManager#
     */
    {
        /**
         * @class Класс, отвечающий за межмодульное взаимодействие:
         * включает в себя объекты классов для работы с сетью,
         * данными, визуализацией.
         *
         * Конструктор класса
         * @param {String} address IP-адрес сервера, у которого запрашиваются данные
         * @param {Number} sweep Развертка осцилографа
         * @param {Number} countOfPoints Количество точек (пикселей) на канвасе
         * @constructs
         */
        initialize:function (address, sweep, countOfPoints) {
            /**
             *  Контекст канваса для координатной сетки
             * @field
             * @type HTMLCanvasElement
             */
            this.gridContext = this.getCanvasContext("grid");
            /**
             * Контекст канваса для отображения данных
             * @field
             * @type HTMLCanvasElement
             */
            this.dataContext = this.getCanvasContext("data");
            /**
             * Экземпляр класса визуализатора
             * @field
             * @type Visualize.Visualizer
             */
            this.visualizer = new Visualize.Visualizer(this.gridContext, this.dataContext, countOfPoints, sweep);
            /**
             * Экземпляр класса преобразователя данных
             * @field
             * @type Visualize.DataTransform
             */
            this.dataTransform = new Visualize.DataTransform(sweep, countOfPoints);
            /**
             * Экземпляр класса класса, обеспечивающего
             * получение данных по сети
             * @field
             * @type Visualize.DataStream
             */
            this.dataStream = new Visualize.DataStream(address);
        },

        /**
         * @method Получает текущий контекст указанного html-элемента (canvas)
         * @param {String} name Идентификатор html-элемента
         */
        getCanvasContext:function (name) {
            var LC = LibCanvas.extract({}),
                canvas = atom.dom('canvas').filter('#' + name).first;
            return canvas.getContext('2d-libcanvas');
        },

        /**
         * @method Визуализирует кадр переданных данных
         * в соответствии с внутренними настройками визуализатора.
         * @param {Array} data Маcсив данных для визуализации
         */
        drawCurrentFrame:function (data) {
            self.visualizer.drawFrame(data);
        }

    });
