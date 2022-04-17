"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConvexIrregular extends Polygon {
    constructor(radius, numVerticies, irregularity, startAngle) {
        if (!radius || !(Number.isInteger(radius)))
            throw new Error(`${radius} is not a valid Number`);
        if (!numVerticies || !(Number.isInteger(numVerticies)))
            throw new Error(`${numVerticies} is not a valid Number`);
        if (!irregularity)
            irregularity = 0;
        if (irregularity < 0 || irregularity > 1)
            throw new Error(`${irregularity} is not valid!`);
        let model = new Array();
        for (let i = 0; i < numVerticies; i++) {
            let angle = (360 / numVerticies) * i + (!startAngle ? 0 : startAngle % 360);
            model.push(Formeln.moveDirection(new Vector2(0, 0), angle, ConvexIrregular.noise(radius, irregularity, numVerticies)));
        }
        super(model);
    }
    render(ctx, pos) {
        super.render(ctx, pos);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, 360);
        ctx.fill();
        ctx.stroke();
    }
    static noise(value, noiseVaule, numVerticies) {
        let noiseChange = (noiseVaule * (Math.floor(Math.random() * value * 2) - value)) / (numVerticies / 2);
        return value + noiseChange;
    }
}
exports.default = ConvexIrregular;
