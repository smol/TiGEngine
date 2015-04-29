class GameObject {
    private parent : GameObject;
    private childIndex : number;
    private children : GameObject[];

    public Position: Vector2;

    public Visible: boolean = true;

    public ClickZone: Rectangle = null;
    public isHover : boolean = false;

    public Clickable: boolean = false;

    constructor(){
        this.Position = Vector2.Zero;
        this.children = [];
    }

    public UpdateInput() {
        if (!this.Clickable || !this.ClickZone)
            return;


        var position: { x: number; y: number } = Input.MousePosition;
        
        if (position.x >= this.ClickZone.x && position.x <= (this.ClickZone.x + this.ClickZone.width) &&
            position.y >= this.ClickZone.y && position.y <= (this.ClickZone.y + this.ClickZone.height)) {

            if (this.isHover == false) {
                this.OnEnter();
                this.isHover = true;
            } else {
                
            }

        } else {
            if (this.isHover)
                this.OnExit();
            this.isHover = false;
        }

    }

    protected OnExit() { }
    protected OnEnter() { }
    protected OnClick() { }

    protected AddChild(gameObject : GameObject){
        gameObject.childIndex = this.children.length;
        gameObject.parent = this;

        this.children.push(gameObject);
    }

    protected RemoveChild(gameObject : GameObject){
        this.children.splice(gameObject.childIndex, 1);
    }

    public Draw() {
        
    }

    public Update() {
        
    }
}
