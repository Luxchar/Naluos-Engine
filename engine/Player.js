import Entity from "./Entity.js";

export default class Player extends Entity{ //load entity with parameters
    constructor( {name,x,y,width, height} ) {
        super(x,y,width,height);
        this.name = name
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
    }
    
    SetImgSprite(imgPath = "") { //set sprite img
        this.img = new Image();
        this.img.src = imgPath;
    }

    AssignMovementEvent(context, map, speed = 0.1) { //assign input to movement
        console.log(context)
        document.addEventListener('keydown', (e) =>{
            console.log(e.key)
            console.log(e.keyCode)
            var obj = map
                if ( e.key == 'z' || e.key == 'ArrowUp'){
                    if(this.y == 0 ) {
                        return
                    } else if(this.y < 0){
                        obj.y = 0
                    }
                    obj.y -= speed
                    context.clearRect(obj.x,obj.y+speed,obj.width,obj.height)
                }
                if (e.key == 's' || e.key == "ArrowDown") {
                    if(this.y == context.canvas.clientHeight-this.height) {
                        return
                    } else if(this.y > context.canvas.clientHeight-this.height){
                        obj.y = context.canvas.clientHeight-this.height
                        return
                    }   
                    obj.y += speed
                    context.clearRect(obj.x,obj.y-speed,obj.width,obj.height)
                }
                if (e.key == "d" || e.key == "ArrowRight") {
                    if(this.x == context.canvas.clientWidth-this.width ) {
                        return
                    }  else if(this.x > context.canvas.clientWidth-this.width){
                        obj.y = context.canvas.clientWidth-this.width
                        return
                    }  
                    obj.x += speed
                    context.clearRect(obj.x-speed,obj.y,obj.width,obj.height)
                }
                if ( e.key == "q" || e.key == "ArrowLeft"){
                    if(this.x == 0 ) {
                        return
                    } else if(this.x < 0){
                        obj.x = 0
                    }  
                    obj.x -= speed
                    context.clearRect(obj.x+speed,obj.y,obj.width,obj.height)
                }
            context.fillRect(obj.x,obj.y,obj.width,obj.height)
        }, true);
        requestAnimationFrame(this.AssignMovementEvent)
    } 
}