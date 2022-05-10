export default class Entity{ //load entity with parameters
    constructor({Canvas, Context, name, x = 0, y = 0, width = 800, height = 600, img = "Rectangle"}) {
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
        this.InitEnvironment(Canvas, Context)
        this.name = name || "Default Entity"
        if(img === "Rectangle") this.img = img
        else this.img = this.SetImgSprite(img)
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

    SetImgSprite(imgPath) { //set sprite img
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