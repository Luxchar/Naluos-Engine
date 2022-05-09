import Game from "../../old-engine/Game.js";
import Player from "../../old-engine/Player.js.js";
import Entity from "../../old-engine/Entity.js.js";
import PacmanMap from "./map.js";

var MainGame = new Game({
    DivHtmlID: "#game-container",
    GameName: "MainGame",
    GameWidth: 1200,
    GameHeight: 600
}) //create game

MainGame.start(); // start game

var PacMap = PacmanMap

var Block = new Entity({x:0,y:0,width:100,height:100}, "./assets/img/block.png")
var Sky = new Entity({x:0,y:0,width:100,height:100}, "./assets/img/sky.png")
var Grass = new Entity({x:0,y:0,width:100,height:100}, "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/5cde149a93033d9.png")
var TopSky = new Entity({x:0,y:0,width:100,height:100}, "")
var PacMapDefine = new Map([
    [0, Sky], 
    [1, Block], 
    [2, TopSky], 
    [3, Grass]
]) //define map properties

var player = new Player({name:"pacman",imagePath:"./assets/img/mario.jpg",x:0,y:0,width:100,height:100}) //create player
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