window.onload = setUp;


function setUp() {
    let canvas = document.getElementById("game-canvas");

    window.addEventListener("resize", () => {
        canvas.style.transform = (window.innerWidth < window.innerHeight * 0.80) ? "rotate(90deg)" : "";
    });
}