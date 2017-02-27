var g_ship = Crafty.s("Ship")
    .addArmament([
        {x:0, y:0},
        {x:10, y:50},
        {x:30, y:100},
        {x:60, y:150},
        {x:100, y:200},
    ]).addRoster([
        {station:0},
        {station:2},
    ]);

var shiplayout1 = {
    x:200,
    y:10,
    w:7,
    h:4,
    tw:50,
    th:40,
    floors:[
        {l:1,r:3},
        {l:2,r:6},
        {l:1,r:5},
        {l:2,r:4}
    ],
    ladders:[
        [2.5],
        [3, 4.5],
        [3.5]
    ],
    armament:[
        {x:1.1,y:1},
        {x:3.3,y:2},
        {x:4.8,y:2},
        {x:1.5,y:3},
        {x:2.1,y:4}
    ]
}
var shiplayout2 = {
    x:250,
    y:200,
    w:7,
    h:4,
    tw:50,
    th:40,
    floors:[
        {l:1,r:3},
        {l:2,r:6},
        {l:1,r:5},
        {l:2,r:4}
    ],
    ladders:[
        [2.5],
        [3, 4.5],
        [3.5]
    ],
    armament:[
    ]
}

debug_ShipFramer.grid(shiplayout1);
debug_ShipFramer.frame(shiplayout1);

debug_ShipFramer.grid(shiplayout2);
debug_ShipFramer.frame(shiplayout2);


var audio =  {
        "beep": ["beep.wav", "beep.mp3"],
        "meep": ["meep.wav", "meep.mp3"],
        "berp": ["berp.wav", "berp.mp3"]
    }
Crafty.paths({audio:"res/audio/", images:""})
Crafty.load({audio, function(){

}});