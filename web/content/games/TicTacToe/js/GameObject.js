import { ControllableObject } from "../../../lib/assets/ControllableObject.js";
export default class GameObject extends ControllableObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
    }
    update(dt) {
        super.update(dt);
        console.log(dt);
    }
}
