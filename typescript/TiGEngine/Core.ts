/// <reference path="Utils/Time.ts"/>
/// <reference path="Input.ts"/>


class Core {
    public static Context2d : CanvasRenderingContext2D;

    private input : Input;

    private game : any;
    private FPS : number;
    private gameObjects : any[];

    private width : number;
    private height : number;
    private ratio : number;

    private cameraPosition : {x:number,y:number};

    private canvas : HTMLCanvasElement;

    constructor(id_canvas : string, width : number, height : number, game : any, config : any){
        this.input = new Input(config.key || null);

        this.game = game;

        this.width = width;
        this.height = height;
        this.FPS = 60;

        this.ratio = this.height / this.width;

        this.canvas = <HTMLCanvasElement> document.getElementById(id_canvas);

        this.gameObjects = [];

        this.canvas.setAttribute("width", width.toString());
        this.canvas.setAttribute("height", height.toString());

        Core.Context2d = this.canvas.getContext("2d");
        Core.Context2d.transform(1,0,0,1,0,0);

        this.cameraPosition = {x:0,y:0};
        this.CameraPosition({x:0,y:0});

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

    public CameraPosition(position){

    	var diff = {
    		x : position.x - this.cameraPosition.x,
    		y : position.y - this.cameraPosition.y
    	}
        console.info(diff);
        Core.Context2d.transform(1,0,0,1,diff.x,diff.y);

    	this.cameraPosition = position;
    }


    public AddGameObject(gameObject : any) : any {
        this.gameObjects.push(gameObject);

        return gameObject;
    }

    public Update(){
        function update(gameObjects){
    		for (var i = 0; i < gameObjects.length; i++){
    			gameObjects[i].update();
    			if (gameObjects[i].children) {
    				update(gameObjects[i].children);
    			}
    		}
    	}

        this.input.update();
    	update(this.gameObjects);

    	if (this.game != null)
        	this.game.update && this.game.update();
    }

    public Draw(){
        function draw(gameObjects : any[]){
    		for (var i = 0; i < gameObjects.length; i++){
    			gameObjects[i].draw();
    			if (gameObjects[i].children) {
    				draw(gameObjects[i].children);
    			}
    		}
    	}

        Core.Context2d.save();

        Core.Context2d.setTransform(1,0,0,1,0,0);
        Core.Context2d.clearRect(0,0, this.width, this.height);
        Core.Context2d.restore();


    	draw(this.gameObjects);

        if (this.game != null)
        	this.game.draw && this.game.draw();
    }
}
