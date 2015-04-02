class Trigger {
    private alreadyEnter : boolean;
    private hitbox : Rectangle;

    private gameObjects : {
        OnEnterTrigger:(collider : Trigger)=> void, OnExitTrigger :(collider : Trigger) => void
    }[]

    constructor(hitbox : {x:number,y:number,width:number,height:number}){
        this.gameObjects = [];
        this.alreadyEnter = false;
        this.hitbox = new Rectangle(hitbox);
    }

    public AddCollider(gameObject : {
        OnEnterTrigger:(collider : Trigger)=> void, OnExitTrigger :(collider : Trigger) => void
    }){
        this.gameObjects.push(gameObject);
    }

    public update(deltaTime : number){
        console.info('update', deltaTime);
    }
}
