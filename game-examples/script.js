import Game from "../engine/Game.js";
// import Entity from "../engine/Entity.js";
import Player from "../engine/Player.js";

var Test = new Game("#game-container","Test")
Test.start();
// var test2 = new Entity({x:0,y:0,width:100,height:100})
// Test.add(test2)
var player = new Player({name:"mario",x:0,y:0,width:100,height:100})
Test.add(player)
Test.addEvent(player, 10)
console.log(Test.GameName)