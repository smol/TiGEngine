class UIView {
    private parent: UIView = null;

    public Data : any = null;

    public set Frame(value: { x: number;y: number;width: number;height: number }) {
        this.view.style.left = value.x.toString() + "px";
        this.view.style.top = value.y.toString() + "px";

        this.view.style.width = value.width.toString() + "px";
        this.view.style.height = value.height.toString() + "px";
    }

    public set BackgroundColor(value : string) {
        this.view.style.background = value;
    }

    public view: HTMLElement = null;

    constructor(frame: { x: number; y: number; width: number; height: number }, parent: UIView = null, tag: string = "div") {
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
        } else {
            parent.view.appendChild(this.view);
        }
    }

    public AddClass(value: string) {
        this.view.className += " " + value;
    }

    public RemoveFromSuperview() {
        if (this.parent == null) {
            Core.Canvas.parentNode.removeChild(this.view);
        } else {
            this.parent.view.removeChild(this.view);
        }
    }

    public Update() {
        
    }

    public Draw() {
    
        

    }
}