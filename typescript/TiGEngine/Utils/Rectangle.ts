class Rectangle {
	public x : number;
	public y : number;
	public width : number;
	public height : number;

	public get Bottom() : number {
		return this.y + this.height;
	}

	constructor(rect : {x : number, y : number, width : number, height : number}){
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
	}

	public Size() : {width : number, height : number} {
		return {width : this.width, height : this.height };
	}

	public Intersect(rectangle : Rectangle) : boolean{
		if (this.x < rectangle.x + rectangle.width && this.x + this.width > rectangle.x &&
			this.y < rectangle.y + rectangle.height && this.y + this.height > rectangle.y)
			return true

		return false
	}
}
