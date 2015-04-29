var Core = (function () {
    function Core(id_canvas, width, height, game, config) {
        Core.canvas = document.getElementById(id_canvas);
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
        Core.Context2d.transform(1, 0, 0, 1, 0, 0);
        this.cameraPosition = { x: 0, y: 0 };
        console.info("context2d", Core.Context2d);
        function timestamp() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        }
        var now;
        var dt = 0;
        var last = timestamp();
        var step = 1 / this.FPS;
        var instance = this;
        function frame() {
            now = timestamp();
            dt = dt + Math.min(1, (now - last) / 1000);
            Time.update(dt * 10);
            while (dt > step) {
                dt = dt - step;
                instance.Update();
            }
            instance.Draw();
            last = now;
            this.requestAnimationFrame(frame);
        }
        frame();
    }
    Object.defineProperty(Core.prototype, "CameraPosition", {
        get: function () {
            return this.cameraPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Core, "Canvas", {
        get: function () {
            return this.canvas;
        },
        enumerable: true,
        configurable: true
    });
    Core.prototype.CameraTranslation = function (position) {
        var diff = {
            x: position.X - this.cameraPosition.x,
            y: position.Y - this.cameraPosition.y
        };
        Core.Context2d.transform(1, 0, 0, 1, diff.x, diff.y);
        this.cameraPosition = { x: position.X, y: position.Y };
    };
    Core.prototype.AddGameObject = function (gameObject) {
        this.gameObjects.push(gameObject);
        return gameObject;
    };
    Core.prototype.AddSubview = function (view) {
        this.uiviews.push(view);
    };
    Core.prototype.Update = function () {
        function update(gameObjects) {
            for (var i = gameObjects.length - 1; i >= 0; i--) {
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
    };
    Core.prototype.Draw = function () {
        function draw(gameObjects) {
            for (var i = 0; i < gameObjects.length; i++) {
                gameObjects[i].Draw();
                if (gameObjects[i].children) {
                    draw(gameObjects[i].children);
                }
            }
        }
        Core.Context2d.save();
        Core.Context2d.setTransform(1, 0, 0, 1, 0, 0);
        Core.Context2d.clearRect(0, 0, this.width, this.height);
        Core.Context2d.restore();
        draw(this.gameObjects);
        draw(this.uiviews);
        if (this.game != null)
            this.game.Draw && this.game.Draw();
    };
    return Core;
})();
var GameObject = (function () {
    function GameObject() {
        this.Visible = true;
        this.ClickZone = null;
        this.isHover = false;
        this.Clickable = false;
        this.Position = Vector2.Zero;
        this.children = [];
    }
    GameObject.prototype.UpdateInput = function () {
        if (!this.Clickable || !this.ClickZone)
            return;
        var position = Input.MousePosition;
        if (position.x >= this.ClickZone.x && position.x <= (this.ClickZone.x + this.ClickZone.width) && position.y >= this.ClickZone.y && position.y <= (this.ClickZone.y + this.ClickZone.height)) {
            if (this.isHover == false) {
                this.OnEnter();
                this.isHover = true;
            }
            else {
            }
        }
        else {
            if (this.isHover)
                this.OnExit();
            this.isHover = false;
        }
    };
    GameObject.prototype.OnExit = function () {
    };
    GameObject.prototype.OnEnter = function () {
    };
    GameObject.prototype.OnClick = function () {
    };
    GameObject.prototype.AddChild = function (gameObject) {
        gameObject.childIndex = this.children.length;
        gameObject.parent = this;
        this.children.push(gameObject);
    };
    GameObject.prototype.RemoveChild = function (gameObject) {
        this.children.splice(gameObject.childIndex, 1);
    };
    GameObject.prototype.Draw = function () {
    };
    GameObject.prototype.Update = function () {
    };
    return GameObject;
})();
var Time = (function () {
    function Time() {
    }
    Time.update = function (dt) {
        this.DeltaTime = dt;
    };
    Time.DeltaTime = 0;
    return Time;
})();
var Vector2 = (function () {
    function Vector2(x, y) {
        this.X = x;
        this.Y = y;
    }
    Vector2.Zero = new Vector2(0, 0);
    return Vector2;
})();
/// <reference path="Utils/Time.ts"/>
/// <reference path="Utils/Vector2.ts"/>
var KEY = {
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    TILDA: 192
};
var MOUSE_BUTTON = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
var InputInfo = (function () {
    function InputInfo(cooldown) {
        this.Cooldown = cooldown;
        this.isPressed = false;
        this.deltaTime = 0;
    }
    Object.defineProperty(InputInfo.prototype, "IsPressed", {
        get: function () {
            var ret = this.isPressed && this.deltaTime > this.Cooldown;
            if (ret)
                this.deltaTime = 0;
            return ret;
        },
        set: function (value) {
            this.isPressed = value;
        },
        enumerable: true,
        configurable: true
    });
    InputInfo.prototype.update = function () {
        this.deltaTime += (Time.DeltaTime * 100);
    };
    return InputInfo;
})();
var MouseInfo = (function () {
    function MouseInfo() {
    }
    MouseInfo.Position = Vector2.Zero;
    return MouseInfo;
})();
var Input = (function () {
    function Input(core, config) {
        Input.keys = [];
        Input.mouseButtons = [];
        var instance = this;
        for (var i = 0; i < config.length; i++) {
            Input.keys[config[i].key] = new InputInfo(config[i].cooldown);
        }
        function onKey(e) {
            e = e || event;
            var keycode = e.keyCode;
            if (Input.keys[keycode]) {
                Input.keys[keycode].IsPressed = e.type == 'keydown';
            }
        }
        function mouseMove(e) {
            var x = e.x - (Core.Canvas.offsetLeft + core.CameraPosition.x);
            var y = e.y - (Core.Canvas.offsetTop + core.CameraPosition.y);
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
    Input.MouseButton = function (buttoncode) {
        return this.mouseButtons[buttoncode];
    };
    Input.Key = function (keycode) {
        return this.keys[keycode].IsPressed;
    };
    Input.prototype.update = function () {
        for (var index in Input.keys) {
            Input.keys[index].update();
        }
    };
    Input.MousePosition = { x: 0, y: 0 };
    return Input;
})();
/// <reference path="Core.ts"/>
var Sprite = (function () {
    function Sprite(asset_key) {
        var _this = this;
        this.animationIndex = -1;
        this.SourceRectangle = new Rectangle({ x: 0, y: 0, width: -1, height: -1 });
        this.Size = { width: -1, height: -1 };
        this.Position = { x: 0, y: 0 };
        this.isLoaded = false;
        var instance = this;
        this.image = TextureManager.GetImage(asset_key, function () {
            if (_this.Size.width == -1)
                _this.Size.width = _this.image.Width;
            if (_this.Size.height == -1)
                _this.Size.height = _this.image.Height;
            if (_this.SourceRectangle.width == -1)
                _this.SourceRectangle.width = _this.image.Width;
            if (_this.SourceRectangle.height == -1)
                _this.SourceRectangle.height = _this.image.Height;
        });
    }
    Object.defineProperty(Sprite.prototype, "CurrentAnimation", {
        set: function (value) {
            this.currentAnimation = value;
        },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.setAnimations = function (default_name, json) {
        this.animations = json;
        this.currentAnimation = default_name;
        this.animationIndex = -1;
        this.updateAnimation(this);
    };
    Sprite.prototype.getBounds = function () {
        var rect = this.animations.animations[this.currentAnimation][this.animationIndex];
        return new Rectangle({ x: this.Position.x, y: this.Position.y, width: rect.width, height: rect.height });
    };
    Sprite.prototype.updateAnimation = function (instance) {
        instance.animationIndex++;
        var currentAnim = instance.animations.animations[instance.currentAnimation];
        if (instance.animationIndex >= currentAnim.length)
            instance.animationIndex = 0;
        setTimeout(instance.updateAnimation, 100, instance);
    };
    Sprite.prototype.update = function () {
    };
    Sprite.prototype.draw = function () {
        if (this.image && this.image.IsLoaded)
            Core.Context2d.drawImage(this.image.getImage(), this.SourceRectangle.x, this.SourceRectangle.y, this.SourceRectangle.width, this.SourceRectangle.height, this.Position.x, this.Position.y, this.Size.width, this.Size.height);
    };
    return Sprite;
})();
var Asset = (function () {
    function Asset(src, callback) {
        this.IsLoaded = false;
        this.Callback = callback;
        this.image = new Image();
        this.image.src = src;
        var instance = this;
        this.image.onload = function () {
            instance.Height = this.naturalHeight;
            instance.Width = this.naturalWidth;
            instance.IsLoaded = true;
            callback && callback();
        };
    }
    Asset.prototype.getImage = function () {
        return this.image;
    };
    Asset.prototype.onload = function (callback) {
        this.Callback = callback;
        var instance = this;
        this.image.onload = function () {
            instance.Height = this.naturalHeight;
            instance.Width = this.naturalWidth;
            instance.IsLoaded = true;
            instance.Callback && instance.Callback();
        };
    };
    return Asset;
})();
var TextureManager = (function () {
    function TextureManager() {
    }
    TextureManager.GetImage = function (key, callback) {
        var image = this.textures[key];
        if (!image)
            return null;
        if (image.IsLoaded)
            image.Callback && image.Callback();
        image.onload(function () {
            callback();
        });
        return image;
    };
    TextureManager.LoadImage = function (key, src) {
        var image = new Asset(src, null);
        this.textures[key] = image;
    };
    TextureManager.textures = {};
    return TextureManager;
})();
var Trigger = (function () {
    function Trigger(hitbox) {
        this.gameObjects = [];
        this.alreadyEnter = false;
        this.hitbox = new Rectangle(hitbox);
    }
    Trigger.prototype.AddCollider = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    Trigger.prototype.update = function (deltaTime) {
        console.info('update', deltaTime);
    };
    return Trigger;
})();
var UIView = (function () {
    function UIView(frame, parent, tag) {
        if (parent === void 0) { parent = null; }
        if (tag === void 0) { tag = "div"; }
        this.parent = null;
        this.Data = null;
        this.view = null;
        this.view = document.createElement(tag);
        if (frame) {
            this.view.style.position = "absolute";
            this.view.style.left = frame.x.toString() + "px";
            this.view.style.top = frame.y.toString() + "px";
            this.view.style.width = frame.width.toString() + "px";
            this.view.style.height = frame.height.toString() + "px";
        }
        if (!parent) {
            Core.Canvas.parentNode.appendChild(this.view);
        }
        else {
            parent.view.appendChild(this.view);
        }
    }
    Object.defineProperty(UIView.prototype, "Frame", {
        set: function (value) {
            this.view.style.left = value.x.toString() + "px";
            this.view.style.top = value.y.toString() + "px";
            this.view.style.width = value.width.toString() + "px";
            this.view.style.height = value.height.toString() + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "BackgroundColor", {
        set: function (value) {
            this.view.style.background = value;
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.AddClass = function (value) {
        this.view.className += " " + value;
    };
    UIView.prototype.RemoveFromSuperview = function () {
        if (this.parent == null) {
            Core.Canvas.parentNode.removeChild(this.view);
        }
        else {
            this.parent.view.removeChild(this.view);
        }
    };
    UIView.prototype.Update = function () {
    };
    UIView.prototype.Draw = function () {
    };
    return UIView;
})();
/// <reference path="UIView.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var UIButton = (function (_super) {
    __extends(UIButton, _super);
    function UIButton(title, position, parent) {
        if (parent === void 0) { parent = null; }
        _super.call(this, null, parent, "a");
        this.view.innerText = title;
        this.view.href = "javascript:";
    }
    Object.defineProperty(UIButton.prototype, "OnClick", {
        set: function (callback) {
            this.view.onclick = callback;
        },
        enumerable: true,
        configurable: true
    });
    return UIButton;
})(UIView);
var UIList = (function (_super) {
    __extends(UIList, _super);
    function UIList(frame, parent) {
        if (parent === void 0) { parent = null; }
        _super.call(this, frame, parent, "ul");
    }
    UIList.prototype.Items = function (data) {
        this.view.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            li.appendChild(data[i].view);
            this.view.appendChild(li);
        }
    };
    return UIList;
})(UIView);
//class UIText extends UIView {
//    public Text : string = null;
//    constructor(text: string, frame: { x: number; y: number; width: number; height: number }) {
//        super(frame);
//        this.Text = text;
//    }
//    public Draw() {
//        super.Draw();
//    }
//}  
var Rectangle = (function () {
    function Rectangle(rect) {
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
    }
    Object.defineProperty(Rectangle.prototype, "Bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.Size = function () {
        return { width: this.width, height: this.height };
    };
    Rectangle.prototype.Intersect = function (rectangle) {
        if (this.x < rectangle.x + rectangle.width && this.x + this.width > rectangle.x && this.y < rectangle.y + rectangle.height && this.y + this.height > rectangle.y)
            return true;
        return false;
    };
    return Rectangle;
})();
