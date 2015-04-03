declare class Time {
    static DeltaTime: number;
    static update(dt: any): void;
}
declare var KEY: {
    BACKSPACE: number;
    TAB: number;
    RETURN: number;
    ESC: number;
    SPACE: number;
    PAGEUP: number;
    PAGEDOWN: number;
    END: number;
    HOME: number;
    LEFT: number;
    UP: number;
    RIGHT: number;
    DOWN: number;
    INSERT: number;
    DELETE: number;
    ZERO: number;
    ONE: number;
    TWO: number;
    THREE: number;
    FOUR: number;
    FIVE: number;
    SIX: number;
    SEVEN: number;
    EIGHT: number;
    NINE: number;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    G: number;
    H: number;
    I: number;
    J: number;
    K: number;
    L: number;
    M: number;
    N: number;
    O: number;
    P: number;
    Q: number;
    R: number;
    S: number;
    T: number;
    U: number;
    V: number;
    W: number;
    X: number;
    Y: number;
    Z: number;
    TILDA: number;
};
declare class InputKey {
    Cooldown: number;
    private deltaTime;
    private isPressed;
    IsPressed: boolean;
    constructor(cooldown: number);
    update(): void;
}
declare class Input {
    private static keys;
    static Key(keycode: number): boolean;
    constructor(config: {
        key: number;
        cooldown: number;
    }[]);
    update(): void;
}
declare class Core {
    static Context2d: CanvasRenderingContext2D;
    private input;
    private game;
    private FPS;
    private gameObjects;
    private width;
    private height;
    private ratio;
    private cameraPosition;
    private canvas;
    constructor(id_canvas: string, width: number, height: number, game: any, config: any);
    CameraPosition(position: any): void;
    AddGameObject(gameObject: any): any;
    Update(): void;
    Draw(): void;
}
declare class GameObject {
    private parent;
    private childIndex;
    private children;
    Position: Vector2;
    constructor();
    protected AddChild(gameObject: GameObject): void;
    protected RemoveChild(gameObject: GameObject): void;
}
declare class Sprite {
    SourceRectangle: Rectangle;
    Size: {
        width: number;
        height: number;
    };
    Position: {
        x: number;
        y: number;
    };
    private isLoaded;
    private image;
    private animations;
    private currentAnimation;
    private animationIndex;
    CurrentAnimation: string;
    constructor(asset_key: string);
    setAnimations(default_name: any, json: any): void;
    getBounds(): Rectangle;
    updateAnimation(instance: any): void;
    update(): void;
    draw(): void;
}
declare class Asset {
    IsLoaded: boolean;
    Callback: () => void;
    Width: number;
    Height: number;
    private image;
    constructor(src: string, callback: () => void);
    getImage(): HTMLImageElement;
    onload(callback: () => void): void;
}
declare class TextureManager {
    private static textures;
    static GetImage(key: string, callback: () => void): Asset;
    static LoadImage(key: string, src: string): void;
}
declare class Trigger {
    private alreadyEnter;
    private hitbox;
    private gameObjects;
    constructor(hitbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    AddCollider(gameObject: {
        OnEnterTrigger: (collider: Trigger) => void;
        OnExitTrigger: (collider: Trigger) => void;
    }): void;
    update(deltaTime: number): void;
}
declare class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    Bottom: number;
    constructor(rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    Size(): {
        width: number;
        height: number;
    };
    Intersect(rectangle: Rectangle): boolean;
}
declare class Vector2 {
    X: number;
    Y: number;
    constructor(x: number, y: number);
    static Zero: Vector2;
}
