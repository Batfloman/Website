"use strict";
window.onresize = resize;
function resize() {
    let c = document.getElementById("game-screen");
    if (c == null | undefined)
        return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}
