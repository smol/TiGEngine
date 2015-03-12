var Sprite = function(image_src){
    this.isLoaded = false;
    
    this.image = new Image();
    this.image.src = image_src;
    
    var instance = this;
    this.image.onload = function(){
        instance.isLoaded = true
    };
    
	this.animations = null;
	this.currentAnimation = null;
	this.position = {x:0,y:0};
	
};

Sprite.prototype.setAnimations = function(default_name, json){
	this.animations = json;
	
	this.currentAnimation = default_name;
	this.animIndex = -1;
	this.updateAnimation(this);
};

Sprite.prototype.getBounds = function(){
	var rect = this.animations.animations[this.currentAnimation][this.animIndex];
	return new Rectangle(this.position.x, this.position.y, rect.width,rect.height);
};

Sprite.prototype.updateAnimation = function(instance){
	
	instance.animIndex++;
	var currentAnim = instance.animations.animations[instance.currentAnimation];
	if (instance.animIndex >= currentAnim.length)
		instance.animIndex = 0;
	
	setTimeout(instance.updateAnimation,100, instance);
};

Sprite.prototype.update = function(){
};

Sprite.prototype.draw = function(ctx){
    if (this.isLoaded) {
        if (this.currentAnimation == null)
        	Context2d.drawImage(this.image, this.position.x,this.position.y);
		else {
			var currentAnim = this.animations.animations[this.currentAnimation];
			Context2d.drawImage(this.image, 
							   currentAnim[this.animIndex].x,currentAnim[this.animIndex].y, 
							   currentAnim[this.animIndex].width,currentAnim[this.animIndex].height,
							   this.position.x,this.position.y,
							   currentAnim[this.animIndex].width,currentAnim[this.animIndex].height);
			
			
		}
			
    }
};

