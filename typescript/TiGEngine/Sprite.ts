class Sprite {
    SourceRectangle : Rectangle;
    Size : {width:number,height:number};
    Position : {x:number,y:number};

    private isLoaded : boolean;
    private image : Asset;

    private animations : any;
	private currentAnimation : string;

    private animationIndex : number;

    public set CurrentAnimation(value : string) {
        this.currentAnimation = value;
    }

    constructor(asset_key : string){
        this.animationIndex = -1;
        this.SourceRectangle = new Rectangle({x:0,y:0,width:-1,height:-1});
        this.Size = {width:-1,height:-1};
        this.Position = {x:0,y:0};

        this.isLoaded = false;

        var instance = this;
        this.image = TextureManager.GetImage(asset_key, () => {
            if (this.Size.width == -1)
                this.Size.width = this.image.Width;

            if (this.Size.height == -1)
                this.Size.height = this.image.Height;

            if (this.SourceRectangle.width == -1)
                this.SourceRectangle.width = this.image.Width;

            if (this.SourceRectangle.height == -1)
                this.SourceRectangle.height = this.image.Height;
        });
    }

    public setAnimations(default_name, json){
    	this.animations = json;

    	this.currentAnimation = default_name;
    	this.animationIndex = -1;
    	this.updateAnimation(this);
    }

    public getBounds(){
    	var rect = this.animations.animations[this.currentAnimation][this.animationIndex];
    	return new Rectangle({x:this.Position.x, y:this.Position.y, width:rect.width,height:rect.height});
    }

    public updateAnimation(instance){

    	instance.animationIndex++;
    	var currentAnim = instance.animations.animations[instance.currentAnimation];
    	if (instance.animationIndex >= currentAnim.length)
    		instance.animationIndex = 0;

    	setTimeout(instance.updateAnimation,100, instance);
    }

    public update(){
    }

    public draw(){
        if (this.image.IsLoaded)
            Core.Context2d.drawImage(this.image.getImage(), this.SourceRectangle.x,this.SourceRectangle.y, this.SourceRectangle.width, this.SourceRectangle.height, this.Position.x,this.Position.y, this.Size.width, this.Size.height);
    }
}
