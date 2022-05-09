import Player from "./src/Player.js";
import Entity from "./src/Entity.js";

export default class Game{
    constructor({DivHtmlID = "#game-container", GameName = "Game Default Name", GameWidth = 800, GameHeight = 500}){
        this.Environment = document.querySelector(DivHtmlID)
        this.GameName = GameName
        this.GameWidth = GameWidth
        this.GameHeight = GameHeight
        this.Canvas = document.createElement('canvas')
        this.Context = this.Canvas.getContext('2d')
        this.Entities = new Map()
        this.Players = new Map()
    }

    get AllPlayers(){
        return this.Players
    }

    get AllEntities(){
        return this.Entities
    }


    Start(){
        this.Environment.appendChild(this.Canvas)
        this.Canvas.setAttribute('id','canvas')
        this.Canvas.width = this.GameWidth
        this.Canvas.height = this.GameHeight
    }

    Load(){
        return null
    }

    ClearCanvas(){
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    }

    NewPlayer({name, x, y, width, height, img}) {
        var p = this.#addPlayer({
            name, x, y, width, height, img
        })
        this.AllPlayers.set(p.nameOfPlayer, p)
        this.Entities.set(p.nameOfPlayer, p)
        return p
    }

    NewEntity({name, x, y, width, height, img}){
        var ent = this.#addEntity({
            name, x, y, width, height, img
        })
        this.Entities.set(ent.nameOfEntity, ent)
        return ent
    }  

    DrawMap(ArrayMap, DefineMap = {}) {
        var row = this.GameWidth / (ArrayMap[0].length)
        var column = this.GameHeight / (ArrayMap.length)
        for (var i = 0; i < ArrayMap.length; i++) {
            for (var j = 0; j < ArrayMap[i].length; j++) {
                this.Context.beginPath()
                this.Context.globalCompositeOperation='destination-over';
                var obj = DefineMap.get(ArrayMap[i][j])
                if(obj.img != "Rectangle") this.Context.drawImage(obj.img, j * row, i * column, row, column)
                else this.Context.rect(obj.img, j * row, i * column, row, column)
                this.Context.fillStyle = '#F00000'
            }
        }
    }

    Draw(){
        this.AllEntities.forEach(e => {
            this.Context.beginPath()
            if(e.isImage){
                this.Context.drawImage(e.img, e.x, e.y, e.width, e.height)
            } else {
                this.Context.rect(e.x, e.y, e.width, e.height)
            }
            this.Context.fill()
        });
    }

    #addPlayer({name,x,y, width, height, img}){
        return new Player({
            Canvas: this.Canvas,    
            Context: this.Context,
            x,
            y,
            name,
            width,
            height,
            img,
            map: this.Entities
        })
    }
    
    #addEntity({name,x,y, width, height, img}){
        return new Entity({
            Canvas: this.Canvas,    
            Context: this.Context,
            x,
            y,
            name,
            width,
            height,
            img
        })
    }
}