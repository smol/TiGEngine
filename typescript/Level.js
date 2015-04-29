var level = [
    {
        layers: [],
        size: { height: 1008, width: 1008 },
        collisions: [
            new Rectangle({ x: 0, y: 567, width: 1008, height: 443 }),
            new Rectangle({ x: 440, y: 504, width: 187, height: 126 })
        ],
        texts: [
            {
                hitbox: new Rectangle({ x: 0, y: 379, width: 189, height: 240 }),
                text: [
                    "Coucou\nJe suis miiboo",
                    "Je suis la pour vous\nprésenté la légendre de Smol"
                ]
            }
        ]
    }
];
var Level = function () {
    this.sprite = new Sprite("HALL");
    this.sprite.position = { x: 0, y: 0 };
    this.index = 0;
    this.size = level[0].size;
    this.collisions = [
        new Rectangle({ x: 0, y: 567, width: 1008, height: 443 })
    ];
};
Level.prototype.Collision = function (rect, amount) {
    var speculative = new Rectangle({ x: rect.x + amount.x, y: rect.y + amount.y, width: rect.width, height: rect.height });
    var collisions = level[this.index].collisions;
    if (speculative.x <= 0 || speculative.y >= this.size.width)
        amount.x = 0;
    for (var i = 0; i < collisions.length; i++) {
        if (collisions[i].Intersect(speculative)) {
            amount.x = 0;
            if (amount.y != 0)
                amount.y = collisions[i].y - rect.Bottom;
            return amount;
        }
    }
    return amount;
};
Level.prototype.TextAvailable = function (rect) {
    var texts = level[this.index].texts;
    for (var i = 0; i < texts.length; i++) {
        if (texts[i].hitbox.Intersect(rect)) {
            return texts[i];
        }
    }
    return null;
};
Level.prototype.update = function () {
};
Level.prototype.draw = function () {
    this.sprite.draw();
};
