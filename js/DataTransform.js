/**
 * @fileOverview Файл содержит описание класса-преобразователя данных.
 *
 * @author <a href="mailto:microfed@gmail.com">Microfed</a>
 */

/**
 * @namespace Пакет визуализатора. Содержит основные классы для работы с даными
 * (получение, преобразование, отображение)
 * @name Visualize
 */

Visualize.DataTransform = atom.Class(
    /**
     @lends Visualize.DataTransform#
     */
    {
        /**
         * @class Класс, отвечающий за преобразование полученных от сервера
         * данных в приемлемый для визуализатора формат.
         *
         * Конструктор класса
         * @constructs
         * @param {Number} sweep Развертка осциллографа
         * @param {Number} countOfPoints Количество точек (пикселей) на канвасе
         */
        initialize:function (sweep, countOfPoints) {
            /**
             * Контексn Развертка осцилографа
             * @field sweep
             * @type Number
             */
            this.sweep = sweep;

            /**
             * Количество точек (пикселей) на канвасе
             * @field countOfPoints
             * @type Number
             */
            this.countOfPoints = countOfPoints;

            /**
             * Значение, которое характеризует выход за границы
             * развертки. Такое же значение установлено в классе
             * преобразователя данных
             * @field magicOutOfSweep
             * @type Number
             */
            this.magicOutOfSweep = 32568;
        },

        /**
         * Возвращает преобразованный массив данных.
         *
         * @method
         * @param {Array} array Массив данных для преобразования.
         * @param {Function} callback функция, которая будет вызвана после преобразования массива.
         */
        getFormattedData:function (array, callback) {
            var i, j = 0,
                step = 1,
                length = array.length,
                over = 0,
                overInt = 0,
                overMod = 0,
                maxCountOfPoints = 0,
                newArray = [],
                curElement = 0;

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
                over = this.countOfPoints / length;
                overInt = Math.floor(over);
                overMod = this.countOfPoints % length;
                maxCountOfPoints = this.countOfPoints - overMod;

                for (j = 0; j < overMod; j++) {
                    newArray.push(this.magicOutOfSweep);
                }

                for (j = overMod; j < maxCountOfPoints; j += overInt) {
                    if (j + overInt - 1 <= length) {
                        curElement = array[j / overInt];
                        if (curElement === this.magicOutOfSweep) {
                            curElement = this.sweep;
                        }
                        newArray.push(curElement);
                        for (i = 1; i < overInt; i += 1) {
                            curElement = array[j / overInt];
                            if (curElement === this.magicOutOfSweep) {
                                curElement = this.sweep;
                            }
                            newArray.push(curElement);

                            curElement = array[j / overInt + 1];
                            if (curElement === this.magicOutOfSweep) {
                                curElement = this.sweep;
                            }

                            newArray[i] += curElement;
                            newArray[i] /= overInt;
                        }
                    } else {
                        newArray.push(array[j / overInt]);
                        newArray.push((array[j / overInt] + array[j / overInt]) / overInt);
                    }
                }

                for (j = maxCountOfPoints; j < this.countOfPoints; j++) {
                    newArray.push(this.magicOutOfSweep);
                }

                callback(newArray);
            }

            for (i = 0; i < length / step; i += 1) {
                newArray[i] = array[i * step];
            }

            callback(newArray);
        },

        /**
         * Изменяет значение развертки.
         *
         * @method
         * @param newSweep Новое значение развертки.
         */
        changeSweep:function (newSweep) {
            this.sweep = newSweep;
        }
    });