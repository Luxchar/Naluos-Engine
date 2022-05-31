import Game from "../../NaluosEngine/Game.js"
import Entity from "../../NaluosEngine/src/Entity.js"
import Player from "../../NaluosEngine/src/Player.js"
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
    input: "d", movement:"right", speed: 8, 
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

var Void = MainGame.NewEntity({ // create void
    x:0,y:0,
    width:100,height:100,
    img: "assets/img/black.png"
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


var Monster = MainGame.NewEnemy({ // add goomba
    name: "Goomba",
    x:900,y:101,
    width:40,height:40, 
    img: "./assets/img/goomba.png" 
})

var Monster2 = MainGame.NewEnemy({ // add goomba
    name: "Goomba2",
    x:1500,y:101,
    width:40,height:40, 
    img: "./assets/img/goomba.png" 
})

var arrMonster = [Monster]

// MainGame.NewEntity({ // add piece
//     name: "Piece",
//     x:700,y:101,
//     width:40,height:40, 
//     img: "./assets/img/piece.png"
// })

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

Player1.LevelOfGravity(0.4)
function animate(){ // animate game
    if (isRunning) {
        var handleGame = window.requestAnimationFrame(animate)
        MainGame.ClearCanvas() // clear canvas to show next frame
        MainGame.Draw() // draw sprites of the entities
        MainGame.updateEntities()
        MainGame.DrawMap(map, MapDefine)

        Player1.updateMouvement()
        Player1.setFocus()
        Player1.setGravity(true)
        Player1.setCollision(true)

        for (var i = 0; i < arrMonster.length; i++) {
            console.log(arrMonster[i].x)
            arrMonster[i].setCollision(true)
            arrMonster[i].setInfiniteMovementX({count: 100})
        }

        // Monster2.setCollision(true)
        // Monster2.setInfiniteMovementX({count: 100})

        //lose game
        if(Player1.y >= MainGame.Canvas.height + 100){
            MapDefine = new Map([ // define map properties
            [0, Sky]
        ])
            MainGame.playSoundOf({name: "DeathSound", volume: 0.2, loop: false})
            Player1.teleport(0,200)
        }
        if (timer == 0) { // if timer is 0, stop game
            MainGame.playSoundOf({name: "DeathSound", volume: 0.2, loop: false})
            stopAnimate(handleGame)
        }
        if(Monster.checkCollisionTop({object: Player1})) MainGame.playSoundOf({name: "DeathSound", volume: 0.2, loop: false}) && Monster.delete(), score+=10, document.getElementById("score").innerHTML = score
        if (Player1.x>=Monster.x-40 && Player1.x<=Monster.x+Monster.width && Math.floor(Player1.y)>=Monster.y-20 && Math.floor(Player1.y)<=Monster.y+Monster.height-20) { // if collision with goomba
            MapDefine = new Map([ // define map properties
            [0, Sky]
        ])
            Player1.teleport(0,200)
            MainGame.playSoundOf({name: "DeathSound", volume: 0.2, loop: false})
        }
        if (Player1.x >= endflag.x-100 && Player1.x <= endflag.x+100) { // if collision with endflag
            MapDefine = new Map([ // define map properties
                [0, Void]
            ])
            Player1.teleport(9500,200)
        }
        if (Player1.x >= endflag2.x-100 && Player1.x <= endflag2.x+100) { // if collision with endflag2 
            stopAnimate(handleGame)
            score+= timer
            timer = 0
            postscore()
            getscore()
            alert("You Win! Your score is " + score)
        }
        document.getElementById("game-container").style.opacity = "1" 
    } else {
        document.getElementById("game-container").style.opacity = "0.5"
    }
}

var timer = 1;
var score = 0;
function startTimer(duration) {
    var display = document.querySelector('#time');
    timer = duration;
    setInterval(function () {
        var seconds = parseInt(timer, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    startTimer(60 * 6-1);
    // Player1.teleport(6200,200)
};

function getscore() {
    fetch("http://127.0.0.1:8080/scoreGET").then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
      });
}

async function postscore() {
    console.log(username, score)
    let data = {Username: username, Score: score};

    fetch("http://127.0.0.1:8080/scorePOST", {
      method: "POST",
      body: JSON.stringify(data)
    });
} 

function stopAnimate(h){
    window.cancelAnimationFrame(h)
}

//ENTITIES DEFINING

for (let index = 1; index <= 120; index++) {
    if ((index == 2) || (index == 61)){
        MainGame.NewEntity({
            name: "Objet" + index,
            x: 1600+index*60, y: MainGame.Canvas.height - 300,
            width: 60, height: 60,
            img: "./assets/img/block_interrogation_mark.jpg"
        })
    } 
    if ((index == 3) || (index == 1) || (index == 60) || (index == 62)){ {    
        MainGame.NewEntity({
            name: "Objet" + index,
            x: 1600+index*60, y: MainGame.Canvas.height - 300,
            width: 60, height: 60,
            img: "./assets/img/block.png"
        })
    }
}
}


for (let i = 0; i <= 250; i++) { //ground
    if((i >= 18 && i <= 21) || (i >= 37 && i <= 40) || (i >= 75 && i <= 78) || (i>125 && i<156)){

    } else {
        if (i>155) {
            MainGame.NewEntity({
                name: i*60,
                x: i*60, y: MainGame.Canvas.height - 60,
                width: 60, height: 60,
                img: "./assets/img/under-block.png"
            })
        } else {
        MainGame.NewEntity({
            name: i*60,
            x: i*60,y:MainGame.Canvas.height-60,
            width:60,height:60,
            img: "https://preview.redd.it/dblx5qhqm0l61.jpg?auto=webp&s=44e8c2c4cda0cd22578d322133f5dd77cb3440f7" 
        }) 
    }
    }
}

for (let i=0; i<=5; i++){
    for (let j=0; j<i; j++){
        MainGame.NewEntity({
            name: i*61*j,
            x: 100+i*60,y:MainGame.Canvas.height-j*60-60,
            width:60,height:60,
            img: "./assets/img/block.png" 
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

for (let i = 1; i <= 20; i++) { //wall start
    MainGame.NewEntity({
        name: 'block2'+i,
        x: 60*156,y:MainGame.Canvas.height-(60*i),
        width:60,height:60,
        img: "./assets/img/black.png" 
    })}

for (let i = 0; i <= 125; i++) { //ground
    if((i == 12) || (i == 122) || (i == 52) || (i==68)){
        MainGame.NewEntity({
            name: 'cloud'+i*60, 
            x: i*60,y:MainGame.Canvas.height-650,
            width:100,height:100,
            img: "assets/img/cloud.png"
        })
    }
    if ((i == 28) || (i == 98) || (i == 52) || (i==79)){
        MainGame.NewEntity({
            name: 'cloud'+i*60,
            x: i*60,y:MainGame.Canvas.height-800,
            width:100,height:100,
            img: "assets/img/cloud.png" 
        }) 
    }
    if ((i == 38) || (i == 98) || (i == 52) || (i==79)){
        MainGame.NewEntity({
            name: 'cloud'+i*60,
            x: i*60,y:MainGame.Canvas.height-725,
            width:100,height:100,
            img: "assets/img/cloud.png" 
        }) 
    }

}

var endflag = MainGame.NewEntity({
    name: "endflag",
    x: 6800,y:MainGame.Canvas.height-650,
    width: 125, height: 600,
    img: "./assets/img/endflag.jpeg"
})


var endflag2 = MainGame.NewEntity({
    name: "endflag2",
    x: 15000,y:MainGame.Canvas.height-650,
    width: 125, height: 600,
    img: "./assets/img/endflag.jpeg"
})

MainGame.NewEntity({
    name: "peach",
    x: 7150,y:MainGame.Canvas.height-175,
    width: 100, height: 125,
    img: "./assets/img/peach.jpeg"
})


animate()
