var Level = function(){
	this.sprite = new Sprite("hall.png");
	this.sprite.position = {x:0,y:0};

	this.collisions = [
		new Rectangle(0,567,1008,443)
	];
};

Level.prototype.Collision = function(rect,amount){
	var speculative = new Rectangle(rect.x + amount.x, rect.y + amount.y, rect.width,rect.height);

	for (var i = 0; i < this.collisions.length;i++){
		if (this.collisions[i].Intersect(speculative)){
			amount.x = 0;
			if (amount.y != 0)
				amount.y = this.collisions[i].y - rect.bottom;
			return amount
		}
	}
	return amount;
}

Level.prototype.update = function(){

};

Level.prototype.draw = function(){
	this.sprite.draw();
};