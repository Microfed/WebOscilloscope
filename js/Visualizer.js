/**
 * @fileOverview Файл содержит описание класса-визуализатора.
 *
 * @author <a href="mailto:microfed@gmail.com">Microfed</a>
 */

/**
 * @namespace Пакет визуализатора. Содержит основные классы для работы с даными
 * (получение, преобразование, отображение)
 * @name Visualize
 */

Visualize.Visualizer = atom.Class(
    /**
     @lends Visualize.Visualizer#
     */
    {
        /***
         * @class Класс, отвечающий за отображение данных.
         *
         * Конструктор класса
         * @param {HTMLCanvasElement} gridContext Контекст канваса для координатной сетки
         * @param {HTMLCanvasElement} dataContext Контекст канваса для отображения данных
         * @param {Number} countOfPoints Количество точек (пикселей) на канвасе
         * @param {Number} sweep Развертка осциллографа
         * @constructs
         */
        initialize:function (gridContext, dataContext, countOfPoints, sweep) {
            /**
             * Контекст канваса для координатной сетки
             * @field
             * @type HTMLCanvasElement
             */
            this.gridContext = gridContext;

            /**
             * Контексn канваса для отображения данных.
             * @field
             * @type HTMLCanvasElement
             */
            this.dataContext = dataContext;

            /**
             * Количество точек (пикселей) на канвасе
             * @field
             * @type Number
             */
            this.countOfPoints = countOfPoints;

            /**
             * Сдвиг оси ординат относительно 0 (top).
             * Указывается для корректировки значений по y-координате.
             * @field
             * @type Number
             */
            this.yAxis = dataContext.height / 2 - sweep / 2;

            this.drawGrid();

            /**
             * Цвет графика.
             * @field
             * @type String
             */
            this.dataContext.strokeStyle = 'red';

            /**
             * Значение, которое характеризует выход за границы
             * развертки. Такое же значение установлено в классе
             * преобразователя данных
             * @field
             * @type Number
             */
            this.magicOutOfSweep = 32568;
        },

        /**
         * Рисует координатную сетку на соответствующем канвасе.
         *
         * @method drawGrid
         */
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

        /**
         * Визуализирует кадр переданных данных
         * в соответствии с внутренними настройками.
         *
         * @method drawFrame
         * @param {Array} data Масив данных для визуализации
         */
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
