var config = {
    id_canvas : "gameCanvas",
    size : { width : 800, height : 460 },
    key : [
        {key : KEY.UP,cooldown : 250},
        {key : KEY.LEFT,cooldown : 0},
        {key : KEY.RIGHT,cooldown : 0},
        {key : KEY.E, cooldown : 250}
    ],
    assets : [
        { key : "HALL", src : "assets/hall.png" },
        { key : "BUBBLE", src : "assets/bubble_2.png" },
        { key : "SPRITESHEET", src : "assets/spritesheet.png" }
    ]
}
