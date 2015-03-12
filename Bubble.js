var part = {
	left_top : {x:0,y:0,width:50,height:50}
};

var Bubble = function(){
	this.text = "TOTO"
	this.position = {x:0,y:0};
};

Bubble.prototype.update = function(){
};

Bubble.prototype.draw = function(){
	Context2d.font = "20px kenpixel";
	Context2d.fillStyle = "#7f7f7f";
	Context2d.fillText(this.text, this.position.x, this.position.y);
};
