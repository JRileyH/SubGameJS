//Station Entity Definition
Crafty.c("Station", {
    required: "2D, DOM, Color, Mouse, Keyboard",
    init: function() {
        this.id = -1;
        this.crew = null;
        this.x = -1;
        this.y = -1;
        this.w = 40;
        this.h = 20;
        this.color("blue");
    },
    events: {
        "Click":function(e){
            if(g_selected) { 
                if(!g_moving && this.crew === null){
                    var found = false;
                    var crew = null
                    Crafty("Crew Selected").each(function(){
                        found = true;
                        crew = this;
                        this.deselect();
                    });
                    if(found){
                        crew.occupy(this);
                        this.occupy(crew);
                        Crafty.audio.play("meep");
                    }
                } else {
                    Crafty.audio.play("berp");
                }
            }
        }
    },
    occupy: function(crew) {
        this.crew = crew;
        return this;
    },
    spawn: function(x, y, i) {
        this.id = i;
        this.x = x;
        this.y = y;
        return this;
    }
});