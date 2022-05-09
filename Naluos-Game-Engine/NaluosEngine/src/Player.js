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
        var obj = this.map.get(this.name)
        document.addEventListener('keyup', (e) =>{
            if (e.key == input && movement == "up" ) this.velocity.y = -15
            if (e.key == input && movement == "down" ) this.velocity.y = 0
            if (e.key == input && movement == "right") this.velocity.x = 0
            if (e.key == input && movement == "left") this.velocity.x = 0
            if (e.key == " " && movement == "jump") this.velocity.y -= 0
        }, true);

        document.addEventListener('keydown', (e) =>{
            if (e.key == input && movement == "up" ) this.velocity.y = -15
            if (e.key == input && movement == "down" ) this.velocity.y = 10
            if (e.key == input && movement == "right") this.velocity.x = 10
            if (e.key == input && movement == "left") this.velocity.x = -10
            if (e.key == " " && movement == "jump") this.velocity.y -= 15

            /*if (this.isPressed.jump) this.velocity.y -= 15
            if (this.isPressed.up) obj.y -= speed
            if (this.isPressed.down) obj.y += speed
            if (this.isPressed.right) obj.x += speed
            if (this.isPressed.left) obj.x -= speed*/

        }, true);

        this.map.set(obj.name, obj)
    }

    setGravity({bool = true}){
        if(bool){
            if (this.y + this.height + this.velocity.y <= this.Canvas.height-85 ) this.y += this.velocity.y, this.velocity.y += this.velocity.gravity
            else this.velocity.y = 0
        }
        this.map.set(this.name, this)
    }

    updateMouvement(){
        this.x += this.velocity.x
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