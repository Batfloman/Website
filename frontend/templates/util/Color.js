export default class Color {
  r = 0;
  g = 0;
  b = 0;

  constructor(r, g, b) {
    this.r = r > 255 ? r % 255 : r;
    this.g = g > 255 ? g % 255 : g;
    this.b = b > 255 ? b % 255 : b;
  }

  getRGBValue() {
    return  `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  setR(r) { this.r = r > 255 ? r % 255 : r;}
  setG(g) { this.g = g > 255 ? g % 255 : g;}
  setB(b) { this.b = b > 255 ? b % 255 : b;}
}