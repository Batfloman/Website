export default class Util {
    static getItem(arr, index) {
        if (index < 0)
            index = arr.length - 1;
        return arr[index % arr.length];
    }
    static randomBetween(start, end, afterDot) {
        return Math.round(((Math.random() * (end - start)) + start) * Math.pow(10, afterDot == undefined ? 2 : afterDot)) / Math.pow(10, afterDot == undefined ? 2 : afterDot);
    }
}
