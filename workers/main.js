window.onload = setUp();

function setUp() {
  if (typeof Worker !== "undefined") {
    const w = new Worker("./worker.js", { type: "module" });

    w.onmessage = function (e) {
      console.log("Message received from worker:", e.data);
    };

    for(let i = 0; i < 10; i++) {
      console.log("test" + i);
      w.postMessage("test" + i);
    }
  }
}
