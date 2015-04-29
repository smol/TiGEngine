/// <reference path="UIView.ts"/>

class UIButton extends UIView {
    public set OnClick(callback: (e: MouseEvent) => void) {
        this.view.onclick = callback;
    }

    
    constructor(title: string, position: { x: number; y: number }, parent : UIView = null) {
        super(null, parent, "a");

        this.view.innerText = title;

        (<HTMLLinkElement>this.view).href = "javascript:";
    }
}