import Game from "./NaluosEngine/Game.js"

var MainGame = new Game({
    DivHtmlID: "#game-container",
    GameName: "MainGame",
    GameWidth: 1200,
    GameHeight: 600
}) //create game

MainGame.Start()

var Object = MainGame.NewEntity({
    name: "Objet",
    x: 0, y: 0,
    width: 100, height: 100,
    img: "./NaluosEngine/assets/img/mario.jpg"
})

var Player1 = MainGame.NewPlayer({
    name: "Nagibator",
    x: 50,
    y: 60,
    width: 100,
    height: 100
})

Player1.AssignMovementEvent("d", "right", 20)
Player1.AssignMovementEvent("q", "left", 20)
Player1.AssignMovementEvent("z", "up", 20)
Player1.AssignMovementEvent("s", "down", 20)

function animate(){  
    requestAnimationFrame(animate)

    console.log()
    console.log(MainGame.AllEntities.get("Nagibator"))
    MainGame.ClearCanvas()
    MainGame.Draw()
}

animate()