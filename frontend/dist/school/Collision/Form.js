"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Form extends Polygon {
    constructor(radius, numVerticies, startAngle) {
        if (!radius || !(Number.isInteger(radius)))
            throw new Error(`${radius} is not a valid Number`);
        if (!numVerticies || !(Number.isInteger(numVerticies)))
            throw new Error(`${numVerticies} is not a valid Number`);
        let model = new Array();
        for (let i = 0; i < numVerticies; i++) {
            let angle = (360 / numVerticies) * i + (!startAngle ? 0 : startAngle % 360);
            model.push(Formeln.moveDirection(new Vector2(0, 0), angle, radius));
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
}
exports.default = Form;
