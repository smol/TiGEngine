
class Core {
    public static Context2d : CanvasRenderingContext2D;

    private input : Input;

    private game : any;
    private FPS: number;

    private gameObjects: any[];
    private uiviews : UIView[];

    private width : number;
    private height : number;
    private ratio : number;

    private cameraPosition: { x: number; y: number };

    public get CameraPosition(): { x: number; y: number } {
        return this.cameraPosition;
    }

    private static canvas: HTMLCanvasElement;
    public static get Canvas(): HTMLCanvasElement {
        return this.canvas;
    }
    

    constructor(id_canvas: string, width: number, height: number, game: any, config: any) {
        Core.canvas = <HTMLCanvasElement> document.getElementById(id_canvas);
        this.input = new Input(this, config.key || null);

        this.game = game;

        this.width = width;
        this.height = height;
        this.FPS = 60;

        this.ratio = this.height / this.width;

        
        
        this.gameObjects = [];
        this.uiviews = [];

        Core.canvas.setAttribute("width", width.toString());
        Core.canvas.setAttribute("height", height.toString());

        Core.Context2d = Core.canvas.getContext("2d");
        Core.Context2d.transform(1,0,0,1,0,0);

        this.cameraPosition = {x:0,y:0};

        console.info("context2d", Core.Context2d);

        function timestamp() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        }

        var now;
        var dt : number = 0;
        var last : number = timestamp();
        var step : number = 1 / this.FPS;

        var instance = this;

        function frame(){
            now = timestamp();
            dt = dt + Math.min(1, (now - last) / 1000);

            Time.update(dt * 10);

            while(dt > step) {
                dt = dt - step;

                instance.Update();
            }

            instance.Draw();
            last = now;
            this.requestAnimationFrame(frame);
        }
        frame();
    }

    public CameraTranslation(position : Vector2) {
    	var diff = {
    		x : position.X - this.cameraPosition.x,
    		y : position.Y - this.cameraPosition.y
        }
        Core.Context2d.transform(1,0,0,1,diff.x,diff.y);

        this.cameraPosition = { x: position.X, y: position.Y };
    }


    public AddGameObject(gameObject : any) : any {
        this.gameObjects.push(gameObject);

        return gameObject;
    }

    public AddSubview(view: UIView) {
        
        this.uiviews.push(view);
    }

    public Update(){
        function update(gameObjects){
    		for (var i = gameObjects.length - 1; i >= 0; i--){
                gameObjects[i].Update();
                gameObjects[i].UpdateInput();

    			if (gameObjects[i].children) {
    				update(gameObjects[i].children);
    			}
    		}
    	}

        this.input.update();
    	update(this.gameObjects);

    	if (this.game != null)
        	this.game.Update && this.game.Update();
    }

    public Draw() {
        function draw(gameObjects : any[]){
    		for (var i = 0; i < gameObjects.length; i++){
    			gameObjects[i].Draw();
    			if (gameObjects[i].children && gameObjects[i].children.length > 0) {
    				draw(gameObjects[i].children);
    			}
    		}
    	}

        Core.Context2d.save();

        Core.Context2d.setTransform(1,0,0,1,0,0);
        Core.Context2d.clearRect(0,0, this.width, this.height);
        Core.Context2d.restore();


    	draw(this.gameObjects);

        draw(this.uiviews);

        if (this.game != null)
        	this.game.Draw && this.game.Draw();
    }
}
