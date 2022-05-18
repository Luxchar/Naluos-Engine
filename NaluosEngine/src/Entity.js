export default class Entity{ //load entity with parameters
    constructor({Canvas, Context, name, x = 0, y = 0, width = 800, height = 600, img = "Rectangle", sounds, sprite = null}) {
        this.sounds = sounds
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
        this.InitEnvironment(Canvas, Context)
        this.sprite = sprite
        this.name = name || "Default Entity"
        this.animations = new Map()
        if(img === "Rectangle") this.img = img
        else this.img = this.SetImgSprite(img)
        if (this.sprite != null) this.hasSprite = true
        else this.hasSprite = false
    }
    InitEntityPosition(x = 0, y = 0) {
        this.x = x; 
        this.y = y;
    }

    InnerEntitySize(width, height) {
        this.width = width;
        this.height = height;
    }

    InitEnvironment(canvas, context){
        this.Canvas = canvas
        this.Context = context
    }

    SetImgSprite(imgPath, framesAnimation, speedAnimation, direction) { //set sprite img
        this.animations.set(direction, framesAnimation, speedAnimation)

        var img = document.createElement('img');
        img.src = imgPath
        return img
    }

    get nameOfEntity(){
        return this.name
    }

    get isEntity(){
        return true
    }

    get isImage(){
        if(this.img === "Rectangle") return false
        return true
    }
}