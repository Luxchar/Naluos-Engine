export default class Entity{ //load entity with parameters
    constructor({x = 0, y = 0, width = 0, height = 0}, img = "") {
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
        if(img != "")  this.img = this.SetImgSprite(img)
    }
    InitEntityPosition(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    InnerEntitySize(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }

    SetImgSprite(imgPath = "") { //set sprite img
        var img = document.createElement('img');
        img.src = imgPath
        return img
    }
}