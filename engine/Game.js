export default class Game { //load map with parameters (div id, name, width, height, assets to load)
    constructor({DivHtmlID = "#game-container", GameName = "Game Default Name", GameWidth = 800, GameHeight = 600}){
        this.Environment = document.querySelector(DivHtmlID)
        this.GameName = GameName
        this.GameWidth = GameWidth
        this.GameHeight = GameHeight
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.objects = new Map()
    }

    start(){ 
        this.Environment.appendChild(this.canvas)
        this.canvas.setAttribute('id','canvas')
        this.canvas.width = this.GameWidth
        this.canvas.height = this.GameHeight
    }

    add(EntityObject, bool = false){ //add object to game
        if(bool == true){
        this.img = new Image();
        this.img.src = "./pacman.png";
        }
        this.img.onload = () => {
            this.ctx.drawImage(this.img , 0, 0,EntityObject.width, EntityObject.height);
            };
        this.objects.set(EntityObject.name, EntityObject)
    } 

    setMap(ArrayMap, DefineMap = {}){
        var row = this.GameWidth / (ArrayMap[0].length)
        var column = this.GameHeight / (ArrayMap.length)
        for (var i = 0; i < ArrayMap.length; i++) {
            for (var j = 0; j < ArrayMap[i].length; j++) {
                this.ctx.fillRect(j * row, i * column, row, column)
                this.ctx.fillStyle = "#F00000"
            }
        }
    }
}

/*

this.img = new Image();
        this.img.src = "./pacman.png";
        this.img.onload = () => {
        this.ctx.drawImage(
            this.img,
            0,
            0,
            100,
            100
        );
        };


*/