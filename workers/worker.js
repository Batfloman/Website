import { Counter } from "./Counter.js";

// preload dependencies
// <link rel="modulepreload" href="worker.js">

var counter;

onmessage = function(e) {
  
  console.log(e.data);
  
  this.postMessage(count())
}

function count() {
  let num = 0;
  for(let i = 0; i < 1000000000; i++) {
    num += i;
  }
  return num;
}