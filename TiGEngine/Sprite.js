var Sprite = function(image_src, ctx){
    this.ctx = ctx;
    this.isLoaded = false;
    
    this.image = new Image();
    this.image.src = image_src;
    
    var instance = this;
    this.image.onload = function(){
        instance.isLoaded = true
    };
    
};

Sprite.prototype.update = function(){
};

Sprite.prototype.draw = function(ctx){
    if (this.isLoaded) {
        console.log('drawSprite');
        this.ctx.
        this.ctx.drawImage(this.image, 50,50);
    }
};

