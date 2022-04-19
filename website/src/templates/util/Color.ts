export default class Color {

  static none = null;

  r: number = 0;
  g: number = 0;
  b: number = 0;

  static getRandom() {
    return new Color(
      Math.floor(Math.random()*256),
      Math.floor(Math.random()*256),
      Math.floor(Math.random()*256),
    )
  }

  constructor(r: number, g: number, b: number) {
    this.r = r > 255 ? r % 255 : r;
    this.g = g > 255 ? g % 255 : g;
    this.b = b > 255 ? b % 255 : b;
  }

  /**
   * @returns {String} - a String "rgb(r, g, b)" with r/g/b values for rendering
   */
  getRGBValue() {
    return  `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  setR(r: number) { this.r = r > 255 ? r % 255 : r;}
  setG(g: number) { this.g = g > 255 ? g % 255 : g;}
  setB(b: number) { this.b = b > 255 ? b % 255 : b;}
}