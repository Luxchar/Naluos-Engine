import Entity from './Entity.js';

export default class Player extends Entity{
    constructor({Canvas, Context, x, y, width, height, img, name, map, sounds}) {
        super({Canvas, Context, x, y, width, height, img});
        this.saveImg = img
        this.sounds = sounds
        this.name = name || "Default Name"
        this.map = map
        this.velocity = {
            gravity: 0.5,
            x: 0,
            y: 10,
        }
        this.keys = {
            hasJumped: false,
            hasPressedRight: false,
            hasPressedLeft: false,
            hasPressedUp: false,
            hasPressedDown: false,
        }
        this.score = 0
    }

    get nameOfPlayer(){
        return this.name
    }

    get isEntity(){
        return false
    }

    AssignMovementEvent({input, movement, speed = 0.1, animationImagePath = this.img.currentSrc, sound =  {soundName : null, volume : 0.5}}) { //assign input to movement
        var obj = this.map.get(this.name)
        document.addEventListener('keydown', (e) =>{
            if (e.key == input && movement == "up" ){ 
                this.velocity.y = -1 * speed, this.img = this.SetImgSprite(animationImagePath)
            }
            if (e.key == input && movement == "down" ){ 
                this.velocity.y = 1*speed, this.img = this.SetImgSprite(animationImagePath)
            }
            if (e.key == input && movement == "right"){ 
                this.velocity.x = 1*speed, this.keys.hasPressedRight = true, this.img = this.SetImgSprite(animationImagePath)
            }
            if (e.key == input && movement == "left"){ 
                this.velocity.x = -1 * speed, this.keys.hasPressedLeft = true, this.img = this.SetImgSprite(animationImagePath)
            }
            if (e.key == input && this.hasJumped && movement == "jump"){ 
                this.velocity.y -= 1 * speed, this.hasJumped = false
                this.img = this.SetImgSprite(animationImagePath)
                if(sound.soundName != null) {
                    var aud =  this.sounds.get(sound.soundName)
                    aud.volume = sound.volume
                    aud.play()
                   
                }
            }
            if(this.velocity.x == 0 && this.velocity.y == 0){ 
                this.img = this.SetImgSprite(this.saveImg)
            }
        }, true);

        document.addEventListener('keyup', (e) =>{
            if (e.key == input && movement == "up" ) this.velocity.y = -15
            if (e.key == input && movement == "down" ) this.velocity.y = 0
            if (e.key == input && movement == "right") this.velocity.x = 0, this.keys.hasPressedRight = false
            if (e.key == input && movement == "left") this.velocity.x = 0, this.keys.hasPressedLeft = false
            if (e.key == " " && movement == "jump") this.velocity.y -= 0
            this.img = this.SetImgSprite(this.saveImg)
        }, true);

        this.map.set(obj.name, obj)
    }

    setFocus(){
        if(this.x > 400 && this.keys.hasPressedRight){
            this.map.forEach((e) => {
                if(e.isEntity){
                    e.x -= this.velocity.x
                    this.map.set(e.name, e)
                    this.x = 400
                    this.map.set(this.name, this)
                }
            })
        }
        if(this.x < 200 && this.keys.hasPressedLeft){
            this.map.forEach((e) => {
                if(e.isEntity){
                    e.x -= this.velocity.x
                    this.x = 200
                    this.map.set(e.name, e)
                    this.map.set(this.name, this)
                }
            })
        }
    }

    setGravity({bool = true}){
        if(bool){
            if (this.y + this.height + this.velocity.y <= this.Canvas.height*2) this.y += this.velocity.y, this.velocity.y += this.velocity.gravity
        }
        this.map.set(this.name, this)
    }

    
    updateMouvement(){
        this.x += this.velocity.x
        this.map.set(this.name, this)
    }

    setCollision({bool = true, position = { top : { break : false, collision : true }, right: { break: false, collision: true} ,buttom : { break: false, collision: true }, left: {break: false, collision: true}} }){
        if(bool){
            this.map.forEach(e => {
                if(e.isEntity){
                    if(position.top.collision){
                        if(this.y + this.height >= e.y + e.height && this.y + this.velocity.y <= e.y + e.height && this.x + this.width >= e.x && this.x <= e.x + e.width){
                            this.velocity.y = 0,  this.hasJumped = false
                            console.log('je suis un fils de piute (léo)')
                            if(position.top.break) this.map.delete(e.name)
                        }     
                    }
                    if(position.buttom.collision){
                        if(this.y + this.height <= e.y && this.y + this.height + this.velocity.y >= e.y && this.x + this.width >= e.x && this.x <= e.x + e.width) {
                            this.velocity.y = 0, this.hasJumped = true
                        }
                    }
                    if(position.right.collision){ // collision with right side of the entity
                        if(this.x >= e.x && this.x - this.velocity.x*2 <= e.x && this.y + this.height >= e.y && this.y <= e.y + e.height){
                            this.velocity.x = 0, this.velocity.y = 0
                            this.x = e.x - this.width
                            this.map.set(this.name, this)
                            console.log("collision with left side of the entity")

                        }
                    }

                    if(position.left.collision){ // collision with left side of the entity
                        if(this.x <= e.x + e.width && this.x + this.velocity.x*2 >= e.x + e.width && this.y + this.height >= e.y && this.y <= e.y + e.height){
                            console.log("collision with right side of the entity")
                            this.velocity.x = 0, this.x = e.x+e.width
                            this.map.set(this.name, this)
                        }
                    }
                }
            });
        }
    }
} 