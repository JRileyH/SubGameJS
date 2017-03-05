//Hatch Entity Definition
Crafty.c("Hatch", {
    required: "2D, DOM, Color, MouseDrag",
    init: function() {
        this.color("purple");
    },
    events: {
        "StartDrag":function(e) {
            this.color("green");
        },
        "Dragging":function(e) {
            var lo = this.layout;
            this.x = Crafty.math.clamp(
                e.realX,
                lo.x+(Math.max(lo.decks[this.deck].l,lo.decks[this.deck+1].l)*lo.tw),
                lo.x+(Math.min(lo.decks[this.deck].r,lo.decks[this.deck+1].r)*lo.tw)-this.w
            );
        },
        "StopDrag":function(e) {
            this.color("purple");
            var lo = this.layout;
            var approx = Math.round((this.x-lo.x)/lo.tw*10)/10;
            this.x = lo.x+(approx*lo.tw);
            var dropped = this;

            function clear() {
                var c = true;
                Crafty("Hatch").each(function(i){
                    if(dropped.getId()!==this.getId()){
                        if(dropped.intersect(this)){
                            c =  false;
                        }
                    }
                });
                return c;
            }

            while(!clear()){
                approx+=0.1;
                this.x = lo.x+(approx*lo.tw);
                var dropped = this;
            }
        }
    },
    position: function(info) {
        if(typeof(info)!=="object") return {d:this.deck, x:this.l}
        
        if(info.hasOwnProperty("d")) {
            this.deck = Math.floor(info.d);
            this.y = this.layout.y+((Math.floor(info.d)+1)*this.layout.th);
        }
        if(info.hasOwnProperty("x")) {
            this.l = info.x;
            this.r = info.x+this.w;
            this.x = this.layout.x+(info.x*this.layout.tw);
        }
        
        return this;
    },
    rebase: function() {

        return this;
    }
});