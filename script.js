var jsonAnimation = {
	source:"spritesheet.png",
	animations : {
		"idle" : [new Rectangle(1323,6,51,63)],
		"walk" : [
			{ x:1944 ,y:6,width:48,height:63},
			{ x:2013 ,y:6,width:48,height:63}
//			{x:0,y:96,width:70,height:96}
		]
	}
};

window.onload = function(){	
	function keyDown(e){
		console.log("keydown",e.keyCode);
	}
	
    var Game = function(){
        this.core = new Core("gameCanvas", 800, 320, this);
		this.core.canvas.focus();
        
        
        textureManager.LoadImage("HALL", "hall.png");
        textureManager.LoadImage("BUBBLE", "bubble.png");
        textureManager.LoadImage("SPRITESHEET", "spritesheet.png");
        
		this.level = new Level();
		this.core.AddGameObject(this.level);
		
		this.heroe = new Heroe(this.level, this);
		this.core.AddGameObject(this.heroe);
		
//        this.heroe = core.AddSprite("alienGreen.png");
//		
//		this.heroe.position = {x:50,y:50};
	
		
    };
	
    Game.prototype.update = function(time){
//		console.log(KeyDown);
		
		
		
    };
    
    Game.prototype.draw = function(time){
        
    };
    
    
    
    var game = new Game();
};