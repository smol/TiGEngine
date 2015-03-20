var Rectangle = function(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.bottom = this.height + this.y;
	this.right = this.width + this.x;
};

Rectangle.prototype.size = function(){
    return {width:this.width,height:this.height};
};

Rectangle.prototype.Intersect = function(rect){
	if (this.x < rect.x + rect.width && this.x + this.width > rect.x && 
		this.y < rect.y + rect.height && this.y + this.height > rect.y)
		return true
		
	return false
};