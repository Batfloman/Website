let snake_options = {
    'color': 'yellow',
    'startLength' : 4
}

let tickspeed = 325;
let worldsize = 11;

function setWorldSize(size){
    switch(size){
        case 'small':
            worldsize = 11;
            break;
        case 'medium': 
            worldsize = 15;
            break;
        case 'huge':
            worldsize = 23;
            break;
        default:
            worldsize = 11;
    }
}

function setTickSpeed(speed){
    switch(speed){
        case 'slow':
            tickspeed = 325;
            break;
        case 'normal': 
            tickspeed = 250;
            break;
        case 'fast':
            tickspeed = 175;
            break;
        default:
            tickspeed = 325;
    }
}