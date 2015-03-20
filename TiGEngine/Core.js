var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:    192
  };

var KeyDown = [];

var Context2d = null;

var Core = function(id_canvas, width, height, game){
    this.game = game;
    this.gameObjects = [];
    this.FPS = 1;
    this.width = width;
    this.height = height;
	this.Ratio = height / width;
    console.log("FPS Setted", 1000 / this.FPS);
    this.canvas = document.getElementById(id_canvas);
    
	var instance = this;
	/*window.onresize = function(){
		instance.width = this.innerWidth;
		instance.height = this.innerHeight * instance.Ratio;
		
		instance.canvas.setAttribute("width", this.innerWidth);
		instance.canvas.setAttribute("height", this.innerHeight * instance.Ratio);
		
		Context2d.canvas.width = this.innerWidth;
		Context2d.canvas.height = this.innerHeight * instance.Ratio;
		
	    Context2d.font = "15px kenpixel";
		Context2d.fillStyle = "black";
	};*/
	
//    this.canvas.setAttribute("style", "background-color:red");
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
    
    Context2d = this.canvas.getContext("2d");
	Context2d.transform(1,0,0,1,0,0);
	
	this.camera_position = {x:0,y:0};
    this.CameraPosition({x:0,y:0});
	
	
	document.addEventListener("keydown", onKey, true);
	document.addEventListener("keyup", onKey, true);
	
	function onKey(e){
		e = e || event;
		KeyDown[e.keyCode] = e.type == 'keydown';
	};
	
	function timestamp() {
		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	}
	
	var now;
	var dt = 0;
	var last = timestamp();
	var step = 1 / 60;
	
	function frame(){
		now = timestamp();
		dt = dt + Math.min(1, (now - last) / 1000);
		
		 while(dt > step) {
    		dt = dt - step;
			instance.update();
		 }
		
		instance.draw();
		last = now;
		this.requestAnimFrame(frame);
	}
	frame();
};



Core.prototype.CameraPosition = function(position){
	var diff = {
		x : position.x - this.camera_position.x,
		y : position.y - this.camera_position.y
	};
	Context2d.transform(1,0,0,1,diff.x,diff.y);
	
	this.camera_position = position;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



Core.prototype.update = function(){
	
	function update(gameObjects, root_position){
		for (var i = 0; i < gameObjects.length; i++){
			gameObjects[i].update();
			if (gameObjects[i].children) {
				update(gameObjects[i].children);
			}
		}	
	}
	
	update(this.gameObjects);
	
	if (this.game != null)
    	this.game.update && this.game.update();
};

Core.prototype.draw = function(){
	
	function draw(gameObjects){
		for (var i = 0; i < gameObjects.length; i++){
			gameObjects[i].draw();
			if (gameObjects[i].children) {
				draw(gameObjects[i].children);
			}
		}	
	}
	
	Context2d.save();
	
	Context2d.setTransform(1,0,0,1,0,0);
    Context2d.clearRect(0,0, this.width, this.height);
    Context2d.restore();
	
	
	draw(this.gameObjects);
    
    if (this.game != null)
    	this.game.draw && this.game.draw();    
};

Core.prototype.AddGameObject = function(gameObject){
    this.gameObjects.push(gameObject);
    return gameObject;

};
