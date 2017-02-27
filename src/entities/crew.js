//Globals
var g_moving = false;
var g_selected = false;
//Crew Entity Definition
Crafty.c("Crew", {
    required: "2D, DOM, Color, Mouse, Keyboard, Tween",
    init: function() {
        this.w = 10;
        this.h = 10;
        this.station = {};
        this.selected = false;
        this.originColor = "red";
        this.color("red");
        this.speedModifier = 2;
    },
    events:{
        "KeyDown":function(e) {
            if(this.selected){
                var action = -1;
                switch(e.key){
                    case Crafty.keys[1]:
                        action = 0;
                    break;
                    case Crafty.keys[2]:
                        action = 1;
                    break;
                    case Crafty.keys[3]:
                        action = 2;
                    break;
                    case Crafty.keys[4]:
                        action = 3;
                    break;
                    case Crafty.keys[5]:
                        action = 4;
                    break;
                    case Crafty.keys[6]:
                        action = 5;
                    break;
                    default:
                        Crafty.audio.play("berp");
                        this.deselect();
                    break;
                }
                if(action>-1) {
                    var distance = Math.floor(Math.abs(100*action-this.x)*this.speedModifier);
                    g_moving = true;
                    this.tween({x: 100*action}, distance);
                    Crafty.audio.play("meep");
                    this.deselect()
                }
            }
        },
        "Click":function(e){
            if(!g_moving && !this.selected){
                Crafty.audio.play("beep");
                Crafty("Crew").each(function(){
                    this.deselect()
                });
                this.select();
            }
        },
        "TweenEnd": function(e){
            g_moving = false;
            Crafty.audio.play("beep");
        }
    },
    select: function() {
        this.selected = true;
        g_selected = true;
        this.addComponent("Selected");
        this.color("green");
    },
    deselect: function() {
        this.selected = false;
        g_selected = false;
        this.removeComponent("Selected");
        this.color(this.originColor);
    },
    occupy: function(station, instant) {
        instant = instant || false;
        this.station.crew = null
        this.station = station;
        if(instant) {
            this.x = station.x;
            this.y = station.y;
        } else {
            this.tween({x: station.x, y: station.y}, 500);
        }
        return this;
    }
});