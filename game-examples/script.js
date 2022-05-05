import Game from "../engine/Game.js";
import Player from "../engine/Player.js";

var MainGame = new Game("#game-container","MainGame",800,800) //create game
MainGame.start(); // start game

var PacmanMap = [[0,0,0,1,0,0,0,0], [0,0,1,3,1,0,0,0] [0,0,0,0,0,2,0,0], [0,0,0,0,0,0,0,0]] //map pacman
var PacmanMapDefine = {0: "wall", 1: "empty", 2: "enemy", 3: "player"} //define map properties

var player = new Player({name:"pacman",x:0,y:0,width:100,height:100}) //create player
player.SetImgSprite("./pacman.png") // set player sprite

MainGame.add(player) //add player to game
player.AssignMovementEvent(MainGame.ctx, MainGame.objects.get(player.name), 20 ) // add movement event to player