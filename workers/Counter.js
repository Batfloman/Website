export class Counter {
  number;
  
  constructor(){
    this.number = 0;
  }

  countUp() {
    this.number++;
  }

  countDown() {
    this.number--;
  }

  getNumber() {
    return this.number;
  }
}