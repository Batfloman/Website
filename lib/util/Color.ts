export class Color {
  static none = null;

  r: number = 0;
  g: number = 0;
  b: number = 0;

  static getRandom() {
    return new Color(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    );
  }

  static get(color: string): Color | undefined {
    if (colors.has(color)) {
      return colors.get(color);
    }
    console.warn(`${color} is not declared!`);
  }

  constructor(r: number, g: number, b: number) {
    this.r = r % 255;
    this.g = g % 255;
    this.b = b % 255;
  }

  /**
   * @returns {String} - a String "rgb(r, g, b)" with r/g/b values for rendering
   */
  getRGBString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  setR(r: number) {
    this.r = r % 255;
  }
  setG(g: number) {
    this.g = g % 255;
  }
  setB(b: number) {
    this.b = b % 255;
  }
}

const colors = new Map<string, Color>([
  ["red", new Color(255, 0, 0)],
  ["green", new Color(0, 255, 0)],
  ["blue", new Color(0, 0, 255)],
  ["black", new Color(0, 0, 0)],
  ["white", new Color(255, 255, 255)],
]);
