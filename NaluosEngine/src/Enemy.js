import Entity from './Entity.js';

export default class Enemy extends Entity{ //load entity with parameters
    constructor({Canvas, Context, name, x = 0, y = 0, width = 800, height = 600, img = "Rectangle", sounds, sprite = null, map}) {
        super({Canvas, Context, x, y, width, height, img, sounds, sprite, map});
        
        this.isAEntity = false
        this.isMonster = true
        this.velocity = {
            gravity: 0.5,
            x: 0,
            y: 10,
        }
        this.movements = {
            countX: 0,
            incrementX: 1,
            countY: 0,
            incrementY: 1,
        }
        if(img === "Rectangle") this.img = img
        else this.img = this.SetImgSprite(img)
        if (this.sprite != null) this.hasSprite = true
        else this.hasSprite = false
        this.teleport(x, y)
    }

    setInfiniteMovementX({count}){
        if(this.movements.countX >= count) this.movements.incrementX = -1
        if(this.movements.countX <= -count) this.movements.incrementX = 1
        this.movements.countX += this.movements.incrementX
        this.x += this.movements.incrementX 
        this.map.set(this.name, this)
    }
    
    setInfiniteMovementY({count}){
        if(this.movements.countY >= count) this.movements.incrementY = -1
        if(this.movements.countY <= -count) this.movements.incrementY = 1
        this.movements.countY += this.movements.incrementY  
        this.y += this.movements.incrementY
        this.map.set(this.name, this)
    }
}