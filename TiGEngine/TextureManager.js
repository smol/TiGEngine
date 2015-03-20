var TextureManager = function(){
    this.textures = {};
};

TextureManager.prototype.GetImage = function(key, callback){
    var image = this.textures[key];
    
    if (image.isLoaded)
        callback && callback();
    image.onload = function(){
        console.log('onload', this);
        this.isLoaded = true;
        callback();
    };
    return image
};

TextureManager.prototype.LoadImage = function(key, src){
    var image = new Image();
    image.src = src
    image.isLoaded = false
    image.onload = function(){
        this.isLoaded = true
    };
    
    this.textures[key] = image;
};

var textureManager = new TextureManager();