import Color from "../../util/Color";

export default class LineStyle {
  borderColor: Color | string;
  fillColor: Color | string;
  lineWidth: number;

  constructor(borderColor: Color | string, fillColor: Color | string, lineWidth: number) {
    this.borderColor = borderColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
  }
}