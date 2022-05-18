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
        this.Objects = new Map()
        this.Sounds = new Map()
        this.isRunning = false
        this.frames = 1
        this.countframes = 0 // speed of the sprite frame
    }

    get AllPlayers(){
        return this.Players
    }

    get AllEntities(){
        return this.Entities
    }

    DeleteAllEntities(){
        return this.Entities.clear()
    }

    DeleteAllPlayers(){
        return this.Players.clear()
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

    async addSound({name, PathOrUrl}){
        await this.Sounds.set(name, new Audio(PathOrUrl) )
    }

    getSound(name){
        return this.Sounds.get(name)    
    }

    playSoundOf({name, speed = 1 , volume = 1, loop = true}){
        document.addEventListener("keypress", () =>{
            var aud = this.Sounds.get(name)
            aud.playbackRate = speed
            aud.loop = loop
            aud.volume = volume
            aud.play()
        })
    }
    
    async playSound(name) {
        document.body.addEventListener("mousemove", function () {
            return this.Sounds.get(name)
        })
    }

    NewPlayer({name, x, y, width, height, img, sprite}) {
        var p = this.#addPlayer({
            name, x, y, width, height, img, sprite
        })
        this.AllPlayers.set(p.nameOfPlayer, p)
        this.Entities.set(p.nameOfPlayer, p)
        return p
    }

    NewEntity({name, x, y, width, height, img, sprite}){
        var ent = this.#addEntity({
            name, x, y, width, height, img, sprite
        })
        this.Entities.set(ent.nameOfEntity, ent)
        this.Objects.set(ent.nameOfEntity, ent)
        return ent
    }  

    DrawMap(ArrayMap, DefineMap = {}) {
        if (ArrayMap[0].length > 0){
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
    }

    Draw(){ 
        this.countframes++
        this.AllEntities.forEach(e => {
            this.Context.beginPath()
            if(e.isImage && !e.hasSprite){
                this.Context.drawImage(e.img, e.x, e.y, e.width, e.height)
            } else if (e.isImage && e.hasSprite && this.countframes == 10) { //change speed of the animation with this.countframes
                if(this.frames == 2) this.frames = 0
                console.log(e.framesAnimation, e.speedanimation )
                this.Context.drawImage(e.img,10+(e.img.width/6)*this.frames,0,100,150, e.x, e.y, e.width, e.height) 
                this.frames++
                this.countframes = 0
            } else if (e.isImage && e.hasSprite) {
                this.Context.drawImage(e.img,(e.img.width/6)*this.frames,0,100,150, e.x, e.y, e.width, e.height)
            } else {
                this.Context.rect(e.x, e.y, e.width, e.height)
            }
            this.Context.fill()
        });
    }

    #addPlayer({name,x,y, width, height, img, sprite}){ // add player to the game
        return new Player({
            Canvas: this.Canvas,    
            Context: this.Context,
            x,
            y,
            name,
            width,
            height,
            img,
            map: this.Entities,
            sounds: this.Sounds,
            sprite: sprite,
        })
    }
    
    #addEntity({name,x,y, width, height, img, sprite}){ // add entity to the game
        return new Entity({
            Canvas: this.Canvas,    
            Context: this.Context,
            x,
            y,
            name,
            width,
            height,
            img,
            sounds: this.Sounds
        })
    }
}