export default class Color {

  static none = null;

   /** @type {number} - between 0 - 255 */
  r = 0;
   /** @type {number} - between 0 - 255*/
  g = 0;
   /** @type {number} - between 0 - 255*/
  b = 0;

  static getRandom() {
    return new Color(
      Math.floor(Math.random()*256),
      Math.floor(Math.random()*256),
      Math.floor(Math.random()*256),
    )
  }

  static get(name) {
    if(!Color.colors[name]) throw new Error(`${name} color not found!`);
    return Color.colors[name];
  }

  static colors = {
    "black": new Color(0, 0, 0),
    "white": new Color(255, 255, 255)
  }

  constructor(r, g, b) {
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

  setR(r) { this.r = r > 255 ? r % 255 : r;}
  setG(g) { this.g = g > 255 ? g % 255 : g;}
  setB(b) { this.b = b > 255 ? b % 255 : b;}
}