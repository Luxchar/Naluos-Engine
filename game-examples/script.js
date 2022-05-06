import Game from "../engine/Game.js";
import Player from "../engine/Player.js";


var MainGame = new Game("#game-container","MainGame",800,800) //create game
MainGame.start(); // start game

var PacmanMap = new Array([0,0,0,1,0,0,0,0], [0,0,1,3,1,0,0,0] ,[0,0,0,0,0,2,0,0], [0,0,0,0,0,0,0,0]) //map pacman
var PacmanMapDefine = {0: 'ok.png', 1: "./empty.png", 2: "./enemy.png", 3: "./player.png"} //define map properties

var player = new Player({name:"pacman",imagePath:"./pacman.png",x:0,y:0,width:100,height:100}) //create player

MainGame.setMap(PacmanMap, PacmanMapDefine);

MainGame.add(player, true) //add player to 

var playerMvt = [["z", "up"],["d", "right"], ["q", "left"], ["s", "down"], ["ArrowUp", "up"], ["ArrowRight", "right"], ["ArrowLeft", "left"], ["ArrowDown", "down"]] //define player mvt
for (var i = 0; i < playerMvt.length; i++) {
    player.AssignMovementEvent(playerMvt[i][0], playerMvt[i][1], MainGame.ctx, MainGame.objects.get(player.name), 20) // add movement event to player
}
//add map to game