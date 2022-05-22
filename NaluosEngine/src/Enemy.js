import Entity from './Entity.js';

export default class Enemy extends Entity{ //load entity with parameters
    constructor({Canvas, Context, name, x = 0, y = 0, width = 800, height = 600, img = "Rectangle", sounds, sprite = null, map}) {
        super({Canvas, Context, x, y, width, height, img, sounds, sprite, map});
        this.velocity = {
            gravity: 0.5,
            x: 0,
            y: 10,
        }
        this.isAEntity = false
        this.isMonster = true
        this.movements = {
            x: 0,
            y: 0,
        }
        if(img === "Rectangle") this.img = img
        else this.img = this.SetImgSprite(img)
        if (this.sprite != null) this.hasSprite = true
        else this.hasSprite = false
    }

    setInfiteMovement({x1, x2, y1, y2}){
        this.movements.x = x2-x1
        console.log(this.movements.x)
    }
}