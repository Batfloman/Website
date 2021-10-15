const Shapes = [
    block = {
        'tiles': [[0,0], [-1,0], [0, -1], [-1, -1]],
        'blockstyle': {
            'color': 'rgb(255, 255, 55)',
            'previewColor': 'rgb(255, 255 , 200)'
        }
    },
    t_shape = {
        'tiles': [[0,0], [0, -1], [-1,-1], [1,-1]],
        'blockstyle': {
            'color': 'rgb(255, 55, 255)',
            'previewColor': 'rgb(255, 200 , 255)'
        }
    },
    z_shape = {
        'tiles': [[0,0], [1,0], [0,-1], [-1,-1]],
        'blockstyle': {
            'color': 'rgb(255, 55, 55)',
            'previewColor': 'rgb(255, 200, 200)'
        }
    },
    z_reverse = {
        'tiles': [[0,0], [-1,0], [0,-1], [1,-1]],
        'blockstyle': {
            'color': 'rgb(55, 255, 55)',
            'previewColor': 'rgb(200, 255, 200)'
        }
    },
    stick = {
        'tiles': [[0,0], [0,-1], [0,1], [0,2]],
        'blockstyle': {
            'color': 'rgb(55, 255, 255)',
            'previewColor': 'rgb(200, 255 , 255)'
        }
    },    
    l_shape = {
        'tiles': [[0,0], [-1, 0], [1, 0], [1, -1]],
        'blockstyle': {
            'color': 'rgb(255, 150, 55)',
            'previewColor': 'rgb(255, 200, 150)'
        },
    },    
    l_reverse = {
        'tiles': [[0,0], [-1, 0], [1, 0], [-1 , -1]],
        'blockstyle': {
            'color': 'rgb(55, 55, 255)',
            'previewColor': 'rgb(200, 200, 255)'
        }
    }
];

let currentShape = {
    'blockPositions': [],
    'facing': 'up',
    'blockstyle': {
        'color': '',
        'previewColor': ''
    },
    'number': ''
};

function createShape() {
    getRandomShape();
    spawnShape();
}

function getRandomShape() {
    let random = Math.floor( Math.random() * Shapes.length);
    currentShape.blockPositions = [];
    for(let i = 0; i < Shapes[random].tiles.length; i++){
        let x,y;
        x = Shapes[random].tiles[i][0] + WORLD_WIDTH / 2;
        y = Shapes[random].tiles[i][1] + 1;
        currentShape.blockPositions.push([x,y]);
    }
    currentShape.facing = 'up';
    currentShape.blockstyle.color = Shapes[random].blockstyle.color;
    currentShape.blockstyle.previewColor = Shapes[random].blockstyle.previewColor;
    currentShape.number = random + 1;
}

function spawnShape() {
    for(let i = 0; i < currentShape.blockPositions.length; i++){
        let x,y;
        x = currentShape.blockPositions[i][0];
        y = currentShape.blockPositions[i][1];
        
        if(world[y][x] == 0){
            world[y][x] = currentShape.number;
            currentShape.blockPositions[i][0] = x;
            currentShape.blockPositions[i][1] = y;
        } else {
            stop();
            setTimeout(setUp, 1000);
            return;
        }
    }
}

function moveDown() {
    removeShape();
    if(testMoveDown()){
        for(let i = 0; i < currentShape.blockPositions.length; i++){
            let x,y;
            x = currentShape.blockPositions[i][0];
            y = currentShape.blockPositions[i][1];
            y++;
            currentShape.blockPositions[i][1] = y;
        }
    } else {
        placeShape();
    }
    addShape();
}

function testMoveDown() {
    for(let i = 0; i < currentShape.blockPositions.length; i++){
        let x,y;
        x = currentShape.blockPositions[i][0];
        y = currentShape.blockPositions[i][1];
        y++;
        if(y == WORLD_HEIGHT || world[y][x] != 0){
           return false; 
        }
    }
    return true;
}

function removeShape() {
    for( let i = 0; i < currentShape.blockPositions.length; i++){
        let x,y;
        x = currentShape.blockPositions[i][0];
        y = currentShape.blockPositions[i][1];

        world[y][x] = 0;
    }
}

function addShape() {
    for( let i = 0; i < currentShape.blockPositions.length; i++){
        let x,y;
        x = currentShape.blockPositions[i][0];
        y = currentShape.blockPositions[i][1];

        world[y][x] = currentShape.number;
    }
}

function placeShape() {
    addShape();
    checkFinishedLine();
    createShape();
}

function setShapeX(newX) {
    removeShape();
    if(newX < 0){
        newX = 0;
    } else if(newX > WORLD_WIDTH-1){
        newX = WORLD_WIDTH-1;
    }
    let oldX = currentShape.blockPositions[0][0];
    let xdifference = newX - oldX;

    while(!testXDifference(xdifference)){
        if(xdifference < 0){
            xdifference++;
        } else if(xdifference > 0){
            xdifference--;
        } else{
            return;
        }
    }

    for(let i = 0; i < currentShape.blockPositions.length; i++){
        let x,y;
        x = currentShape.blockPositions[i][0];
        y = currentShape.blockPositions[i][1];
        world[y][x] = 0;
        
        x += xdifference;

        world[y][x] = currentShape.number;
        currentShape.blockPositions[i][0] = x;

    }
    addShape();

    draw();
}

function testXDifference(xdifference) {
    for(let i = 0; i < currentShape.blockPositions.length; i++){
        let x,y;
        x = currentShape.blockPositions[i][0];
        y = currentShape.blockPositions[i][1];
        x += xdifference;
        if(x < 0 || x == WORLD_WIDTH || world[y][x] != 0){
           return false; 
        }
    }
    return true;
}