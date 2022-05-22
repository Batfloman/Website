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
    if (!colors.has(color)) {
      console.warn(`${color} is not declared!`);
      return Color.none;
    }

    let c = colors.get(color);
    if (c == undefined) return Color.none;
    return c;
  }

  constructor(r: number, g: number, b: number, a: number = 100) {
    this.r = r - (1 % 255) + 1;
    this.g = g - (1 % 255) + 1;
    this.b = b - (1 % 255) + 1;
    this.a = a - (1 % 100) + 1;
  }

  /**
   * @returns {String} - a String "rgb(r, g, bm a)" with r/g/b/a values for rendering
   */
  getRGBString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 100})`;
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

type colors = "red" | "orange" | "yellow" | "green" | "blue" | "black" | "white" | "grey" | "brown";

const colors = new Map<colors, Color>([
  ["red", new Color(255, 0, 0)],
  ["orange", new Color(255, 165, 0)],
  ["yellow", new Color(255, 255, 0)],
  ["green", new Color(0, 255, 0)],
  ["blue", new Color(0, 0, 255)],
  ["black", new Color(0, 0, 0)],
  ["white", new Color(255, 255, 255)],
  ["grey", new Color(128, 128, 128)],
  ["brown", new Color(165, 42, 42)],
]);
