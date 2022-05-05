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

    AssignMovementEvent(input, speed = 0.1) { //assign input to movement
        document.getElementById('canvas').addEventListener(input, () => {
            console.log("listener")
            key = input.key;
            console.log(key)
            if (key == "ArrowUp") this.y += 10*speed;
            if (key == "ArrowDown") this.y -= 10*speed;
            if (key == "ArrowLeft") this.x -= 10*speed;
            if (key == "ArrowRight") this.y += 10*speed;
            if (key == "Z") this.y += 10*speed;
            if (key == "S") this.y -= 10*speed;
            if (key == "Q") this.x -= 10*speed;
            if (key == "D") this.y += 10*speed;
        });
    } 
}