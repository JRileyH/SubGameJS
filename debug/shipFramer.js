var debug_ShipFramer = (function(){
    _debug = {}

    _debug.frame = function(layout){
        //Frame the wireShip
        //--Outline
        var wireShip = Crafty.e("2D, DebugRectangle")
            .attr({x: layout.x, y: layout.y, w: layout.w*layout.tw, h: layout.h*layout.th})
            .debugStroke("green");
        //--Floors
        var wireFloors = [];
        for(var i = 0; i < layout.floors.length; i++) {
            var floor = layout.floors[i]
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
        //--Ladders
        var wireLadders = [];
        for(var i = 0; i < layout.ladders.length; i++) {
            for(var j = 0; j < layout.ladders[i].length; j++) {
                var ladder = layout.ladders[i][j];
                wireLadders.push(
                    Crafty.e("2D, DebugRectangle")
                    .attr({
                        x: layout.x+Math.floor(ladder*layout.tw),
                        y: layout.y+(i+1)*layout.th,
                        w: 1,
                        h: layout.th
                    })
                    .debugStroke("purple")
                );
            }
        }
        //--Stations
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

        //Draw Ship Frame
        wireShip.debugRectangle(wireShip)
        for(var i in wireFloors){
            wireFloors[i].debugRectangle(wireFloors[i]);
        }
        for(var i in wireLadders){
            wireLadders[i].debugRectangle(wireLadders[i]);
        }
        for(var i in wireArmament){
            wireArmament[i].debugRectangle(wireArmament[i]);
        }
    }

    return _debug;
})();