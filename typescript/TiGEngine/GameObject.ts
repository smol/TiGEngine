class GameObject {
    private parent : GameObject;
    private childIndex : number;
    private children : GameObject[];

    public Position : Vector2;

    constructor(){
        this.Position = Vector2.Zero;
        this.children = [];
    }

    protected AddChild(gameObject : GameObject){
        gameObject.childIndex = this.children.length;
        gameObject.parent = this;

        this.children.push(gameObject);
    }

    protected RemoveChild(gameObject : GameObject){
        this.children.splice(gameObject.childIndex, 1);
    }
}
