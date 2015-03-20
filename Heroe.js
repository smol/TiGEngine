var Heroe = function(level,game){
	this.children = [];
	this.game = game
	this.level = level;
	this.sprite = new Sprite("SPRITESHEET");
	this.sprite.position = {x:50,y:50};
    
    this.sprite.size = jsonAnimation.animations["idle"][0].size();
    this.sprite.sourceRectangle = jsonAnimation.animations["idle"][0];
	this.sprite.setAnimations("idle",jsonAnimation);

	this.currentJumpForce = 10;
	this.isOnGround = true;
	
	this.bubble = new Bubble();
	this.children.push(this.bubble);
};


Heroe.prototype.update = function(){
	var camera = {
		x : -(this.sprite.position.x - (this.game.core.width /2)),
		y : -(this.sprite.position.y - (this.game.core.height /2))
	};

	//var gravity = 10;

	var direction = {x:0,y:0};
	if (KeyDown[KEY.RIGHT]){
		direction.x = 5;
	} else if (KeyDown[KEY.LEFT]){
		direction.x = -5;
	}

	this.sprite.animIndex = 0;
	this.sprite.currentAnimation = (direction.x != 0) ? "walk" : "idle";

	this.sprite.position.x += direction.x;

	var gravity = { x: 0,y: this.currentJumpForce };

	if (KeyDown[KEY.UP] && this.isOnGround){
		this.currentJumpForce = -20;
		this.isOnGround = false;

	}

	if (this.currentJumpForce < 10)
		this.currentJumpForce += 1.2;
	else
		this.currentJumpForce = 10;

	gravity = this.level.Collision(this.sprite.getBounds(), gravity);

	if (gravity.y != 0 || this.currentJumpForce < 10) {
		this.isOnGround = false;
	} else {
		this.isOnGround = true;
	}
	this.sprite.position.y += gravity.y;

	if (camera.x > 0) camera.x = 0;
	if (camera.y > 0) camera.y = 0;

	this.game.core.CameraPosition(camera);
	
	this.bubble.position = {
		x : this.sprite.position.x + this.sprite.getBounds().width - 20,
		y : this.sprite.position.y - 40
	};
	
	this.sprite.update();
};

Heroe.prototype.draw = function(){
	this.sprite.draw();
};