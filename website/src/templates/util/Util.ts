export default class Util {
  static getItem<T>(arr: T[], index: number): T {
    if (index < 0) index = arr.length - 1;

    return arr[index % arr.length]
  }

  static randomBetween(start: number, end: number, afterDot?: number): number {
    return Math.round(((Math.random() * (end - start)) + start) * Math.pow(10, afterDot == undefined ? 2 : afterDot)) / Math.pow(10, afterDot == undefined ? 2 : afterDot)
  }
}