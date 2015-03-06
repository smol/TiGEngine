var Core = function(id_canvas, width, height, game){
    this.game = game;
    this.sprites = [];
    this.FPS = 1;
    this.width = width;
    this.height = height;
    
    this.canvas = document.getElementById(id_canvas);
    
    this.canvas.setAttribute("style", "background-color:red");
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
    
    this.context2d = this.canvas.getContext("2d");
    
    this.update();
    this.draw();
    
};

Core.prototype.update = function(){
    var instance = this;
    
    instance.game.update && instance.game.update();
    setTimeout(function(){
        instance.update();
    },0.16);
};

Core.prototype.draw = function(){
    
    var instance = this;
    
    instance.context2d.clearRect(0,0, this.width, this.height);
    
    for (var i = 0; i < instance.sprites.length; i++){
        instance.sprites[i].draw();
    }
    
    instance.game.draw && instance.game.draw();
    
    setTimeout(function(){
        instance.draw();
    },1000 / instance.FPS);
};

Core.prototype.AddSprite = function(sprite_name){

    var sprite = new Sprite(sprite_name, this.context2d);
    
    this.sprites.push(sprite);
    return sprite;

};