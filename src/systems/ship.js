//Ship System Definition
Crafty.s("Ship", {
    init: function() {
        this.roster = [];
        this.armament = [];
    },
    events: {

    },
    addRoster: function(roster) {
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
    }
});