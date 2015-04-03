class Heroe extends GameObject {
	private game : any;
	private level : any;

	private sprite : Sprite;

	private currentJumpForce : number;
	private isOnGround : boolean;
	// private children : Bubble[];

	private bubble : Bubble;

	constructor(level : any, game : any){
		super();


		this.game = game
		this.level = level;
		this.sprite = new Sprite("SPRITESHEET");
		this.sprite.Position = {x:50,y:50};

	    this.sprite.Size = jsonAnimation.animations["idle"][0].Size();
	    this.sprite.SourceRectangle = jsonAnimation.animations["idle"][0];
		this.sprite.setAnimations("idle",jsonAnimation);

		console.info('animation', jsonAnimation);

		this.currentJumpForce = 10;
		this.isOnGround = true;

		this.bubble = new Bubble();
		this.AddChild(this.bubble);
	}

	public update(){
		var camera = {
			x : -(this.sprite.Position.x - (this.game.core.width /2)),
			y : -(this.sprite.Position.y - (this.game.core.height /2))
		};

		//var gravity = 10;

		var direction = {x:0,y:0};
		// console.info('input',Input);
		if (Input.Key(KEY.RIGHT)){
			direction.x = 20 * Time.DeltaTime;
		} else if (Input.Key(KEY.LEFT)){
			direction.x = -20 * Time.DeltaTime;
		}

		this.sprite.CurrentAnimation = "idle";

		this.sprite.Position.x += this.level.Collision(this.sprite.getBounds(), direction).x;

		var gravity = { x: 0,y: this.currentJumpForce };

		if (Input.Key(KEY.UP) && this.isOnGround){
			this.currentJumpForce = -20;
			this.isOnGround = false;
		}


		if (this.currentJumpForce < 10)
			this.currentJumpForce += 1.2;
		else
			this.currentJumpForce = 10;


		gravity = this.level.Collision(this.sprite.getBounds(), gravity);
		this.isOnGround = !(gravity.y != 0 || this.currentJumpForce < 10);


		this.sprite.Position.y += gravity.y;

		if (camera.x > 0) camera.x = 0;
		if (camera.y > 0) camera.y = 0;

		this.game.core.CameraPosition(camera);

		this.bubble.Position = {
			X : this.sprite.Position.x + this.sprite.getBounds().width - 10,
			Y : this.sprite.Position.y - 40
		}

		if (Input.Key(KEY.E) && !this.bubble.nextText()){
			this.RemoveChild(this.bubble);
		}

		this.bubble.setText(this.level.TextAvailable(this.sprite.getBounds()));
		this.sprite.update();
	}

	public draw(){
		this.sprite.draw();
	}
}
