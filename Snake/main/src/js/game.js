//game

function start(){
    gameInterval = setInterval(tick, tickspeed);
}

function stop(){
    clearInterval(gameInterval);
    setTimeout(setUp, 3000);
}

function tick(){
    move();
    draw();
    lastDirection = direction;
}

//snake

function input(event){
    if(!gameRunning){
        start();
        gameRunning = true;
    }
    let key = event.key;                        
    switch(key){
        case 'w':
            if(lastDirection != 'd'){
                direction = 'u';
            }
            break;
        case 'a':
            if(lastDirection != 'r'){ 
                direction = 'l';
            }
            break;
        case 's':
            if(lastDirection != 'u'){
                direction = 'd';
            }
            break;
        case 'd':
            if(lastDirection != 'l'){
                direction = 'r';
            }
            break;
    }
}

function createSnake(){
    let startingPos_X = snake_options.startLength + Math.floor(worldsize / 11.5);
    let startingPos_Y = Math.floor(worldsize / 2);

    for(let i = 0; i < snake_options.startLength; i++){
        let startingPosition = []
        startingPosition.push(startingPos_X - i);
        startingPosition.push(startingPos_Y);

        world[startingPos_Y][startingPos_X - i] = 1;
        snake.push(startingPosition);
    }
}

function move(){
    let snakeHeadPosition = Array.from(snake[0]);
    let x, y;

    switch(direction){
        case 'u':
            x = snakeHeadPosition[0];
            y = --snakeHeadPosition[1];
            break;
        case 'l':
            x = --snakeHeadPosition[0];
            y = snakeHeadPosition[1]
            break;
        case 'r':
            x = ++snakeHeadPosition[0];
            y = snakeHeadPosition[1]
            break;
        case 'd':
            x = snakeHeadPosition[0];
            y = ++snakeHeadPosition[1]
            break;
    }
    if(x < 0 || x == worldsize || y < 0 || y == worldsize){
        killSnake();
    } else{
        if(world[y][x] === 0){
            
            momentOfShock = true;
            let lastPiece = snake.pop();
            world[lastPiece[1]][lastPiece[0]] = 0;
            snake.unshift([x, y]);
            world[y][x] = 1;
        } else if( world[y][x] === 2){
            collectFruit(x, y);
        } else{
            killSnake();
        }
    }
}

function killSnake(){
    if(momentOfShock){
        momentOfShock = false;
        return;
    } else{
        stop();
        snake_options.color = 'red';
        draw();
    }
}

//Level Up Fruit 

function createFruit(){
    let x,y;
    do{
        x = Math.floor( Math.random()*worldsize);
        y = Math.floor( Math.random()*worldsize);
    } while( world[y][x] != 0);
     
    world[y][x] = 2;
    fruits.push([x, y]);
}

function collectFruit(x, y){
    world[y][x] = 0;
    fruits.pop();
    createFruit();

    addSnakePiece(x, y);
}

function addSnakePiece(x, y){
    momentOfShock = true;
    snake.unshift([x, y]);
    world[y][x] = 1;
}