//Hatch Entity Definition
Crafty.c("Hatch", {
    required: "2D, DOM, Color, MouseDrag",
    init: function() {
        this.w = 10;
        this.color("purple");
    },
    events: {
        "StartDrag":function(e) {
            this.color("green");
            this._oldX = this.x;
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
            for(var i in lo.hatches[this.deck].h) {
                //do something about overlapping here
                console.log();
            }
        }
    },
    position: function(info) {
        if(typeof(info)!=="object") return {d:this.deck, x:this.l}

        this.h = this.layout.th;
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