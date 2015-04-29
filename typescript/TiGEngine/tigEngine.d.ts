declare class Core {
    static Context2d: CanvasRenderingContext2D;
    private input;
    private game;
    private FPS;
    private gameObjects;
    private uiviews;
    private width;
    private height;
    private ratio;
    private cameraPosition;
    CameraPosition: {
        x: number;
        y: number;
    };
    private static canvas;
    static Canvas: HTMLCanvasElement;
    constructor(id_canvas: string, width: number, height: number, game: any, config: any);
    CameraTranslation(position: Vector2): void;
    AddGameObject(gameObject: any): any;
    AddSubview(view: UIView): void;
    Update(): void;
    Draw(): void;
}
declare class GameObject {
    private parent;
    private childIndex;
    private children;
    Position: Vector2;
    Visible: boolean;
    ClickZone: Rectangle;
    isHover: boolean;
    Clickable: boolean;
    constructor();
    UpdateInput(): void;
    protected OnExit(): void;
    protected OnEnter(): void;
    protected OnClick(): void;
    protected AddChild(gameObject: GameObject): void;
    protected RemoveChild(gameObject: GameObject): void;
    Draw(): void;
    Update(): void;
}
declare class Time {
    static DeltaTime: number;
    static update(dt: any): void;
}
declare class Vector2 {
    X: number;
    Y: number;
    constructor(x: number, y: number);
    static Zero: Vector2;
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
declare var MOUSE_BUTTON: {
    LEFT: number;
    MIDDLE: number;
    RIGHT: number;
};
declare class InputInfo {
    Cooldown: number;
    private deltaTime;
    private isPressed;
    IsPressed: boolean;
    constructor(cooldown: number);
    update(): void;
}
declare class MouseInfo {
    static Position: Vector2;
}
declare class Input {
    static keys: InputInfo[];
    static mouseButtons: boolean[];
    static MousePosition: {
        x: number;
        y: number;
    };
    static MouseButton(buttoncode: number): boolean;
    static Key(keycode: number): boolean;
    constructor(core: Core, config: {
        key: number;
        cooldown: number;
    }[]);
    update(): void;
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
declare class UIView {
    private parent;
    Data: any;
    Frame: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    BackgroundColor: string;
    view: HTMLElement;
    constructor(frame: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, parent?: UIView, tag?: string);
    AddClass(value: string): void;
    RemoveFromSuperview(): void;
    Update(): void;
    Draw(): void;
}
declare class UIButton extends UIView {
    OnClick: (e: MouseEvent) => void;
    constructor(title: string, position: {
        x: number;
        y: number;
    }, parent?: UIView);
}
declare class UIList extends UIView {
    constructor(frame: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, parent?: UIView);
    Items(data: UIView[]): void;
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
