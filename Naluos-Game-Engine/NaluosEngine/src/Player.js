import Entity from './Entity.js';

export default class Player extends Entity{
    constructor({Canvas, Context, x, y, width, height, img, name, map}) {
        super({Canvas, Context, x, y, width, height, img});
        this.name = name || "Default Name"
        this.map = map
        this.velocity = {
            gravity: 0.5,
            x: 0,
            y: 10,
        }
        this.isPressed = {up:false, down:false, right:false, left:false, jump:false}
    }

    get nameOfPlayer(){
        return this.name
    }

    get isEntity(){
        return false
    }

    AssignMovementEvent(input, movement, speed = 0.1) { //assign input to movement
        document.addEventListener('keydown', (e) =>{
            var obj = this.map.get(this.name)
            this.#isButtonPressed(obj  , e, input, movement)

            if (this.isPressed.jump) this.velocity.y -= 15
            if (this.isPressed.up) obj.y -= speed
            if (this.isPressed.down) obj.y += speed
            if (this.isPressed.right) obj.x += speed
            if (this.isPressed.left) obj.x -= speed

            this.map.set(obj.name, obj)
        }, true);
    }
    

    #isButtonPressed(obj, e, input, movement){
        if (e.key == input && movement == "up" ) this.isPressed.up = true, setTimeout(() => {this.isPressed.up = false}, 100)
        if (e.key == input && movement == "down" ) this.isPressed.down = true, setTimeout(() => {this.isPressed.down = false}, 100)
        if (e.key == input && movement == "right") this.isPressed.right = true, setTimeout(() => {this.isPressed.right = false}, 100)
        if (e.key == input && movement == "left") this.isPressed.left = true, setTimeout(() => {this.isPressed.left = false}, 100)
        if (e.key == " " && movement == "jump" && this.isPressed.jump == false) this.isPressed.jump = true, setTimeout(() => {this.isPressed.jump = false}, 500)
    }

    setGravity({bool = true}){
        if(bool){
            if (this.y + this.height + this.velocity.y <= this.Canvas.height-85 ) this.y += this.velocity.y, this.velocity.y += this.velocity.gravity
            else this.velocity.y = 0
        }
        this.map.set(this.name, this)
    }

    setCollision({bool = true}){
        if(bool){
            this.map.forEach(e => {
                if(e.isEntity){
                    if(this.y + this.height <= e.y && this.y + this.height + this.velocity.y >= e.y && this.x + this.width >= e.x && this.x <= e.x + e.width) this.velocity.y = 0
                }
            });
        }
    }
}