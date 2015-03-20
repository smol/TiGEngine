var part = {
    center : {
        rect : {x:15,y:15,width:2,height:2},
        position : {x:20,y:20},
		size : {width:1,height:1}
    },
	left_top : {
        rect : {x:0,y:0,width:20,height:20},
        position : {x:0,y:0},
		size : {width:0,height:0}
    },
    right_top : {
        rect : {x:148,y:0,width:20,height:20},
        position : {x:-20,y:0},
		size : {width:0,height:0}
    },
	top : {
        rect :{x :25,y:0,width:20,height:20},
        position : {x:20,y:0},
		size : {width:1,height:0}
    },
	left : {
        rect : {x:0,y:25,width:20,height:10},
        position:{x:0,y:20},
		size :{width:0,height:1}
    },
    left_bottom : {
        rect : {x : 0, y:36, width:20,height:20},
        position:{x:0,y:-10},
		size : {width:0,height:0}
    },
    right_bottom : {
        rect : {x : 148, y:36, width:20,height:20},
        position:{x:-20,y:-10},
		size : {width:0,height:0}
    },
	right: {
		rect : {x : 148, y:25,width:20,height:10},
		position:{x:-20,y:20},
		size : {width:0,height:1}
	},
	bottom : {
		rect : {x:48,y:36,width:20,height:20},
		position:{x:20,y:-10},
		size : {width:1,height:0}
	},
	arrow :  {
		rect : {x : 20, y : 36, width:32, height:42},
		position : {x : 20, y : -10},
		size : {width:0,height:0}
	}
    
}; // 0 72 40 40

// 31 72 64 88

var Bubble = function(){
	this.text = "COUCOU\nje suis MIIBOO\nTOTO";
	this.position = {x:0,y:0};
	
    Context2d.font = "15px kenpixel";
	Context2d.fillStyle = "black";
    
	this.bubbles = {};
	for (var key in part){
		var temp = new Sprite("BUBBLE");
		temp.sourceRectangle = part[key].rect;
		temp.size = {width : part[key].rect.width, height : part[key].rect.height};	
		this.bubbles[key] = temp;
	}
	
	this.lines = this.text.split("\n");	
};

Bubble.prototype.update = function(){
    var measure_text = Context2d.measureText(this.lines[1]);
	
	this.height = 25 * this.lines.length;
	
	for (var key in this.bubbles){
        this.bubbles[key].position.x = this.position.x + part[key].position.x;
        this.bubbles[key].position.y = this.position.y - this.height + part[key].position.y;
        
        if (part[key].position.x < 0)
            this.bubbles[key].position.x = this.position.x + measure_text.width - part[key].position.x;
		
        if (part[key].position.y < 0)
            this.bubbles[key].position.y = this.position.y - part[key].position.y;
        
		if (part[key].size.width > 0)
			this.bubbles[key].size.width = measure_text.width * part[key].size.width;
		
		if (part[key].size.height > 0)
			this.bubbles[key].size.height = 25 * this.lines.length * part[key].size.height;
	}
};

Bubble.prototype.draw = function(){
	for (var key in this.bubbles){
		this.bubbles[key].draw();
	}
	
//	this.top.draw();
//	this.left_top.draw();
//    this.right_top.draw();
//	this.left_bottom.draw();
	
	var start = this.position.y + 30
	for (var i = 0; i < this.lines.length; i++){
		Context2d.fillText(this.lines[i], this.position.x + 20, this.position.y + 30 + (i * 25) - this.height);
	}
	
};
