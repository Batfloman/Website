export default class Options {
    // start Settings
        // game
        static framesPerS = 60;
        static maxEntities = 1000;

        //suns
        static spawnPerS = 10;
        static rotationsPerM = 10;
        static initialSunSize = 25;
        static addedSunSize = 5;
    
        //drone
        static droneSpeedPerS = 100;

    // chcange during Runtime
    static mouseOffSetX = 0;
    static mouseOffSetY = 0;
    static canvasWidth = 0;
    static canvasHeight = 0;
    
    // Values used in calculations
    static gameSpeed = 1000 / this.framesPerS;
    static spawnSpeed = 1000 / this.spawnPerS;
    static rotationsPerS = this.rotationsPerM / 60; 
    static rotationsSpeed = 360 * this.rotationsPerS;
}