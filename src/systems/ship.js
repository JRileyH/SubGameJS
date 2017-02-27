//Ship System Definition
Crafty.s("Ship", {
    init: function() {
        this.layout = null;
        this.roster = [];
        this.decks = [];
        this.armament = [];
    },
    events: {

    },
    build: function(layout){
        this.layout = layout;
        return this
            .buildGrid(layout)
            .buildDecks(layout);
    },
    buildGrid: function(layout) {

        return this;
    },
    buildDecks: function(layout) {
        for(var i in layout.decks) {
            var deckInfo = layout.decks[i];
            this.decks.push(Crafty.e("Deck").attr({layout: layout}).position(deckInfo));
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