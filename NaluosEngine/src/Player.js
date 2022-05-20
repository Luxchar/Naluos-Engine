import Entity from './Entity.js';

export default class Player extends Entity{
    constructor({Canvas, Context, x, y, width, height, img, name, map, sounds, sprite = null}) {
        super({Canvas, Context, x, y, width, height, img, sprite});
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

    AssignMovementEvent({input, movement, speed = 0.1, animationImagePath = this.img.currentSrc, animationImagePathReversed, sound =  {soundName : null, volume : 0.5},frames ,speedAnimation}) { //assign input to movement
        var obj = this.map.get(this.name)
        document.addEventListener('keydown', (e) =>{
            if (e.key == input && movement == "up" ){ 
                this.velocity.y = -1 * speed, this.img = this.SetImgSprite(animationImagePath, frames, speedAnimation, movement)
            }
            if (e.key == input && movement == "down" ){ 
                this.velocity.y = 1*speed, this.img = this.SetImgSprite(animationImagePath, frames, speedAnimation, movement)
            }
            if (e.key == input && movement == "right"){ 
                this.velocity.x = 1*speed, this.keys.hasPressedRight = true, this.img = this.SetImgSprite(animationImagePath, frames, speedAnimation, movement)
            }
            if (e.key == input && movement == "left"){ 
                this.velocity.x = -1 * speed, this.keys.hasPressedLeft = true, this.img = this.SetImgSprite(animationImagePath, frames, speedAnimation, movement)
            }
            if (e.key == input && this.hasJumped && movement == "jump"){ 
                this.velocity.y -= 1 * speed, this.hasJumped = false
                if(this.keys.hasPressedLeft) this.img = this.SetImgSprite(animationImagePathReversed, frames, speedAnimation, movement)
                else this.img = this.SetImgSprite(animationImagePath, frames, speedAnimation, movement)  

                if(sound.soundName != null) {
                    var aud =  this.sounds.get(sound.soundName)
                    aud.volume = sound.volume
                    aud.play()
                   
                }
            }
        }, true);

        document.addEventListener('keyup', (e) =>{
            if (e.key == input && movement == "up" ) this.velocity.y = -15, this.img = this.SetImgSprite(animationImagePath, undefined, undefined, movement)
            if (e.key == input && movement == "down" ) this.velocity.y = 0, this.img = this.SetImgSprite(animationImagePath, undefined, undefined, movement)
            if (e.key == input && movement == "right") this.velocity.x = 0, this.keys.hasPressedRight = false, this.img = this.SetImgSprite(animationImagePath, undefined, undefined, movement)
            if (e.key == input && movement == "left") this.velocity.x = 0, this.keys.hasPressedLeft = false, this.img = this.SetImgSprite(animationImagePath, undefined, undefined, movement)
            if (e.key == " " && movement == "jump") this.velocity.y -= 0, this.img = this.SetImgSprite(animationImagePath, undefined, undefined, movement)
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
    
    updateMouvement(){
        this.x += this.velocity.x
        this.map.set(this.name, this)
    }
} 