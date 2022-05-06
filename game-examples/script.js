import Game from "../engine/Game.js";
import Player from "../engine/Player.js";
import Entity from "../engine/Entity.js";
import PacmanMap from "./map.js";

var MainGame = new Game({
    DivHtmlID: "#game-container",
    GameName: "MainGame",
    GameWidth: 1200,
    GameHeight: 600
}) //create game

MainGame.start(); // start game

var PacMap = PacmanMap

var Block = new Entity({x:0,y:0,width:100,height:100}, "./block.png")
var Sky = new Entity({x:0,y:0,width:100,height:100}, "./sky.png")
var PacMapDefine = new Map([
    [0, Sky], 
    [1, Block], 
    [2, Block], 
    [3, Block]
]) //define map properties

var player = new Player({name:"pacman",imagePath:"./pacman.png",x:0,y:0,width:100,height:100}) //create player
MainGame.add(player, true) //add player to 

var playerMvt = [["z", "up"],["d", "right"], ["q", "left"], ["s", "down"], ["ArrowUp", "up"], ["ArrowRight", "right"], ["ArrowLeft", "left"], ["ArrowDown", "down"]] //define player mvt
for (var i = 0; i < playerMvt.length; i++) {
    player.AssignMovementEvent(playerMvt[i][0], playerMvt[i][1], MainGame.ctx, MainGame.objects.get(player.name), 20) // add movement event to player
}
//add map to game
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

while(true){
    MainGame.setMap(PacMap, PacMapDefine);
    await sleep(10)
}