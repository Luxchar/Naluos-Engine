import Game from "../../NaluosEngine/Game.js"
import map from "./map.js"

var MainGame = new Game({ //create game
    DivHtmlID: "#game-container",
    GameName: "MainGame",
    GameWidth: 1200,
    GameHeight: 600
}) //create game

MainGame.Start()


for (let index = 1; index <= 3; index++) {
    MainGame.NewEntity({
        name: "Objet" + index,
        x: index*60, y: 300,
        width: 60, height: 60,
        img: "./assets/img/block.png"
    })
}

for (let index = 7; index <= 11; index++) {
    MainGame.NewEntity({
        name: "Objet" + index,
        x: index*60, y: 300,
        width: 60, height: 60,
        img: "./assets/img/block.png"
    })
}

for (let index = 3; index <= 7; index++) {
    MainGame.NewEntity({
        name: "Objet" + index+10,
        x: index*60, y: 100,
        width: 60, height: 60,
        img: "./assets/img/block.png"
    })
}

var Player1 = MainGame.NewPlayer({ // create player
    name: "Nagibator",
    x: 250,
    y: 60,
    width: 60,
    height: 60,
    img: "assets/img/mario.jpg"
})

Player1.AssignMovementEvent({
    input: "d", movement:"right", speed: 5, 
    animationImagePath: "https://preview.redd.it/dblx5qhqm0l61.jpg?auto=webp&s=44e8c2c4cda0cd22578d322133f5dd77cb3440f7",
})

Player1.AssignMovementEvent({
    input: "q", movement: "left", speed: 5, 
    animationImagePath: "./assets/img/block.png"})
Player1.AssignMovementEvent({
    input: " ", movement: "jump", speed: 9, 
    animationImagePath: "./assets/img/mario.jpg", sound: {soundName: "JumpSound", volume: 0.2}
})

// var Player2 = MainGame.NewPlayer({
//     name: "Léonator",
//     x: 50,
//     y: 10,
//     width: 100,
//     height: 100,
//     img: "../../NaluosEngine/assets/img/mario.jpg"
// })

// Player2.AssignMovementEvent("ArrowRight", "right", 5)
// Player2.AssignMovementEvent("ArrowLeft", "left", 5)
// Player2.AssignMovementEvent("ArrowUp", "jump", 9)

var Sky = MainGame.NewEntity({ // import sky model
    x:0,y:0,
    width:100,height:100, 
    img: "https://media.tarkett-image.com/large/TH_OMNISPORTS_SKY%20BLUE.jpg" 
})

for (let i = 0; i <= 100; i++) {
    MainGame.NewEntity({
        name: i*100,
        x: i*100,y:MainGame.Canvas.height-100,
        width:100,height:100,
        img: "https://preview.redd.it/dblx5qhqm0l61.jpg?auto=webp&s=44e8c2c4cda0cd22578d322133f5dd77cb3440f7" 
    }) 
}

var MapDefine = new Map([ // define map properties
    [0, Sky], 
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
    volume: 0.005
})


console.log(Player1.sounds)

function animate(){ // animate game
    requestAnimationFrame(animate)
    MainGame.ClearCanvas()
    MainGame.Draw()
    Player1.updateMouvement()
    //Player2.updateMouvement()
    MainGame.DrawMap(map, MapDefine)
    Player1.setFocus()
    Player1.setGravity(true)
    Player1.setCollision(true)
    if(Player1.y >= MainGame.Canvas.height + 100){
        if(MainGame.Entities.get(Player1.name) === "undefined") Player1
        console.log(MainGame.Entities.get(Player1.name))
    }
    // Player2.setGravity(true), Player2.setCollision(true)
}

animate()