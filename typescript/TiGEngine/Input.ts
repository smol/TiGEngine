/// <reference path="Utils/Time.ts"/>
/// <reference path="Utils/Vector2.ts"/>

var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:    192
  };

var MOUSE_BUTTON = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};

class InputInfo {
    public Cooldown : number;
    private deltaTime : number;

    private isPressed : boolean;

    public set IsPressed(value : boolean){
        this.isPressed = value;
    }

    public get IsPressed() : boolean {
        var ret : boolean = this.isPressed && this.deltaTime > this.Cooldown;

        if (ret)
            this.deltaTime = 0;

        return ret;
    }

    constructor(cooldown : number){
        this.Cooldown = cooldown;
        this.isPressed = false;
        this.deltaTime = 0;
    }

    public update(){
        this.deltaTime += (Time.DeltaTime * 100);
    }
}

class MouseInfo {
    public static Position : Vector2 = Vector2.Zero;
}

class Input {
    static keys: InputInfo[];
    static mouseButtons: boolean[];
    
    public static MousePosition: { x: number; y: number } = { x: 0, y: 0 };

    public static MouseButton(buttoncode: number): boolean {
        return this.mouseButtons[buttoncode];
    }

    public static Key(keycode : number) : boolean {
        return this.keys[keycode].IsPressed;
    }

    constructor(core : Core, config : {key : number; cooldown : number}[]){
        Input.keys = [];
        Input.mouseButtons = [];

        var instance = this;

        for (var i = 0; i < config.length; i++){
            Input.keys[config[i].key] = new InputInfo(config[i].cooldown);
        }

        function onKey(e){
            e = e || event;

            var keycode : number = e.keyCode;
            if (Input.keys[keycode]){
                Input.keys[keycode].IsPressed = e.type == 'keydown';

            // console.info(keycode, Input.keys[keycode].IsPressed);
            }
        }

        function mouseMove(e) {
            var x: number = e.x - (Core.Canvas.offsetLeft + core.CameraPosition.x);
            var y: number = e.y - (Core.Canvas.offsetTop + core.CameraPosition.y);

            Input.MousePosition.x = x;
            Input.MousePosition.y = y;
        }

        function mouseDown(e) {
            mouseMove(e);

            Input.mouseButtons[e.button] = e.type == "mousedown";
        }

        Core.Canvas.addEventListener("mousedown", mouseDown, true);
        Core.Canvas.addEventListener("mouseup", mouseDown, true);
        Core.Canvas.addEventListener("mousemove", mouseMove, true);

        document.addEventListener("keydown", onKey, true);
        document.addEventListener("keyup", onKey, true);
    }

    public update(){
        for (var index in Input.keys){
            Input.keys[index].update();
        }
    }
}
