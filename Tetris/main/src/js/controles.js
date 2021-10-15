document.onclick = onclick;
document.onmousemove = mousemove;
document.onwheel = mousewheel;

function mousemove(event) {
    let canvas = document.getElementById('game');
    if(event.path[0] != canvas) return;
    
    let mouseX = event.offsetX;
    let cellSize = canvas.width / WORLD_WIDTH;

    fieldX = Math.floor(mouseX / cellSize);

    setShapeX(fieldX);

    draw();
}

function onclick() {
    
}

function mousewheel(event){
    if(event.deltaY > 0) {
        //dir down
    } else if(event.deltaY < 0){
        //dir up
    }
}