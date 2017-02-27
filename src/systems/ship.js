//Ship System Definition
Crafty.s("Ship", {
    init: function() {
        this.layout = null;
        this.roster = [];
        this.decks = [];
        this.hatches = [];
        this.stations = [];
    },
    events: {

    },
    build: function(layout){
        this.layout = layout;
        return this
            .buildGrid(layout)
            .buildDecks(layout)
            .buildHatches(layout);
    },
    buildGrid: function(layout) {
        Crafty.s("Grid").build(layout, true);
        return this;
    },
    buildDecks: function(layout) {
        for(var i in layout.decks) {
            var deckInfo = layout.decks[i];
            this.decks.push(Crafty.e("Deck").attr({layout: layout}).position(deckInfo));
        }
        return this;
    },
    buildHatches: function(layout) {
        for(var i in layout.hatches) {
            var hatchInfo = layout.hatches[i];
            for(var j in hatchInfo.h){
                this.hatches.push(Crafty.e("Hatch").attr({layout: layout}).position({d:hatchInfo.d, x:hatchInfo.h[j]}));
            }
            
        }
        return this;
    }
    /*addRoster: function(roster) {
        for(var i in roster) {
            var station = this.armament[roster[i].station]
            var crew = Crafty.e("Crew").occupy(station, true);
            station.occupy(crew);
            this.roster.push(crew);
            
        }
        return this;
    },
    addArmament: function(armament) {
        for(var i in armament) {
            this.armament.push(Crafty.e("Station").spawn(armament[i].x, armament[i].y, i));
        }
        return this;
    }*/
});