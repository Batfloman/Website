import { Brain } from "../brain/Brain.js";
export default interface IIntelligent {
    brains: Map<string, Brain>;
}
