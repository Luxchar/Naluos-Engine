export default class Map { //load map with parameters (div id, name, width, height, assets to load)
    constructor(ArrayMap, DefineMap = {1: "./wall.png", 2: "./pacman.png", 3: "./enemy.png"}) {
        
    }

    loadImg(imgPath) { //load background img function
        this.img = new Image();
        this.img.src = imgPath;
    } 
}