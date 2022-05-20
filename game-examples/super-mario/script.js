import Game from "../../NaluosEngine/Game.js"
import map from "./map.js"

var MainGame = new Game({ //create game
    DivHtmlID: "#game-container",
    GameName: "MainGame",
    GameWidth: window.innerWidth-10,
    GameHeight: window.innerHeight-25
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

Player1.AssignMovementEvent({
    input: "d", movement:"right", speed: 6, 
    animationImagePath: "assets/img/mario-movement.png"
    ,frames: [0,2],speedAnimation: 8
})
Player1.AssignMovementEvent({
    input: "q", movement: "left", speed: 6, 
    animationImagePath: "assets/img/mario-movement-reversed.png",frames: [4,6],speedAnimation: 8})
Player1.AssignMovementEvent({
    input: " ", movement: "jump", speed: 15, 
    animationImagePath: "assets/img/mario-movement.png", animationImagePathReversed: "assets/img/mario-movement-reversed.png",  frames: [0,2],speedAnimation: 8,
    sound: {soundName: "JumpSound", volume: 0.2}
})


var Sky = MainGame.NewEntity({ // import sky model
    x:0,y:0,
    width:100,height:100, 
    img: "https://media.tarkett-image.com/large/TH_OMNISPORTS_SKY%20BLUE.jpg" 
})

var MapDefine = new Map([ // define map properties
    [0, Sky]
]) //define map properties

MainGame.addSound({ // import sound
    name: "ThemeSound",
    PathOrUrl: "assets/sounds/theme_music.mp3",
})

MainGame.addSound({ // import sound
    name: "JumpSound",
    PathOrUrl: "assets/sounds/mario_jump.mp3",
})

MainGame.addSound({ // import sound
    name: "DeathSound",
    PathOrUrl: "assets/sounds/mario_falling.mp3",
})

MainGame.playSoundOf({ // play sound
    name: "ThemeSound",
    volume: 0.05
})


var Monster = MainGame.NewEntity({ // add goomba
    name: "Goomba",
    x:250,y:200,
    width:100,height:100, 
    img: "./assets/img/goomba_sprite.jpg" 
})
Monster.isAEntity = false
MainGame.NewEntity({ // add piece
    x:50,y:800,
    width:100,height:100, 
    img: "./assets/img/piece.png" 
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
        MainGame.ClearCanvas() // clear canvas to show next frame
        MainGame.Draw() // draw sprites of the entities
        Monster.setGravity(true)
        Player1.updateMouvement()
        MainGame.DrawMap(map, MapDefine)
        Player1.setFocus()
        Player1.setGravity(true)
        Player1.setCollision(true)
        Monster.setCollision(true)
        if(Player1.y >= MainGame.Canvas.height + 100){
            stopAnimate(handleGame)
            if(MainGame.Entities.get(Player1.name)) MainGame.Entities.delete(Player1.name) && MainGame.playSoundOf({name: "DeathSound", volume: 0.2, loop: false})
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
            x: 1600+index*60, y: MainGame.Canvas.height - 300,
            width: 60, height: 60,
            img: "./assets/img/block_interrogation_mark.jpg",
        })
    } else {    
        MainGame.NewEntity({
            name: "Objet" + index,
            x: 1600+index*60, y: MainGame.Canvas.height - 300,
            width: 60, height: 60,
            img: "./assets/img/block.png"
        })
    }
}

for (let i = 0; i <= 125; i++) { //ground
    if((i >= 18 && i <= 21) || (i >= 37 && i <= 40) || (i >= 75 && i <= 78) ){

    } else {
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
            img: "https://media.tarkett-image.com/large/TH_OMNISPORTS_SKY%20BLUE.jpg" 
        })}


animate()
