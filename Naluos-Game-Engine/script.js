import Game from "./NaluosEngine/Game.js"
import map from "./map.js"

var MainGame = new Game({
    DivHtmlID: "#game-container",
    GameName: "MainGame",
    GameWidth: 1200,
    GameHeight: 600
}) //create game

MainGame.Start()

var Object = MainGame.NewEntity({
    name: "Objet",
    x: 50, y: 300,
    width: 100, height: 100,
    img: "./NaluosEngine/assets/img/block.png"
})

var Player1 = MainGame.NewPlayer({
    name: "Nagibator",
    x: 250,
    y: 60,
    width: 100,
    height: 100,
    img: "./NaluosEngine/assets/img/mario.jpg"
})

var Sky = MainGame.NewEntity({
    x:0,y:0,
    width:100,height:100, 
    img: "https://media.tarkett-image.com/large/TH_OMNISPORTS_SKY%20BLUE.jpg" 
})
    
var Grass = MainGame.NewEntity({
    x:0,y:0,
    width:100,height:100,
    img: "https://preview.redd.it/dblx5qhqm0l61.jpg?auto=webp&s=44e8c2c4cda0cd22578d322133f5dd77cb3440f7" 
})

var MapDefine = new Map([
    [0, Sky], 
    [1, Grass]
]) //define map properties

Player1.AssignMovementEvent("d", "right", 40)
Player1.AssignMovementEvent("q", "left", 40)
Player1.AssignMovementEvent("space", "jump", 40)

function animate(){  
    requestAnimationFrame(animate)
    MainGame.ClearCanvas()
    MainGame.Draw()
    MainGame.DrawMap(map, MapDefine)
    Player1.setGravity(true)
    Player1.setCollision(true)
}


animate()