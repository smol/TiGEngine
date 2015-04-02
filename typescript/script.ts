var jsonAnimation = {
	source:"spritesheet.png",
	animations : {
		"idle" : [new Rectangle({x:1323,y:6,width:51,height:63})],
		"walk" : [
			{ x:1944 ,y:6,width:48,height:63},
			{ x:2013 ,y:6,width:48,height:63}
//			{x:0,y:96,width:70,height:96}
		]
	}
};

window.onload = function(){
    var Game = function(){
        this.core = new Core("gameCanvas", 800, 460, this);
		this.core.canvas.focus();


		TextureManager.LoadImage("HALL", "assets/hall.png");
		TextureManager.LoadImage("BUBBLE", "assets/bubble_2.png");
		TextureManager.LoadImage("SPRITESHEET", "assets/spritesheet.png");

		this.level = new Level();
		this.core.AddGameObject(this.level);

		this.heroe = new Heroe(this.level, this);
		this.core.AddGameObject(this.heroe);
    };

    Game.prototype.update = function(){

    };

    Game.prototype.draw = function(time){

    };



    var game = new Game();
};
