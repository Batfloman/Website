import Input from "./Input";

export default interface IMouseListener {
    input: Input;
    
    mouseInput(event: Event): void;
}