import Entity from './Entity.js';

export default class Enemy extends Entity{ //load entity with parameters
    constructor({Canvas, Context, name, x = 0, y = 0, width = 800, height = 600, img = "Rectangle", sounds, sprite = null, map}) {
        this.sounds = sounds
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
        this.InitEnvironment(Canvas, Context)
        this.sprite = sprite
        this.name = name || "Default Entity"
        this.animations = new Map()
        this.map = map
        this.velocity = {
            gravity: 0.5,
            x: 0,
            y: 10,
        }
        this.isAEntity = true
        this.isMonster = false
        if(img === "Rectangle") this.img = img
        else this.img = this.SetImgSprite(img)
        if (this.sprite != null) this.hasSprite = true
        else this.hasSprite = false
    }
}