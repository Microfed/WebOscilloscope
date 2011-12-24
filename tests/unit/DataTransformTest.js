/**
 * Created by JetBrains WebStorm.
 * User: Microfed
 * Date: 24.12.11
 * Time: 8:53
 * To change this template use File | Settings | File Templates.
 */

AsyncTestCase('DataTransformTest', {
    testShouldTransformDataCorrectly:function (queue) {
        expectAsserts(3);
        var dataTransform = new Visualize.DataTransform(10, 10);
        var array = [1, 2, 3, 4, 5, 11, 6, 7, 8, 9, 10];
        var secondArray = [1, 2, 3, 4, 5, 11, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        var thirdArray = [1, 2, 3, 4, 5];
        queue.call("test transform (sweep): ", function (callbacks) {
            var assertResult = callbacks.add(function (arr) {
                assertEquals(32568, arr[5]);
            });

            dataTransform.getFormattedData(array, assertResult);
        });

        queue.call("test transform (points >): ", function (callbacks) {
            var assertResult = callbacks.add(function (arr) {
                assertEquals(10, arr.length);
            });

            dataTransform.getFormattedData(secondArray, assertResult);
        });

        queue.call("test transform (points <): ", function (callbacks) {
            var assertResult = callbacks.add(function (arr) {
                assertEquals(10, arr.length);
            });

            dataTransform.getFormattedData(thirdArray, assertResult);
        });
    }
});
