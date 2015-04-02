var part = {
    center : {
        rect : {x:15,y:15,width:2,height:2},
        position : {x:20,y:20},
		size : {width:1,height:0.5}
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
        rect : {x:0,y:25,width:20,height:5},
        position:{x:0,y:20},
		size :{width:0,height:0.5}
    },
    left_bottom : {
        rect : {x : 0, y:36, width:20,height:20},
        position:{x:0,y:-5},
		size : {width:0,height:0}
    },
    right_bottom : {
        rect : {x : 148, y:36, width:20,height:20},
        position:{x:-20,y:-5},
		size : {width:0,height:0}
    },
	right: {
		rect : {x : 148, y:25,width:20,height:5},
		position:{x:-20,y:20},
		size : {width:0,height:0.5}
	},
	bottom : {
		rect : {x:48,y:36,width:20,height:20},
		position:{x:20,y:-5},
		size : {width:1,height:0}
	},
	arrow :  {
		rect : {x : 23, y : 36, width:19, height:39},
		position : {x : 10, y : -5},
		size : {width:0,height:0}
	}

}; // 0 72 40 40

// 31 72 64 88

class Bubble extends GameObject {
    Text : string;
    private isVisible : boolean;

    private textAvailable : boolean;

    private bubbles : {[index:string] : Sprite; };

    private index : number;
    private lines : string[];
    private height : number;

    constructor(){
        super();
        this.index = 0;
        this.Text = null;
        this.textAvailable = false;

        Core.Context2d.font = "15px kenpixel";
        Core.Context2d.fillStyle = "#7f7f7f";

        this.bubbles = {};

        for (var key in part){
    		var temp = new Sprite("BUBBLE");
    		temp.SourceRectangle = part[key].rect;
    		temp.Size = {width : part[key].rect.width, height : part[key].rect.height};
    		this.bubbles[key] = temp;
    	}
    }

    public setText(text){
        if (!text || !text.text){
            this.textAvailable = false;
            this.Text = null;
            return;
        }

        if (this.textAvailable){
            return;
        }

    	this.textAvailable = true

        this.Text = text.text;
    	this.index = -1;

    	if (this.Text != null && this.index >= 0)
        	this.lines = this.Text[this.index].split("\n");
    }

    private destroy(){

    }

    public nextText() : boolean{
        this.index++;
        if (this.Text == null || this.index >= this.Text.length){
            this.textAvailable = false;
            return false
        }

        if (this.Text != null && this.index >= 0)
        	this.lines = this.Text[this.index].split("\n");


        return true;
    }

    public update(){
        if (this.Text == null || this.index >= this.Text.length)
            return;

        var measure_text : TextMetrics = Core.Context2d.measureText("!");
        var nb_lines : number = 1;
        if (this.lines != null){
            measure_text = Core.Context2d.measureText(this.lines[1]);
            nb_lines = this.lines.length;
        }

        this.height = 20 * nb_lines;

        for (var key in this.bubbles){
            this.bubbles[key].Position.x = this.Position.X + part[key].position.x;
            this.bubbles[key].Position.y = this.Position.Y - this.height + part[key].position.y;

            if (part[key].position.x < 0)
                this.bubbles[key].Position.x = this.Position.X + measure_text.width - part[key].position.x;

            if (part[key].position.y < 0)
                this.bubbles[key].Position.y = this.Position.Y - part[key].position.y;

            if (part[key].size.width > 0)
                this.bubbles[key].Size.width = measure_text.width * part[key].size.width;

            if (part[key].size.height > 0)
                this.bubbles[key].Size.height = 25 * nb_lines * part[key].size.height;
        }
    }

    public draw() : void {
        if (this.Text != null) {
            for (var index in this.bubbles)
                this.bubbles[index].draw();

            var start = this.Position.Y + 30;
            if (this.index == -1){
                Core.Context2d.fillText("!", this.Position.X + 20, this.Position.Y + 30 - this.height);
            } else {
                for (var i = 0; i < this.lines.length; i++)
                    Core.Context2d.fillText(this.lines[i], this.Position.X + 20, this.Position.Y + 30 + (i * 20) - this.height);
            }
        }
    }
}
