class Asset {
	public IsLoaded : boolean;
	public Callback : () => void;

	public Width : number;
	public Height : number;

	private image : HTMLImageElement;

	constructor(src : string, callback : () => void){
		this.IsLoaded = false;
		this.Callback = callback;
		this.image = new Image();
		this.image.src = src;

		var instance = this;

		this.image.onload = function(){
			instance.Height = this.naturalHeight;
			instance.Width = this.naturalWidth;

			instance.IsLoaded = true
			callback && callback();
		};
	}

	public getImage() : HTMLImageElement {
		return this.image;
	}

	public onload(callback : () => void) : void {
		this.Callback = callback;

		var instance = this;
		this.image.onload = function(){
			instance.Height = this.naturalHeight;
			instance.Width = this.naturalWidth;

			instance.IsLoaded = true;
			instance.Callback && instance.Callback()
		};
	}
}

class TextureManager {
	private static textures : { [key: string]: Asset; } = {};

	public static GetImage(key : string, callback : () => void){
		var image = this.textures[key];

		if (image.IsLoaded)
			image.Callback && image.Callback();

		image.onload(() => {
			callback();
		});

		return image
	}

	public static LoadImage(key : string, src : string){
		var image = new Asset(src, null);
	    TextureManager.textures[key] = image;
	}
}
