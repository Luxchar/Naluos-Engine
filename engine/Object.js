export default class Entity{ //load map with parameters (div id, name, width, height, assets to load)
    constructor(imgPath = "", x = 0, y = 0, width = 0, height = 0) {
        this.loading(imgPath);
    }

    loadImg(imgPath) { //load background img function
        this.img = new Image();
        this.img.src = imgPath;
    } 

    InitObjectPosition(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}