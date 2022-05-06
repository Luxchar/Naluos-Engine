export default class Map { //load map with parameters (div id, name, width, height, assets to load)
    constructor(ArrayMap, DefineMap = {}, GameWidth = 800, GameHeight = 600) {
        row = ArrayMap[0].length / GameWidth
        console.log(row)
    }

    loadImg(imgPath) { //load background img function
        this.img = new Image();
        this.img.src = imgPath;
    } 

    setMapBg() {
        this.img = new Image();
                this.img.src = "./mario.jpg";
                this.img.onload = () => {
                this.ctx.drawImage(
                    this.img,
                    0,
                    0,
                    100,
                    100
            );
        };
    }
}