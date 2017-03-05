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
            this.y = this.layout.y+((this.deck+1)*this.layout.th);
        }
        if(info.hasOwnProperty("l")) {
            this.l = info.l;
            this.x = this.layout.x+(info.l*this.layout.tw);
            this.w = (this.layout.x+(this.r*this.layout.tw)) - this.x;
            if(this.leftSlider)this.leftSlider.destroy();
            this.leftSlider = Crafty.e("DeckSlider").deck(this, "left").position(info.l);
        }
        if(info.hasOwnProperty("r")) {
            this.r = info.r;
            this.w = (this.layout.x+(info.r*this.layout.tw)) - this.x;
            if(this.rightSlider)this.rightSlider.destroy();
            this.rightSlider = Crafty.e("DeckSlider").deck(this, "right").position(info.r);
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
        this._deck = null;
        this._other = null;
        this._side = "";
        this.h = 6;
        this.w = 6;
        this.color("red");
    },
    events: {
        "StartDrag":function(e) {
            this.color("green");
        },
        "Dragging":function(e) {
            var lo = this._deck.layout;
            var farLeft = 0;
            var farRight = lo.w;
            var topDeck = this._deck.deck-1>=0;
            var botDeck = this._deck.deck<lo.decks.length-1;

            if(this._side==="RIGHT") {
                farLeft = Math.max(
                    farLeft,                                                                                        //right of ships left bounds
                    topDeck ? g_ship.decks[this._deck.deck-1].leftSlider.position()+1 : Number.MIN_SAFE_INTEGER,    //1 unit right of above decks left side
                    this._other.position()+1,                                                                        //1 unit right of -this decks left side
                    botDeck ? g_ship.decks[this._deck.deck+1].leftSlider.position()+1 : Number.MIN_SAFE_INTEGER,    //1 unit right of below decks left side
                    ...topDeck ? lo.hatches[this._deck.deck-1].h.map(function(i){return i+0.2}) : [],               //right of above decks right most hatch
                    ...botDeck ? lo.hatches[this._deck.deck].h.map(function(i){return i+0.2}) : []                  //right of -this decks right most hatch
                )
            }
            if(this._side==="LEFT") {
                farRight = Math.min(
                    farRight,                                                                                       //left of ships right bounds
                    topDeck ? g_ship.decks[this._deck.deck-1].rightSlider.position()-1 : Number.MAX_SAFE_INTEGER,   //1 unit left of above decks right side
                    this._other.position()-1,                                                                        //1 unit left of -this decks right side
                    botDeck ? g_ship.decks[this._deck.deck+1].rightSlider.position()-1 : Number.MAX_SAFE_INTEGER,   //1 unit left of below decks right side
                    ...topDeck ? lo.hatches[this._deck.deck-1].h : [],                                              // left of above decks  left most hatch
                    ...botDeck ? lo.hatches[this._deck.deck].h : []                                                 // left of -this decks  left most hatch
                )
            }

            this.x = Crafty.math.clamp(e.realX, lo.x+(farLeft*lo.tw), lo.x+(farRight*lo.tw))-(this.w/2);
        },
        "StopDrag":function(e) {
            this.color("red");
            var lo = this._deck.layout;
            this.position((this.x-lo.x+(this.w/2))/lo.tw);
            switch(this._side) {
                case "LEFT":
                    this._deck.position({l:this.position()});
                break;
                case "RIGHT":
                    this._deck.position({r:this.position()});
                break;
            }
        }
    },
    position: function(p) {
        if(typeof(p)!=="number") return this.p;

        var lo = this._deck.layout;
        var approx = Math.round(p*10)/10;
        this.p = approx;
        this.x = lo.x+(approx*lo.tw)-(this.w/2);
        return this;
    },
    deck: function(deck, side) {
        if(typeof(deck)!=="object") return this._deck;

        this._deck = deck;
        this._side = side.toUpperCase();
        this.y = deck.layout.y+((deck.deck+1)*deck.layout.th)-(this.w/2);
        return this;
    },
    pair: function(other){
        if(typeof(other)!=="object") return this._other;

        this._other = other;
        return this;
    }
});