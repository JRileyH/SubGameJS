Crafty.s("Grid", {
    required: "2D, DOM, Color",
    init: function() {
        this.sectors = [];
    },
    build: function(layout, show) {
        for(var i = 0; i < layout.w; i++){
            for(var j = 0; j < layout.h; j++){
                this.sectors.push(Crafty.e("GridSector")
                    .attr({
                        coords: {x: i, y: j},
                        x: layout.x+(i*layout.tw),
                        y: layout.y+(j*layout.th),
                        w: layout.tw,
                        h: layout.th
                    })
                    .debugStroke("#ddd")
                );
            }
        }
        if(show) {
            for(var i in this.sectors){
                this.sectors[i].debugRectangle(this.sectors[i]);
            }
        }
    }
});
Crafty.c("GridSector", {
    required:"2D, Mouse, DebugRectangle",
    init: function() {

    },
    events:{
        "MouseDown": function(e){
            switch(e.which){
                case 1://LeftClick
                break;
                case 2://MiddleClick
                break;
                case 3://RightClick
                    console.log(this.coords)
                break;
            }
        }
    }
})