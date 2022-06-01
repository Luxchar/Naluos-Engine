import Player from "./src/Player.js";
import Entity from "./src/Entity.js";
import Enemy from "./src/Enemy.js";

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
        this.AnimationSpeed = 0 // speed of the sprite frame
        this.direction = ["right", "left", "up", "down"]
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

    updateEntities(){
        this.Entities.forEach(element => {
            element.update()
        });
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
        document.body.addEventListener("onload", function () {
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

    NewEnemy({name, x, y, width, height, img, sprite}){
        var ent = this.#addEnemy({
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
        this.AnimationSpeed++
        this.AllEntities.forEach(e => {
            this.Context.beginPath()
            if(e.isImage && !e.hasSprite){ // if the entity has an image and no sprite
                this.Context.drawImage(e.img, e.x, e.y, e.width, e.height)
            } else if (e.isImage && e.hasSprite) { // if the entity has an image and a sprite

                // console.log(e.animations.get("left")[0] || e.animations.get("right")[0] || e.animations.get("up")[0] || e.animations.get("down")[0])

                // if(this.frames == 2) this.frames = 0 // reset the frames
                if (this.AnimationSpeed == 8) this.AnimationSpeed = 0, this.frames++ // speed of the sprite frame

                if (e.animations.get("left")) {
                    if (this.frames >= e.animations.get("left")[1]) {
                        this.frames = e.animations.get("left")[0]
                    }
                } else if (e.animations.get("right")) {
                    if (this.frames >= e.animations.get("right")[1]) {
                        this.frames = e.animations.get("right")[0]
                    }
                } else if (e.animations.get("up")) {
                    if (this.frames >= e.animations.get("up")[1]) {
                        this.frames = e.animations.get("up")[0]
                    }
                } else if (e.animations.get("down")) {
                    if (this.frames >= e.animations.get("down")[1]) {
                        this.frames = e.animations.get("down")[0]
                    }
                }

                // draw the sprite
                
                if (e.animations.get("jump") != undefined && e.animations.get("right") != undefined) { this.Context.drawImage(e.img,(e.img.width/6)*4,10,100,150, e.x, e.y, e.width, e.height)
                } else if (e.animations.get("jump") != undefined && e.animations.get("left") != undefined) { this.Context.drawImage(e.img,(e.img.width/6)*4,20,100,150, e.x, e.y, e.width, e.height)
                } else if (e.animations.get("jump") != undefined) { this.Context.drawImage(e.img,(e.img.width/6)*4,10,100,150, e.x, e.y, e.width, e.height)
                } else if (e.animations.get("right") != undefined) { this.Context.drawImage(e.img,10+(e.img.width/6)*this.frames,10,100,150, e.x, e.y, e.width, e.height)
                } else if (e.animations.get("left") != undefined) { this.Context.drawImage(e.img,(e.img.width/6)*this.frames,10,100,150, e.x, e.y, e.width, e.height)
                } else if (e.animations.get("up") != undefined) { this.Context.drawImage(e.img,(e.img.width/6)*4,0,100,200, e.x, e.y, e.width, e.height)
                } else if (e.animations.get("down") != undefined) { this.Context.drawImage(e.img,10+(e.img.width/6)*5,0,100,150, e.x, e.y, e.width, e.height)
                } else this.Context.drawImage(e.img,(e.img.width/6)*5,10,100,150, e.x, e.y, e.width, e.height)

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
            sounds: this.Sounds,
            map: this.Entities,
        })
    }

    #addEnemy({name,x,y, width, height, img, sprite}){ // add entity to the game
        return new Enemy({
            Canvas: this.Canvas,    
            Context: this.Context,
            x,
            y,
            name,
            width,
            height,
            img,
            sounds: this.Sounds,
            map: this.Entities,
        })
    }

    resetAllEnemies(){
        this.Entities.forEach(element => {
            if(element.isMonster){
                element.teleport(element.save.x, element.save.y)
                element.movements = { countX: 0, incrementX: 1, countY: 0, incrementY: 1}
            }
        });
    }

    resetAllEntities(){
        this.Entities.forEach(element => {
            if(element.isAEntity){
                element.teleport(element.save.x, element.save.y)
            }
        });
    }
}