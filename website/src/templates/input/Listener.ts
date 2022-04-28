export default class Listener {
  obj: Object;
  func: Function;

  constructor(obj: Object, func: Function) {
    this.obj = obj;
    this.func = func;
  }
}