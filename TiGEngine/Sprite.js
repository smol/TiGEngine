var Sprite = function(image_key){
    var instance = this;
    
    this.sourceRectangle = {x:0,y:0,width:-1,height:-1};
	this.size = {width:-1,height:-1};
    
    this.isLoaded = false;
    
    this.image = textureManager.GetImage(image_key, function(){
        
        if (instance.size.width == -1)
            instance.size.width = instance.image.naturalWidth;
        
        if (instance.size.height == -1)
            instance.size.height = instance.image.naturalHeight;
		
		if (instance.sourceRectangle.width == -1)
			instance.sourceRectangle.width = instance.image.naturalWidth;
		
		if (instance.sourceRectangle.height == -1)
			instance.sourceRectangle.height = instance.image.naturalHeight;
        
        console.log("size", instance.size);
    });
    
    console.log("image", this.image);
    
    
    
    
//    this.image.onload = function(){
//        instance.isLoaded = true
//        
//    };
//    
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
    if (this.image.isLoaded) {
        Context2d.drawImage(this.image, this.sourceRectangle.x,this.sourceRectangle.y, this.sourceRectangle.width, this.sourceRectangle.height, this.position.x,this.position.y, this.size.width, this.size.height);
    }
};

