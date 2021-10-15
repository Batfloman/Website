export default class Player {
  static var playercount;

  {
    playercount++;
  }

  constructor() {
    this(`player{playercount}`)
  }

  constructor(name, color, ) {
    this.name = name;
    this.color = color;
  }

  getName() {
    return this.name;
  }

  getColor() {
    return this.color;
  }
}
