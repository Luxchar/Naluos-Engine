import Entity from "./Entity.js";
export default class Player extends Entity{ //load entity with parameters
    constructor( {name, imagePath = "", x,y,width, height} ) {
        super(x,y,width,height);
        this.name = name
        this.imagePath = this.SetImgSprite(imagePath) 
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
    }
    
    SetImgSprite(imgPath = "") { //set sprite img
        var img = document.createElement('img');
        img.src = imgPath
        return img
    }

    AssignMovementEvent(input, movement, context, map, speed = 0.1) { //assign input to movement
        document.addEventListener('keydown', (e) =>{
            console.log(map)
            var obj = map
                if ((e.key == input || e.key == input) && movement == "up"){
                    if(this.y == 0 ) {
                        return
                    } else if(this.y < 0){
                        obj.y = 0
                    }
                    obj.y -= speed
                    context.clearRect(obj.x,obj.y+speed,obj.width,obj.height)
                }
                if ((e.key == input || e.key == input ) && movement == "down" ) {
                    if(this.y == context.canvas.clientHeight-this.height) {
                        return
                    } else if(this.y > context.canvas.clientHeight-this.height){
                        obj.y = context.canvas.clientHeight-this.height
                        return
                    }   
                    obj.y += speed
                    context.clearRect(obj.x,obj.y-speed,obj.width,obj.height)
                }
                if ((e.key == input || e.key == input) && movement == "right") {
                    if(this.x == context.canvas.clientWidth-this.width ) {
                        return
                    }  else if(this.x > context.canvas.clientWidth-this.width){
                        obj.y = context.canvas.clientWidth-this.width
                        return
                    }  
                    obj.x += speed
                    context.clearRect(obj.x-speed,obj.y,obj.width,obj.height)
                }
                if (( e.key == input || e.key == input) && movement == "left") {
                    if(this.x == 0 ) {
                        return
                    } else if(this.x < 0){
                        obj.x = 0
                    }  
                    obj.x -= speed
                    context.clearRect(obj.x+speed,obj.y,obj.width,obj.height)
                }
            context.globalCompositeOperation = "source-over";
            context.drawImage(obj.imagePath, obj.x,obj.y,obj.width,obj.height)
        }, true);
    } 
}