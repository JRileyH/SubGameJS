var msg = Crafty.e('2D, DOM, Text')
    .attr({
        x: 10,
        y:10
    })

Crafty.c("Mover", {
    required: "2D, DOM, Color, Mouse, Keyboard",
    init: function() {
        this.w = 10;
        this.h = 10;
        this.selected = false;
        this.originColor = "black";
    },
    events:{
        "KeyDown":function(e) {
            var action = false;
            if(this.selected){
                switch(e.key){
                    case Crafty.keys[1]:
                        this.x = 0;
                        action = true;
                    break;
                    case Crafty.keys[2]:
                        this.x = 100;
                        action = true;
                    break;
                    case Crafty.keys[3]:
                        this.x = 200;
                        action = true;
                    break;
                    case Crafty.keys[4]:
                        this.x = 300;
                        action = true;
                    break;
                    case Crafty.keys[5]:
                        this.x = 400;
                        action = true;
                    break;
                    case Crafty.keys[6]:
                        this.x = 500;
                        action = true;
                    break;
                    default:
                        Crafty.audio.play("berp");
                    break;
                }
                if(action) {
                    Crafty.audio.play("meep");
                    this.deselect()
                }
            }
        },
        "Click":function(e){
            Crafty.audio.play("beep");
            Crafty("Mover").each(function(){
                this.deselect()
            });
            this.select();
        }
    },
    select: function() {
        this.selected = true;
        this.color("green");
    },
    deselect: function() {
        this.selected = false;
        this.color(this.originColor);
    },
    place: function(x, y, c){
        this.x = x*100;
        this.y = y;
        this.originColor = c;
        this.color(c);
        return this;
    }
});

var m1 = Crafty.e("Mover").place(0, 100, 'purple');
var m2 = Crafty.e("Mover").place(1, 120, 'magenta');
var m3 = Crafty.e("Mover").place(2, 140, 'blue');
var m4 = Crafty.e("Mover").place(3, 160, 'red');

Crafty.c("Player", {
    required: "2D, DOM, Color",
    init: function() {
        this.w = 30;
        this.h = 30;
        this.color("green");
    },
    remove: function() {
        Craft.log("removed");
    },
    events:{
        "TurnRed": function(){this.changeColor("red")},
        "TurnGreen": function(){this.changeColor("green")},
        "TurnBlue": function(){this.changeColor("blue")}
    },
    changeColor: function(c){
        this.color(c);
    },
    place: function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
});

var p1 = Crafty.e("Player")
    .place(100, 50);

var p2 = Crafty.e("Player")
    .place(200, 40);

Crafty.trigger("TurnBlue");
p2.trigger("TurnRed");

p2.origin("center");
p2.bind('EnterFrame', function(){
    this.rotation+=1;
    
});

msg.text("Hello World");
var audio =  {
        "beep": ["beep.wav", "beep.mp3"],
        "meep": ["meep.wav", "meep.mp3"],
        "berp": ["berp.wav", "berp.mp3"]
    }
Crafty.paths({audio:"res/audio/", images:""})
Crafty.load({audio, function(){

}});