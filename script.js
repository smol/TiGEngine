window.onload = function(){
    
    var Game = function(){
        var core = new Core("gameCanvas", 640, 480, this);
        core.FPS = 2;
        
        this.heroe = core.AddSprite("alienGreen.png");
    };
    
    Game.prototype.update = function(time){
        
    };
    
    Game.prototype.draw = function(time){
        
    };
    
    new Game();
    
    
};