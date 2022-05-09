import Entity from './Entity.js';

export default class Player extends Entity{
    constructor({Canvas, Context, x, y, width, height, img, name, map}) {
        super({Canvas, Context, x, y, width, height, img});
        this.name = name || "Default Name"
        this.map = map
    }

    get nameOfPlayer(){
        return this.name
    }

    AssignMovementEvent(input, movement, speed = 0.1) { //assign input to movement
        document.addEventListener('keydown', (e) =>{
            var obj = this.map.get(this.name)
                if (e.key == input && movement == "up"){
                    if(this.y == 0 ) {
                        return
                    } else if(this.y < 0){
                        obj.y = 0
                    }
                    obj.y -= speed
                }
                if (e.key == input && movement == "down" ) {
                    if(this.y == this.Context.canvas.clientHeight-this.height) {
                        return
                    } else if(this.y > this.Context.canvas.clientHeight-this.height){
                        obj.y = this.Context.canvas.clientHeight-this.height
                        return
                    }   
                    obj.y += speed
                }
                if (e.key == input && movement == "right") {
                    if(this.x == this.Context.canvas.clientWidth-this.width ) {
                        return
                    }  else if(this.x > this.Context.canvas.clientWidth-this.width){
                        obj.y = this.Context.canvas.clientWidth-this.width
                        return
                    }  
                    obj.x += speed
                }
                if ( e.key == input && movement == "left") {
                    if(this.x == 0 ) {
                        return
                    } else if(this.x < 0){
                        obj.x = 0
                    }  
                    obj.x -= speed
                }
            this.map.set(obj.name, obj)
        }, true);
    }
}