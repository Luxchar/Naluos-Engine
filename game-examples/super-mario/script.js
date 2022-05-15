import Game from "../../NaluosEngine/Game.js"
import map from "./map.js"

var MainGame = new Game({ //create game
    DivHtmlID: "#game-container",
    GameName: "MainGame",
    GameWidth: window.innerWidth-10,
    GameHeight: window.innerHeight-40
})

MainGame.Start()

var Player1 = MainGame.NewPlayer({ // create player
    name: "Nagibator",
    x: 250,
    y: 60,
    width: 60,
    height: 60,
    img: "assets/img/mario-movement.png",
    sprite: "ok"
})

console.log(Player1.hasSprite)

Player1.AssignMovementEvent({
    input: "d", movement:"right", speed: 6, 
    animationImagePath: "https://preview.redd.it/dblx5qhqm0l61.jpg?auto=webp&s=44e8c2c4cda0cd22578d322133f5dd77cb3440f7",
})

Player1.AssignMovementEvent({
    input: "q", movement: "left", speed: 6, 
    animationImagePath: "./assets/img/block.png"})
Player1.AssignMovementEvent({
    input: " ", movement: "jump", speed: 15, 
    animationImagePath: "./assets/img/mario.jpg",
})


var Sky = MainGame.NewEntity({ // import sky model
    x:0,y:0,
    width:100,height:100, 
    img: "https://media.tarkett-image.com/large/TH_OMNISPORTS_SKY%20BLUE.jpg" 
})

var Grass = MainGame.NewEntity({
    x: 0, y: MainGame.Canvas.height + 100,
    width: 60, height: 60,
    img: "https://preview.redd.it/dblx5qhqm0l61.jpg?auto=webp&s=44e8c2c4cda0cd22578d322133f5dd77cb3440f7",
})

var MapDefine = new Map([ // define map properties
    [0, Sky], 
    [1, Grass]
]) //define map properties

MainGame.addSound({ // import sound
    name: "ThemeSound",
    PathOrUrl: "assets/sounds/theme_music.mp3",
})

MainGame.addSound({ // import sound
    name: "JumpSound",
    PathOrUrl: "assets/sounds/jump.mp3",
})

MainGame.playSoundOf({ // play sound
    name: "ThemeSound",
    volume: 0.0005
})

var isRunning = true 
document.addEventListener('keydown', function(event){ //pause game
    if(event.key === "Escape"){
        if (isRunning) {
            isRunning = false
        } else {
            isRunning = true
            animate()
        }
    }
});
function animate(){ // animate game
    if (isRunning) {
        var handleGame = window.requestAnimationFrame(animate)
        MainGame.ClearCanvas()
        MainGame.Draw()
        Player1.updateMouvement()
        //Player2.updateMouvement()
        MainGame.DrawMap(map, MapDefine)
        Player1.setFocus()
        Player1.setGravity(true)
        Player1.setCollision(true)
        if(Player1.y >= MainGame.Canvas.height + 100){
            alert("T'es une merde")
            stopAnimate(handleGame)
            if(MainGame.Entities.get(Player1.name)) MainGame.Entities.delete(Player1.name)
        }
    } else {
        console.log('paused game menu')
    }

}

function stopAnimate(h){
    window.cancelAnimationFrame(h)
}

//ENTITIES DEFINING

for (let index = 1; index <= 3; index++) {
    if (index == 2){
        MainGame.NewEntity({
            name: "Objet" + index,
            x: 100+index*60, y: MainGame.Canvas.height - 300,
            width: 60, height: 60,
            img: "./assets/img/block_interrogation_mark.jpg",
        })
    } else {    
        MainGame.NewEntity({
            name: "Objet" + index,
            x: 100+index*60, y: MainGame.Canvas.height - 300,
            width: 60, height: 60,
            img: "./assets/img/block.png"
        })
    }
}

for (let i = 0; i <= 150; i++) { //ground
    if((i >= 0 && i <= 12) || (i >= 18 && i <= 15) || (i >= 16 && i <= 50)){
        MainGame.NewEntity({
            name: i*60,
            x: i*60,y:MainGame.Canvas.height-60,
            width:60,height:60,
            img: "https://preview.redd.it/dblx5qhqm0l61.jpg?auto=webp&s=44e8c2c4cda0cd22578d322133f5dd77cb3440f7" 
        }) 
    } 
}

for (let i = 1; i <= 20; i++) { //wall start
        MainGame.NewEntity({
            name: 'block'+i,
            x: 0,y:MainGame.Canvas.height-(60*i),
            width:60,height:60,
            img: "./assets/img/block.png" 
        })}


animate()
