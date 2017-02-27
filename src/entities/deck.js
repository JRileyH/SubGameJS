//Deck Entity Definition
Crafty.c("Deck", {
    required: "2D, DOM, Color",
    init: function() {
        this.h = 1;
        this.color("magenta");
    },
    events: {

    },
    position: function(info) {
        if(typeof(info)!=="object") return {l:this.l, r:this.r, d:this.deck}

        if(info.hasOwnProperty("d")) {
            this.deck = Math.floor(info.d);
            this.y = this.layout.y+((Math.floor(info.d)+1)*this.layout.th);
        }
        if(info.hasOwnProperty("l")) {
            this.l = info.l;
            this.x = this.layout.x+(info.l*this.layout.tw);
            this.w = (this.layout.x+(this.r*this.layout.tw)) - this.x;
            if(this.leftSlider)this.leftSlider.destroy();
            this.leftSlider = Crafty.e("DeckSlider").assign(this, "left");
        }
        if(info.hasOwnProperty("r")) {
            this.r = info.r;
            this.w = (this.layout.x+(info.r*this.layout.tw)) - this.x;
            if(this.rightSlider)this.rightSlider.destroy();
            this.rightSlider = Crafty.e("DeckSlider").assign(this, "right");
        }
        this.leftSlider.pair(this.rightSlider);
        this.rightSlider.pair(this.leftSlider);
        return this.rebase();
    },
    rebase: function() {
        this.layout.decks[this.deck] = this.position();
        return this;
    }
});

//Deck Slider Entity Definition
Crafty.c("DeckSlider", {
    required: "2D, DOM, Color, MouseDrag",
    init: function() {
        this.deck = null;
        this.other = null;
        this.side = "";
        this.h = 6;
        this.w = 6;
        this.color("red");
    },
    events: {
        "StartDrag":function(e) {
            this.color("green");
        },
        "Dragging":function(e) {
            var lo = this.deck.layout;
            if(this.side==="LEFT" && e.realX>(this.other.x-lo.tw)) return;
            if(this.side==="RIGHT" && e.realX<(this.other.x+lo.tw)) return;
            this.x = Crafty.math.clamp(e.realX, lo.x, lo.x+(lo.w*lo.tw))-3;
        },
        "StopDrag":function(e) {
            this.color("red");
            var lo = this.deck.layout;
            approx = Crafty.math.clamp(Math.round((e.realX-lo.x)/lo.tw*10)/10, 0, lo.w);
            if(this.side==="LEFT" && e.realX>(this.other.x-lo.tw)) approx = this.deck.r-1;
            if(this.side==="RIGHT" && e.realX<(this.other.x+lo.tw)) approx = this.deck.l+1;
            switch(this.side) {
                case "LEFT":
                    this.deck.position({l:approx});
                break;
                case "RIGHT":
                    this.deck.position({r:approx});
                break;
            }
        }
    },
    assign: function(deck, side) {
        if(typeof(deck)!=="object") return this.deck;

        switch(side.toUpperCase()){
            case "LEFT":
                this.side = "LEFT";
                this.x = deck.layout.x+(deck.l*deck.layout.tw)-3;
                this.y = deck.layout.y+((deck.deck+1)*deck.layout.th)-3;
            break;
            case "RIGHT":
                this.side = "RIGHT";
                this.x = deck.layout.x+(deck.r*deck.layout.tw)-3;
                this.y = deck.layout.y+((deck.deck+1)*deck.layout.th)-3;
            break;
            default:
            return console.error("DeckSliderError: Improper assignment, used 'left' or 'right' in second parameter")
        }
        this.deck = deck;
        return this;
    },
    pair: function(other){
        if(typeof(other)!=="object") return this.other;

        this.other = other;
        return this;
    }
});