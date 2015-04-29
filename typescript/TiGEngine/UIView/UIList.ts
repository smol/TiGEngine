class UIList extends UIView {
    constructor(frame: { x: number; y: number; width: number; height: number }, parent: UIView = null) {
        super(frame, parent, "ul");



    }

    public Items(data: UIView[]) {
        this.view.innerHTML = "";
        for (var i = 0; i < data.length; i++) {

            var li = document.createElement("li");
            li.appendChild(data[i].view);

            this.view.appendChild(li);

        }
    }
} 