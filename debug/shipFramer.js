Crafty.c("FloorDragger", {
    required: "2D, DOM, Color, MouseDrag",
    init: function() {
        this.layout = {};
        this.floor = -1;
        this.side = "";
        this.x = -1;
        this.y = -1;
        this.w = 6;
        this.h = 6;
        this.color("red");
    },
    events: {
        "StartDrag":function(e){
            this.color("green");
        },
        "Dragging":function(e){
            if((this.side === "left" && e.realX < this.other) || (this.side === "right" && e.realX > this.other.x)){
                this.x = e.realX;
            }
            
        },
        "StopDrag":function(e){
            
            this.color("red");
        }
    },
    spawn: function(x, y, layout, side) {
        this.layout = layout;
        this.side = side;
        this.floor = y-1;
        this.other = side==="left" ? layout.floors[y-1].r*layout.tw+layout.x-3 : layout.floors[y-1].l*layout.tw+layout.x-3;
        this.x = layout.x+x*layout.tw-3;
        this.y = layout.y+y*layout.th-3;
        return this;
    }
});

var debug_ShipFramer = (function(){
    _debug = {}

    _debug.frame = function(layout, frames){
        frames = frames || ["ship", "floors", "ladders", "armament", "crew"];

        //--Outline of Ship
        if(!!~frames.indexOf("ship")) {
            var wireShip = Crafty.e("2D, DebugRectangle")
                .attr({x: layout.x, y: layout.y, w: layout.w*layout.tw, h: layout.h*layout.th})
                .debugStroke("green");
            wireShip.debugRectangle(wireShip)
        }

        //--Floors
        if(!!~frames.indexOf("floors")) {
            var wireFloors = [];
            var floorDraggers = [];
            for(var i = 0; i < layout.floors.length; i++) {
                var floor = layout.floors[i]
                Crafty.e("FloorDragger").spawn(floor.l, i+1, layout, "left");
                Crafty.e("FloorDragger").spawn(floor.r, i+1, layout, "right");
                var start = layout.x+floor.l*layout.tw;
                var stop = layout.x+floor.r*layout.tw;
                wireFloors.push(
                    Crafty.e("2D, DebugRectangle")
                    .attr({
                        x: start,
                        y: layout.y+(1+i)*layout.th,
                        w: stop-start,
                        h: 1
                    })
                    .debugStroke("magenta")
                );
            }
            for(var i in wireFloors){
                wireFloors[i].debugRectangle(wireFloors[i]);
            }
        }
        
        //--Ladders
        if(!!~frames.indexOf("ladders")) {
            var wireLadders = [];
            for(var i = 0; i < layout.ladders.length; i++) {
                for(var j = 0; j < layout.ladders[i].length; j++) {
                    var ladder = layout.ladders[i][j];
                    wireLadders.push(
                        Crafty.e("2D, DebugRectangle")
                        .attr({
                            x: layout.x+Math.floor(ladder*layout.tw),
                            y: layout.y+(i+1)*layout.th,
                            w: 10,
                            h: layout.th
                        })
                        .debugStroke("purple")
                    );
                }
            }
            for(var i in wireLadders){
                wireLadders[i].debugRectangle(wireLadders[i]);
            }
        }
        //--Stations
        if(!!~frames.indexOf("armament")) {
            var wireArmament = [];
            for(var i = 0; i < layout.armament.length; i++) {
                var station = layout.armament[i];
                wireArmament.push(
                    Crafty.e("2D, DebugRectangle")
                        .attr({
                            x: layout.x+station.x*layout.tw,
                            y: layout.y+station.y*layout.th-(layout.th-10),
                            w: layout.tw,
                            h: layout.th-10
                        })
                        .debugStroke("blue")
                );
            }
            for(var i in wireArmament){
                wireArmament[i].debugRectangle(wireArmament[i]);
            }
        }
        //--Crew
        if(!!~frames.indexOf("crew")) {

        }
    }

    _debug.grid = function(layout) {
        var grid = [];
        for(var i = 0; i < layout.w; i++){
            for(var j = 0; j < layout.h; j++){
                grid.push(
                    Crafty.e("2D, DebugRectangle")
                    .attr({
                        x: layout.x+i*layout.tw,
                        y: layout.y+j*layout.th,
                        w: layout.tw,
                        h: layout.th
                    })
                    .debugStroke("#ddd")
                );
            }
        }
        for(var i in grid){
            grid[i].debugRectangle(grid[i]);
        }
    }

    return _debug;
})();