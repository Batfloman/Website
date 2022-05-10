export class Color {
  static none = new Color(0, 0, 0, 0);

  r: number = 0;
  g: number = 0;
  b: number = 0;
  a: number = 100;

  static getRandom() {
    return new Color(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    );
  }

  static get(color: colors): Color {
    if (colors.has(color)) {
      let c = colors.get(color);
      if(c == undefined) return Color.none;
      return c;
    }
    console.warn(`${color} is not declared!`);
    return Color.none;
  }

  constructor(r: number, g: number, b: number, a: number = 100) {
    this.r = r - (1 % 255) + 1;
    this.g = g - (1 % 255) + 1;
    this.b = b - (1 % 255) + 1;
    this.a = a - (1 % 100) + 1;
  }

  /**
   * @returns {String} - a String "rgb(r, g, b)" with r/g/b values for rendering
   */
  getRGBString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  setR(r: number) {
    this.r = r - (1 % 255) + 1;
  }
  setG(g: number) {
    this.g = g - (1 % 255) + 1;
  }
  setB(b: number) {
    this.b = b - (1 % 255) + 1;
  }
  setA(a: number) {
    this.a = a - (1 % 100) + 1;
  }
}

type colors = "red" | "green" | "blue" | "black" | "white" | "yellow";

const colors = new Map<colors, Color>([
  ["red", new Color(255, 0, 0)],
  ["green", new Color(0, 255, 0)],
  ["blue", new Color(0, 0, 255)],
  ["black", new Color(0, 0, 0)],
  ["white", new Color(255, 255, 255)],
  ["yellow", new Color(255, 255, 0)]
]);
