export default class Listener {
  obj;
  func;

  constructor(obj, func) {
    if(!obj) throw new Error(`${obj} is no valid Object`);
    if(!(func instanceof Function)) {
      console.log(obj)
      throw new Error(`${func} is no valid Function`);
    }
    
    this.obj = obj;
    this.func = func;
  }
}